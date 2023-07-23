import OgTag from '@/components/Common/OgTag';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import ItemsShop from '@/components/Shop/Items/ItemsShop';
import BaseLayout from '@/layouts/BaseLayout';
import {
  Box,
  Card,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { getCategory } from 'api/category/categoryApi';
import { getProductInShop } from 'api/product/productApi';
// import { queryShop } from 'api/apiAccount/account';
import { IProduct } from 'model/product';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
// import ye from '../../src/assets/images/Character_Yelan_Portrait.webp';
// import shen from '../../src/assets/images/shenhe.png';

interface IVipAccFilter {
  priceSort: boolean | '';
  ar: string;
  hero: string;
  weapon: string;
  server: string;
  keyword: string;
  rangeMoney?: string;
}
function Shop() {
  const router = useRouter();
  const { page: pageHistory } = router.query;

  const [data, setData] = useState<IProduct[]>([]);

  const [category, setCategory] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');
  const [sortPrice, setSortPrice] = useState<string>('');

  useEffect(() => {
    let tempPage = pageHistory ? (+pageHistory - 1) * 12 : 0;

    executeScroll();
    const param = {
      limit: 12,
      offset: tempPage
    };

    getProductInShop(param.limit, param.offset, filter, sortPrice).then(
      (res) => {
        setData(res.data.data);
        setTotal(res.data.total);
      }
    );
  }, [pageHistory, filter, sortPrice]);

  useEffect(() => {
    getCategory().then((res) => setCategory(res.data));
  }, []);
  // const toggleOpen = () => {
  //   setOpen(!open);
  // };
  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.type);
    router.push(`/shop?page=${value}`);
  };

  const executeScroll = () => {
    const id = 'scrollTo';
    const yOffset = -95;
    const element = document.getElementById(id);
    const y = element?.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortPrice(event.target.value);
  };
  return (
    <Box>
      <Head>
        <title>Shop phụ kiện</title>
        <OgTag title="Shop phụ kiện" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <TitleSpecial>Shop phụ kiện</TitleSpecial>

        <Box py={3}>
          <Card
            sx={{
              padding: '25px',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontSize="17px" fontWeight="600">
                Lọc theo danh mục sản phẩm:
              </Typography>
              <TextField
                sx={{ ml: 2, minWidth: '200px' }}
                select
                defaultValue=""
                SelectProps={{
                  displayEmpty: true
                }}
                onChange={handleChange}
              >
                <MenuItem value={''}>Tất cả</MenuItem>
                {category.map((option) => (
                  <MenuItem key={option.id} value={option.slug}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontSize="17px" fontWeight="600">
                Sắp xếp theo
              </Typography>
              <TextField
                sx={{ ml: 2, minWidth: '200px' }}
                select
                defaultValue=""
                SelectProps={{
                  displayEmpty: true
                }}
                onChange={handleChangePrice}
              >
                <MenuItem value={''}>Mặc định</MenuItem>
                <MenuItem value={'false'}>Tăng dần</MenuItem>
                <MenuItem value={'true'}>Giảm dần</MenuItem>
              </TextField>
            </Box>
          </Card>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={12} id="scrollTo">
              <Grid container columnSpacing={1.7} rowSpacing={2}>
                {data.map((d, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={3}
                      sm={6}
                      key={i}
                      sx={{
                        display: 'flex'
                      }}
                    >
                      <ItemsShop
                        amount={d.amount}
                        title={d.name}
                        url={`/shop/${d.slug}`}
                        avatar={d.avatar}
                        price={d.price}
                        link={d.link}
                      ></ItemsShop>
                    </Grid>
                  );
                })}
              </Grid>
              {total > 12 && (
                <PaginationPage
                  numberOfPage={Math.ceil(total / 12)}
                  onChange={handlePage}
                  index={+pageHistory}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Shop;
Shop.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
