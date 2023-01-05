import youLogo1 from '@/assets/images/channels4_profile (1).jpg';
import youLogo from '@/assets/images/channels4_profile.jpg';
import Img1 from '@/assets/images/repu/1da53a29e1b139ef60a0.jpg';
import Img2 from '@/assets/images/repu/1f602ed2f64a2e14775b.jpg';
import Img3 from '@/assets/images/repu/4e24cfec1474cc2a9565.jpg';
import Img4 from '@/assets/images/repu/12e97244a9dc718228cd.jpg';
import Img5 from '@/assets/images/repu/24b86c55b7cd6f9336dc.jpg';
import Img6 from '@/assets/images/repu/43c57c59a7c17f9f26d0.jpg';
import Img7 from '@/assets/images/repu/498d8c3956a18effd7b0.jpg';
import Img8 from '@/assets/images/repu/556b61f7ba6f62313b7e.jpg';
import Img9 from '@/assets/images/repu/708b545e8fc657980ed7.jpg';
import Img10 from '@/assets/images/repu/3796cd801b18c3469a09.jpg';
import Img11 from '@/assets/images/repu/8619c1451addc2839bcc.jpg';
import Img12 from '@/assets/images/repu/657341d89940411e1851.jpg';
import Img13 from '@/assets/images/repu/bb6c12e8c970112e4861.jpg';
import Img14 from '@/assets/images/repu/ecd7999e43069b58c217.jpg';
import Img15 from '@/assets/images/repu/400383bd9a2742791b36.jpg';
import Img16 from '@/assets/images/repu/b57d9fef86755e2b0764.jpg';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
export default function ReputationItem() {
  return (
    <Box>
      <Box
        sx={{
          background: '#fff',
          padding: '15px',
          mb: 3,
          borderRadius: '10px'
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            '& span': {
              color: '#d33',
              fontSize: '17px'
            }
          }}
        >
          <span>Lưu ý :</span> <br /> Các Youtuber và Tiktok chỉ đang hợp tác
          quảng cáo cùng shop. <br /> Mọi vấn đề về account và Shop các bạn ib
          cho page qua{' '}
          <a href="https://m.me/103780805920496" target={'__blank'}>
            GenshinViet
          </a>{' '}
          để Shop xử lý cho các bạn.
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          TỐT NHẤT CÁC BẠN VÀO KÊNH YOUTUBE CỦA CÁC YOUTUBER XEM VIDEO MỚI NHẤT
          CÓ ĐƯỜNG LINK Ở MÔ TẢ ĐỂ TRÁNH KẺ XẤU GIẢ MẠO SHOP
          <br />
          CẢM ƠN CÁC BẠN!!!
        </Typography>
      </Box>
      <Grid container columnSpacing={3} rowSpacing={3}>
        <Grid item md={6} xs={12}>
          <Box
            sx={{
              '& div.video': {
                position: 'relative',
                height: '0%',
                borderRadius: '5px',
                overflow: 'hidden',
                paddingBottom: { md: `50.3%`, xs: '56.25%' },
                '& iframe': {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%'
                }
              }
            }}
          >
            <Box className="video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/U2CUIMJv8GY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
            <Box
              display={'flex'}
              sx={{
                padding: '15px',
                borderRadius: '5px',
                width: 'auto',
                background: '#fff',
                margin: '0 auto',
                mt: 3,
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: `url(${youLogo})`
                }}
              />
              <Box
                ml={3}
                textAlign="left"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 'calc(100% - 50px)'
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }}
                  >
                    TuanMax
                  </Typography>
                  @TuanMax <br /> 64,9 N người đăng ký
                </Box>
                <Box>
                  <a href="https://www.youtube.com/@TuanMax" target="__blank">
                    <Button color="error" variant="contained">
                      Subscribe now
                    </Button>
                  </a>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            sx={{
              '& div.video': {
                position: 'relative',
                height: '0%',
                borderRadius: '5px',
                overflow: 'hidden',
                paddingBottom: { md: `50.3%`, xs: '56.25%' },
                '& iframe': {
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%'
                }
              }
            }}
          >
            <Box className="video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1w9wiNJW46U"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
            <Box
              display={'flex'}
              sx={{
                padding: '15px',
                borderRadius: '5px',
                width: 'auto',
                background: '#fff',
                margin: '0 auto',
                mt: 3,
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: `url(${youLogo1})`
                }}
              />
              <Box
                ml={3}
                textAlign="left"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 'calc(100% - 50px)'
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }}
                  >
                    F2P Impact Official
                  </Typography>
                  @F2PImpactOfficial <br /> 35,3 N người đăng ký
                </Box>
                <Box>
                  <a
                    href="https://www.youtube.com/@F2PImpactOfficial"
                    target="__blank"
                  >
                    <Button color="error" variant="contained">
                      Subscribe now
                    </Button>
                  </a>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={12} xs={12}>
          <Box>
            <Box
              sx={{
                '& iframe': {
                  height: '732.5px',
                  borderWidth: 0
                }
              }}
            >
              <Grid container columnSpacing={3} rowSpacing={3}>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <iframe
                    src="https://www.tiktok.com/embed/7181651062791736603"
                    allowFullScreen
                    scrolling="no"
                    allow="encrypted-media;"
                  ></iframe>
                </Grid>

                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <iframe
                    src="https://www.tiktok.com/embed/7183930391466675483"
                    allowFullScreen
                    scrolling="no"
                    allow="encrypted-media;"
                  ></iframe>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <iframe
                    src="https://www.tiktok.com/embed/7184984252038122753"
                    allowFullScreen
                    scrolling="no"
                    allow="encrypted-media;"
                  ></iframe>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <iframe
                    src="https://www.tiktok.com/embed/7185127146640264475"
                    allowFullScreen
                    scrolling="no"
                    allow="encrypted-media;"
                  ></iframe>
                </Grid>

                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img1})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img2})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img3})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img4})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>

                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img5})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img6})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img7})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img8})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>

                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img9})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img10})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img11})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img12})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>

                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img13})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img14})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img15})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={4}
                  xs={12}
                  sm={6}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '250px',
                      background: `url(${Img16})`,
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
