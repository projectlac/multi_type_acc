import DialogCommonWithoutIcon from '@/components/Common/DialogCommon/DialogCommonWithoutIcon';
import { useAuth } from '@/contexts/AuthGuard';
import BaseLayout from '@/layouts/BaseLayout';
import formatMoney from '@/utility/formatMoney';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { buyAccount, getAccountBySlug } from 'api/apiAccount/account';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { ReactElement, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface IDetail {
  ar_level: string;
  server: string;
  hero: any;
  weapons: any;

  price: string;
  images: string;
  desc: string;
}
function DetailAccout({ post }) {
  const { handleSetMessage } = useAuth();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const customeSlider = useRef<any>();
  const router = useRouter();
  const { slug } = router.query;

  const data: IDetail = {
    ar_level: post.ar_level,
    server: post.server.desc,
    hero: post.heroes,
    price: post.price,
    images: post.avatar,
    desc: post.description,
    weapons: post.weapons
  };
  const [pending, setPending] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const buyAccountSubmit = async () => {
    setPending(true);
    try {
      await buyAccount(slug as string).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Bạn đã mua tài khoản thành công'
        });
        router.push('/history');
        setPending(false);
        handleCloseDialog();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message:
          'Có lỗi xảy ra, nếu mất tiền, vui lòng liên hệ với Admin để kiểm tra lại'
      });
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <Head>
        <title>{post.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.name || 'GenshinViet.com'} />
        <meta
          property="og:description"
          content={`Thông tin account ${post.name}`}
        />
        <meta property="og:image" content={post.avatar} />
        <meta property="og:image:alt" content={post.name} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Box py={3}>
          <Slider ref={customeSlider} {...settings}>
            <Box
              sx={{
                height: { md: 690, xs: '100%' },
                display: 'flex !important',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: { md: 700, xs: 'auto' },
                  background: 'rgb(16 9 9 / 59%)',
                  margin: '0 auto',
                  padding: '25px',
                  borderRadius: '10px'
                }}
              >
                <Grid container columnSpacing={1.5} rowSpacing={2}>
                  <Grid item md={4} xs={4}>
                    <Box
                      textAlign={'center'}
                      sx={{
                        color: '#fff'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: 25, xs: 15 }
                        }}
                        fontWeight={'bold'}
                      >
                        Cấp AR
                      </Typography>
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {data?.ar_level}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <Box
                      textAlign={'center'}
                      sx={{
                        color: '#fff'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: 25, xs: 15 }
                        }}
                        fontWeight={'bold'}
                      >
                        Server
                      </Typography>
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {data?.server}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <Box
                      textAlign={'center'}
                      sx={{
                        color: '#fff'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { md: 25, xs: 15 }
                        }}
                        fontWeight={'bold'}
                      >
                        Số lượng tướng
                      </Typography>
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {data?.hero && data.hero.length}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}
                    >
                      {data.hero &&
                        data.hero.length > 0 &&
                        data.hero.map((d, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: '35px',
                              height: '35px',
                              background: `url(${d.image})`,
                              backgroundSize: '100%',
                              margin: '2px'
                              // filter: 'drop-shadow(0px 0px 3px #fff)'
                            }}
                          ></Box>
                        ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    {' '}
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      }}
                    >
                      {data.weapons &&
                        data.weapons.length > 0 &&
                        data.weapons.map((d, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: '35px',
                              height: '35px',
                              background: `url(${d.image})`,
                              backgroundSize: '100%',
                              margin: '2px'
                            }}
                          ></Box>
                        ))}
                    </Box>
                  </Grid>

                  <Grid item md={12} xs={12} textAlign="center" color="#fff">
                    <Typography
                      sx={{
                        fontSize: { md: 25, xs: 15 }
                      }}
                      fontWeight={'bold'}
                      color="#fff"
                    >
                      Giá: {formatMoney(data?.price)} VNĐ
                    </Typography>
                    <Divider
                      sx={{ mt: 1, background: 'rgb(255 255 255 / 89%)' }}
                    ></Divider>
                  </Grid>
                  <Grid item md={12} xs={12} textAlign="center">
                    <Typography
                      sx={{
                        fontSize: { md: 20, xs: 15 }
                      }}
                      fontWeight={'bold'}
                      color="#fff"
                    >
                      {data?.desc}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12} textAlign="center">
                    <DialogCommonWithoutIcon
                      titleButton={'Mua ngay'}
                      title={'Xác nhận mua hàng'}
                      handleCloseDialog={handleCloseDialog}
                      handleOpenDialog={handleOpenDialog}
                      openDialog={openDialog}
                    >
                      <Typography fontSize={15}>
                        Bạn có chắc muốn mua tài khoản này không?
                        <br />
                        Sau khi mua, thông tin tài khoản sẽ được lưu vào lịch sử
                        mua hàng.
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Grid container>
                        <Grid item md={6} xs={12} textAlign="center">
                          <Button
                            variant="contained"
                            disabled={pending}
                            onClick={buyAccountSubmit}
                          >
                            Xác nhận
                          </Button>
                        </Grid>
                        <Grid item md={6} xs={12} textAlign="center">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={handleCloseDialog}
                          >
                            Đóng
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogCommonWithoutIcon>
                  </Grid>
                  <Grid item md={6} xs={12} textAlign="center">
                    <Button
                      variant="contained"
                      onClick={() => {
                        customeSlider &&
                          customeSlider.current &&
                          customeSlider?.current?.slickNext();
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <div>
              <Box
                sx={{
                  background: `url(${data?.images})   center center /contain no-repeat`,
                  width: { xs: '100%', md: '1052px' },
                  height: { xs: '250px', md: '720px' },
                  margin: ' 0 auto'
                }}
              ></Box>
            </div>
          </Slider>
        </Box>
      </Container>
    </>
  );
}

export default DetailAccout;
DetailAccout.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const res = await getAccountBySlug(slug as string);
  const post = await res.data;

  return { props: { post } };
}
