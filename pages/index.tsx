import bgWeb from '@/assets/images/change/bgWeb.jpg';
import DialogRedirect from '@/components/Common/DialogRedirect/DialogRedirect';
import OgTag from '@/components/Common/OgTag';
import TitleWeb from '@/components/Common/TitleWeb';
import ProductCollection from '@/components/ProductCollection/ProductCollection';
import formatMoney from '@/utility/formatMoney';
import {
  Box,
  Card,
  Container,
  Dialog,
  Divider,
  Grid,
  styled,
  Typography
} from '@mui/material';
import { getTop10 } from 'api/apiDeposit/account';
import { getWebInformation } from 'api/auth';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import LazyLoad from 'react-lazyload';
import BaseLayout from 'src/layouts/BaseLayout';

import Image from 'next/image';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);
interface ITopUp {
  username: string;
  sum: string;
}
function Overview() {
  const [open1, setOpen1] = useState(true);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };
  const [data, setData] = useState({
    description: '',
    youtube: '',
    discord: ''
  });
  const [top10, setTop10] = useState<ITopUp[]>([]);

  useEffect(() => {
    getWebInformation().then((res) =>
      setData({
        youtube: res.data[0].youtube,
        description: res.data[0].description,
        discord: res.data[0].discord
      })
    );
    getTop10().then((res) => {
      const sort = res.data.sort((a, b) => b.sum - a.sum);
      setTop10(sort);
    });
  }, []);
  return (
    <OverviewWrapper>
      <Head>
        <title>Genshinviet.com uy tín hàng đầu Việt Nam</title>
        <OgTag title="Genshinviet.com uy tín hàng đầu Việt Nam" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 15 }}>
        {data.discord.trim() && (
          <Marquee
            style={{
              background: 'rgb(75 75 75 / 78%)',
              color: '#fff',
              height: '40px',
              fontSize: 16
            }}
          >
            <Box dangerouslySetInnerHTML={{ __html: data.discord }} />
          </Marquee>
        )}

        <Box
          pt={3}
          pb={2}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="center"
        >
          <TitleWeb mt={2}>GS + HSR</TitleWeb>
        </Box>

        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid
            item
            md={4}
            xs={12}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <LazyLoad height={600}>
              <Card
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)'
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    padding: '15px',
                    fontSize: { md: '24px', xs: '15px' },
                    fontWeight: 'bold',
                    color: '#856f56',
                    textTransform: 'uppercase'
                  }}
                  component="h2"
                >
                  Top Nạp
                </Typography>
                <Divider />
                <Box
                  sx={{
                    padding: '0 15px '
                  }}
                >
                  <ul style={{ padding: 0, listStyle: 'none' }}>
                    {top10.map((d: ITopUp, i) => (
                      <li
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '7px 0',
                          alignItems: 'center'
                        }}
                        key={i}
                      >
                        <Typography
                          sx={{
                            fontSize: { md: '17px', xs: '15px' },

                            fontWeight: '600',
                            display: 'flex',
                            color: '#a7947f',
                            fontStyle: 'italic',
                            '& span': {
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              background: '#e5d7ca',
                              borderRadius: '50%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              marginRight: '15px',
                              border: '2px solid #c7ae92',
                              color: '#917c65'
                            }
                          }}
                        >
                          <span>{i + 1} </span> ***{d.username}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '13px',
                            fontWeight: '600',
                            display: 'flex',
                            color: '#a7947f',
                            background: '#ffffff59',
                            padding: '5px 10px',
                            borderRadius: '15px',
                            border: '2px solid #c7ae92'
                          }}
                        >
                          {formatMoney(d.sum)} VNĐ
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Card>
            </LazyLoad>
          </Grid>

          <Grid item md={8} xs={12}>
            <Box
              sx={{
                position: 'relative',
                paddingBottom: { md: '70.3%', xs: '56.25%' },
                height: '0%',
                borderRadius: '15px',
                overflow: 'hidden',

                '& iframe': {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%'
                }
              }}
            >
              <LazyLoad height={900}>
                <Image
                  src={bgWeb}
                  width="1500"
                  height="900"
                  objectFit="cover"
                  layout="fill"
                  objectPosition={'left'}
                ></Image>
                {/* <iframe
                  width="1500"
                  height="900"
                  src={`https://www.youtube.com/embed/${data.youtube}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe> */}
              </LazyLoad>
            </Box>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <Card
              sx={{
                background:
                  'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)'
              }}
            >
              <Typography
                textAlign="center"
                sx={{
                  padding: '15px',
                  fontSize: { md: '24px', xs: '15px' },
                  fontWeight: 'bold',
                  color: '#856f56',
                  textTransform: 'uppercase'
                }}
              >
                Top Nạp
              </Typography>
              <Divider />
              <Box
                sx={{
                  padding: '0 15px '
                }}
              >
                <ul style={{ padding: 0, listStyle: 'none' }}>
                  {top10.map((d: ITopUp, i) => (
                    <li
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '7px 0',
                        alignItems: 'center'
                      }}
                      key={i}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: '17px', xs: '15px' },

                          fontWeight: '600',
                          display: 'flex',
                          color: '#a7947f',
                          fontStyle: 'italic',
                          '& span': {
                            width: '26px',
                            height: '26px',
                            display: 'flex',
                            background: '#e5d7ca',
                            borderRadius: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            marginRight: '15px',
                            border: '2px solid #c7ae92',
                            color: '#917c65'
                          }
                        }}
                      >
                        <span>{i + 1} </span> ***{d.username}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '13px',
                          fontWeight: '600',
                          display: 'flex',
                          color: '#a7947f',
                          background: '#ffffff59',
                          padding: '5px 10px',
                          borderRadius: '15px',
                          border: '2px solid #c7ae92'
                        }}
                      >
                        {formatMoney(d.sum)} VNĐ
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Box py={3} mt={5}>
          <ProductCollection action={handleClickOpen}></ProductCollection>
          <DialogRedirect open={open1} handleClose={handleClose} />
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
