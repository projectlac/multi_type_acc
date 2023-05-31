import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';

import { getNewsBySlug, getRecommendById } from 'api/apiNews/newsApi';
import { INews } from 'model/news';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { format } from 'date-fns';
import NewsItem from '@/components/NewsItem/NewsItem';

function DetailNews() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<INews>();
  const [recommend, setRecommend] = useState<INews[]>([]);

  useEffect(() => {
    const callApi = async () => {
      if (slug !== undefined) {
        const res = await getNewsBySlug(slug as string);
        setData(res.data);
        const req = await getRecommendById(res.data.id);
        setRecommend(req.data.next);
      }
    };
    callApi();
  }, [slug]);
  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={data?.title || 'GenshinViet.com'} />
        <meta
          property="og:description"
          content={`${data?.title}, ${data?.keyword}`}
        />
        <meta property="og:image" content={data?.image} />
        <meta property="og:image:alt" content={data?.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Box py={3} sx={{ minHeight: '500px' }}>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              padding: '15px',
              background: 'rgb(1 1 4 / 72%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              borderRadius: '16px'
            }}
          >
            <Typography
              sx={{
                fontSize: { md: '35px', xs: '20px' },
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#fff',
                textShadow:
                  '0 0 10px #69e0ff, 0 0 20px #69e0ff, 0 0 40px #69e0ff'
              }}
            >
              {data?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: '15px',
                textAlign: 'center',
                color: '#fff'
              }}
            >
              {data?.created_at &&
                format(new Date(data?.created_at), 'dd/MM/yyyy HH:mm:ss')}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              padding: { md: '15px 25px', xs: '15px 15px' },
              background: 'rgb(1 1 4 / 72%)',
              flexDirection: 'column',
              borderRadius: '16px',
              mt: 3,
              color: '#fff'
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '15px'
              }}
            >
              {data?.detail}
            </Typography>
            <Typography
              sx={{
                textAlign: 'left',
                fontSize: '15px',
                img: {
                  maxWidth: '100%',
                  height: 'auto'
                },
                a: {
                  color: '#7781ff'
                },
                'a:visited': {
                  color: '#ff777d'
                }
              }}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></Typography>
          </Box>
          {recommend.length > 0 && (
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                padding: '15px',
                background: 'rgb(1 1 4 / 72%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: '16px',
                mt: 3
              }}
            >
              <Typography
                sx={{
                  fontSize: '35px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow:
                    '0 0 10px #69e0ff, 0 0 20px #69e0ff, 0 0 40px #69e0ff'
                }}
              >
                Bài viết liên quan
              </Typography>
              <Grid container columnSpacing={1.7} rowSpacing={2}>
                {recommend.map((d, i) => {
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
                      <NewsItem data={d} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Box>
        <Box></Box>
      </Container>
    </>
  );
}

export default DetailNews;
DetailNews.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
