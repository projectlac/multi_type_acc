import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  Divider,
  Grid,
  styled,
  Typography
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import LazyLoad from 'react-lazyload';
import Head from 'next/head';
import OgTag from '@/components/Common/OgTag';
import TitleWeb from '@/components/Common/TitleWeb';
import ProductCollection from '@/components/ProductCollection/ProductCollection';
import formatMoney from '@/utility/formatMoney';
import { getTop10 } from 'api/apiDeposit/account';
import { getWebInformation } from 'api/auth';
import Marquee from 'react-fast-marquee';

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
  const [data, setData] = useState({
    description: '',
    youtube: '',
    discord: ''
  });
  const [top10, setTop10] = useState<ITopUp[]>([]);
  const [open, setOpen] = useState(true);
  const handleCloseDialog = () => {
    setOpen(false);
  };
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
        <title>
          GenshinViet - Shop acc Genshin, Honkai star rail uy tín, hàng đầu Việt
          Nam
        </title>
        <OgTag title="GenshinViet.com - Shop acc Genshin, Honkai star rail uy tín, hàng đầu Việt Nam" />
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
          <TitleWeb mt={2}>
            SHOP GENSHIN & HONKAI <br /> GIÁ HUỶ DIỆT THỊ TRƯỜNG
          </TitleWeb>
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
                    fontSize: { md: '18px', xs: '15px' },
                    fontWeight: 'bold',
                    color: '#856f56',
                    textTransform: 'uppercase'
                  }}
                  component="h2"
                >
                  Hướng dẫn làm tiếp thị kiếm tiền cùng shop Genshinviet
                </Typography>
                <Divider />
                <Box
                  sx={{
                    padding: '0 15px ',
                    fontWeight: '600',
                    color: '#a7947f',
                    a: {
                      color: '#856f56'
                    }
                  }}
                >
                  Các bước kiếm tiền vô cùng đơn giản ai cũng có thể làm được{' '}
                  <br /> - Bước 1 : Bạn phải có 1 kênh tiktok <br />
                  - Bước 2 : Đăng video liên quan đến Genshin + gắn logo shop +
                  tag #genshinviet <br /> Link tải logo:{' '}
                  <a
                    href="https://drive.google.com/file/d/19HhOW0znwUVKPNJpknqS_22FknVQTTKL/view?fbclid=IwAR26auBXhJDbBTNfoTstdiO48keGP_ytmc_xhiXgCcUYFzDvtfSO54cmScw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tại đây
                  </a>
                  <br />- Bước 3 : Chờ video lên xu hướng và lụm tiền thôi anh
                  em Video hướng dẫn chi tiết :{' '}
                  <a
                    href="https://www.youtube.com/watch?v=n64ISqT7_r0 "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    Ấn vào đây
                  </a>{' '}
                  <br /> Chi tiết thưởng ib chủ shop :{' '}
                  <a
                    href="https://www.facebook. com/nguyenhung208)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>{' '}
                  hoặc{' '}
                  <a
                    href="https://zalo.me/0372790362"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zalo
                  </a>
                  <br />
                  Các mốc thưởng như sau :
                  <ul>
                    <li>10K lượt xem : 10.000VNĐ</li>
                    <li>20K lượt xem : 20.000VNĐ </li>
                    <li>30K lượt xem : 30.000VNĐ</li>
                    <li> 40k lượt xem : 50.000VNĐ</li>
                    <li> 50k lượt xem : 70.000VNĐ</li>
                    <li> 60k lượt xem: 100.000VNĐ</li>
                  </ul>
                  <Typography sx={{ mb: 2, fontWeight: '600' }}>
                    Lưu ý: Các mốc phải được hoàn thành trong 24h và không được
                    sử dụng hack nha anh em <br /> Tiền sẽ được thanh toán ngay
                    không giam tiền Thanh toán qua thẻ cào, cộng vào tài khoản
                    shop, ATM, momo,...
                  </Typography>
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
                <iframe
                  width="1500"
                  height="900"
                  src={`https://www.youtube.com/embed/${data.youtube}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
          <ProductCollection></ProductCollection>
        </Box>
      </Container>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          sx={{
            pa: 3,
            textAlign: 'center',
            height: { xs: '350px', md: 'auto' },
            overflow: 'hidden',
            overflowY: 'auto'
          }}
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></Box>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
