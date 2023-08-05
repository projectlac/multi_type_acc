import youLogo3 from '@/assets/images/channels4_profil.jpg';
import youLogo1 from '@/assets/images/channels4_profile (1).jpg';
import youLogo from '@/assets/images/channels4_profile.jpg';
import youLogo2 from '@/assets/images/unnamed.jpg';

import Img4 from '@/assets/images/repu/12e97244a9dc718228cd.jpg';
import Img1 from '@/assets/images/repu/1da53a29e1b139ef60a0.jpg';
import Img2 from '@/assets/images/repu/1f602ed2f64a2e14775b.jpg';
import Img5 from '@/assets/images/repu/24b86c55b7cd6f9336dc.jpg';
import Img6 from '@/assets/images/repu/43c57c59a7c17f9f26d0.jpg';
import Img7 from '@/assets/images/repu/498d8c3956a18effd7b0.jpg';
import Img3 from '@/assets/images/repu/4e24cfec1474cc2a9565.jpg';
import Img8 from '@/assets/images/repu/556b61f7ba6f62313b7e.jpg';

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
          <span>Lưu ý :</span> <br />
          Shop được rất nhiều Youtuber và Tiktoker nổi tiếng uy tín hợp tác tin
          dùng <br /> Mọi vấn đề về account và Shop các bạn ib cho page qua{' '}
          <a href="https://www.facebook.com/nguyenhung208" target={'__blank'}>
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
                  fontSize: '15px'
                }}
              >
                F2PImpactOfficial nói gì về shop acc GenshinViet
              </Typography>
            </Box>

            <Box className="video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/GN4OfjhpnWs"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          {' '}
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
                  fontSize: '15px'
                }}
              >
                Damper nói gì về shop acc GenshinViet ?
              </Typography>
            </Box>

            <Box className="video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dimYqC8xfJU"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
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
                  fontSize: '15px'
                }}
              >
                jonjiban nói gì về shop acc GenshinViet
              </Typography>
            </Box>

            <Box className="video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/cveFouoy2d4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          {' '}
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
                  fontSize: '15px'
                }}
              >
                Aura Amy Kênh tiktoker nổi tiếng nói gì về shop acc GenshinViet
                ?
              </Typography>
            </Box>

            <Box className="video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/t1bEg-V2Boc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
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
                src="https://www.youtube.com/embed/nCD8pTAl8Kw"
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
                  background: `url(${youLogo})`,
                  backgroundSize: 'cover'
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
                src="https://www.youtube.com/embed/gYaHGU8aOtY"
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
                  background: `url(${youLogo1})`,
                  backgroundSize: 'cover'
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
                    Phúc Thế Kỷ
                  </Typography>
                  @PhucTheKy <br /> 12,4 N người đăng ký
                </Box>
                <Box>
                  <a href="https://www.youtube.com/@PhucTheKy" target="__blank">
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
                src="https://www.youtube.com/embed/w1LyZyn8q-I"
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
                  background: `url(${youLogo2})`,
                  backgroundSize: 'cover'
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
                    Damper
                  </Typography>
                  @Damper <br /> 47,7 N người đăng ký
                </Box>
                <Box>
                  <a href="https://www.youtube.com/@Damper" target="__blank">
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
                src="https://www.youtube.com/embed/1G6RMO5V2Sw"
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
                  background: `url(${youLogo3})`,
                  backgroundSize: 'cover'
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
                    Bèo Bèo
                  </Typography>
                  @beobeo0911 <br /> 5,79 N người đăng ký
                </Box>
                <Box>
                  <a
                    href="https://www.youtube.com/@beobeo0911"
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
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
