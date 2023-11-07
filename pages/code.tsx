import OgTag from '@/components/Common/OgTag';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import CodeItem from '@/components/Shop/Items/CodeItem';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid, MenuItem, TextField } from '@mui/material';
import { queryCodeGame } from 'api/apiAccount/account';
import { getListTagCode } from 'api/apiTag/tagApi';
import { IAccountShop } from 'model/account';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

interface ITagCodeList {
  data: string;
  value: string;
}
function CodeGame() {
  const router = useRouter();
  const { page: pageHistory } = router.query;
  const [data, setData] = useState<IAccountShop[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filterTag, setFilter] = useState<string>('all');
  const [tagCode, setTagCode] = useState<ITagCodeList[]>([]);

  useEffect(() => {
    let tempPage = pageHistory ? (+pageHistory - 1) * 20 : 0;
    var retrievedObject = localStorage.getItem('filter');
    let filter = JSON.parse(retrievedObject);

    executeScroll();
    const param = {
      ...filter,
      limit: 20,
      offset: tempPage,

      tag_code: filterTag === 'all' ? '' : filterTag
    };

    queryCodeGame(param).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  }, [pageHistory, filterTag]);

  useEffect(() => {
    getListTagCode().then((res) => {
      const data = res.data.data.map((d: any) => ({
        data: d.desc,
        value: d.slug
      }));
      setTagCode(data);
    });
  }, []);
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
          <TextField
            id="outlined-select-currency"
            select
            label="Phân loại code"
            defaultValue={'all'}
            onChange={(e) => {
              console.log(e.target.value);

              setFilter(e.target.value);
            }}
            sx={{
              mb: 3,
              width: {
                md: '250px',
                xs: '100%'
              }
            }}
          >
            <MenuItem value={'all'}>Tất cả</MenuItem>
            {tagCode.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.data}
              </MenuItem>
            ))}
          </TextField>
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
              {total > 20 && (
                <PaginationPage
                  numberOfPage={Math.ceil(total / 20)}
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
