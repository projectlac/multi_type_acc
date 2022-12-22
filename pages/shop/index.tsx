import OgTag from '@/components/Common/OgTag';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import ItemsShop from '@/components/Shop/Items/ItemsShop';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import { getProduct } from 'api/product/productApi';
// import { queryShop } from 'api/apiAccount/account';
import { IProduct } from 'model/product';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import ye from '../../src/assets/images/Character_Yelan_Portrait.webp';
import shen from '../../src/assets/images/shenhe.png';

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
  const [open, setOpen] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const [filter, setFilter] = useState<IVipAccFilter>({
    ar: '',
    server: 'ASIA',
    rangeMoney: '',
    hero: '',
    weapon: '',
    priceSort: '',
    keyword: ''
  });
  const handleFilter = (data) => {
    setFilter(data);
    localStorage.setItem('filter', JSON.stringify(data));
    router.push(`/account/vip`);
  };

  useEffect(() => {
    let tempPage = pageHistory ? (+pageHistory - 1) * 12 : 0;
    // var retrievedObject = localStorage.getItem('filter');
    // let filter = JSON.parse(retrievedObject);

    executeScroll();
    const param = {
      limit: 12,
      offset: tempPage
    };

    getProduct(param.limit, param.offset).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [pageHistory, filter]);

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

  return (
    <Box>
      <Head>
        <title>Shop phụ kiện</title>
        <OgTag title="Shop phụ kiện" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <TitleSpecial>Shop phụ kiện</TitleSpecial>
        <Box
          sx={{
            background: `url(${ye})`,
            width: '430px',
            height: '540px',
            position: 'fixed',
            zIndex: '3',
            backgroundRepeat: 'no-repeat',
            right: '0',
            bottom: '0',
            display: { md: 'block', xs: 'none' }
          }}
        ></Box>
        <Box
          sx={{
            background: `url(${shen})`,
            width: '356px',
            height: '515px',
            position: 'fixed',
            zIndex: '3',
            backgroundPosition: 'contain',
            backgroundRepeat: 'no-repeat',
            left: '0',
            bottom: '0',
            display: { md: 'block', xs: 'none' }
          }}
        ></Box>
        <Box py={3}>
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
