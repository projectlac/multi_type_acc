import OgTag from '@/components/Common/OgTag';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import CodeItem from '@/components/Shop/Items/CodeItem';
import Items from '@/components/Shop/Items/Items';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import { queryCodeGame } from 'api/apiAccount/account';
import { IAccountShop } from 'model/account';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

function CodeGame() {
  const router = useRouter();
  const { page: pageHistory } = router.query;
  const [data, setData] = useState<IAccountShop[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    let tempPage = pageHistory ? (+pageHistory - 1) * 9 : 0;
    var retrievedObject = localStorage.getItem('filter');
    let filter = JSON.parse(retrievedObject);

    executeScroll();
    const param = {
      ...filter,
      limit: 9,
      offset: tempPage,
      game: 'genshin-impact'
    };

    queryCodeGame(param).then((res) => {
      console.log(res.data.data);

      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [pageHistory]);

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.type);
    router.push(`/code?page=${value}`);
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
        <title>Code game HRS + GI</title>
        <OgTag title="GenshinViet.com - Code game HRS + GI" />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 15, position: 'relative' }}>
        <TitleSpecial>Code game</TitleSpecial>
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
                      <CodeItem
                        title={d.name}
                        imageUrl={d.avatar}
                        price={d.price}
                        code={d.code}
                        slug={d.slug}
                      ></CodeItem>
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

export default CodeGame;

CodeGame.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
