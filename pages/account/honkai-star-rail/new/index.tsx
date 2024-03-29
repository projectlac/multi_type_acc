import FilterAccount from '@/components/Common/Filter/FilterAccount';
import OgTag from '@/components/Common/OgTag';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import FilterVip from '@/components/Shop/Filters/FilterVip';
import Items from '@/components/Shop/Items/Items';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import { queryAccountNew } from 'api/apiAccount/account';
import { IAccountShop } from 'model/account';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

interface IVipAccFilter {
  priceSort: boolean | '';
  ar: string;
  hero: string;
  weapon: string;
  server: string;
  keyword: string;
  rangeMoney?: string;
}
function AccountVip() {
  const router = useRouter();
  const { page: pageHistory } = router.query;

  const [data, setData] = useState<IAccountShop[]>([]);
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
    router.push(`/account/honkai-star-rail/new`);
  };

  useEffect(() => {
    let tempPage = pageHistory ? (+pageHistory - 1) * 9 : 0;
    var retrievedObject = localStorage.getItem('filter');
    let filter = JSON.parse(retrievedObject);

    executeScroll();
    const param = {
      ...filter,
      limit: 9,
      offset: tempPage,
      game: 'honkai-star-rail'
    };

    queryAccountNew(param).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [pageHistory, filter]);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.type);
    router.push(`/account/honkai-star-rail/new?page=${value}`);
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
        <title>Account Khởi Đầu</title>
        <OgTag title="Account Khởi Đầu" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <TitleSpecial>Account Khởi Đầu</TitleSpecial>
        <Box py={3}>
          <Grid container columnSpacing={2}>
            <Grid item xs={12} md={3}>
              <FilterAccount open={open} toggleOpen={toggleOpen}>
                <FilterVip
                  handleFilter={handleFilter}
                  toggleOpen={toggleOpen}
                />
              </FilterAccount>
            </Grid>

            <Grid item xs={12} md={9} id="scrollTo">
              <Grid container columnSpacing={1.7} rowSpacing={2}>
                {data.map((d, i) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sm={6}
                      key={i}
                      sx={{
                        display: 'flex'
                      }}
                    >
                      <Items
                        title={d.name}
                        url={`/account/details/${d.slug}`}
                        imageUrl={d.avatar}
                        price={d.price}
                        code={d.code}
                        des={d.description}
                        isSold={d.is_sold}
                        ar_level={d.ar_level}
                        server={d.server}
                        heroes={d.heroes}
                        weapons={d.weapons}
                      ></Items>
                    </Grid>
                  );
                })}
              </Grid>
              {total > 9 && (
                <PaginationPage
                  numberOfPage={Math.ceil(total / 9)}
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

export default AccountVip;
AccountVip.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
