import youLogo1 from '@/assets/images/channels4_profile (1).jpg';
import youLogo from '@/assets/images/channels4_profile.jpg';

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
          cho trong qua{' '}
          <a href="https://m.me/152659528261467" target={'__blank'}>
            Fanpage
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
                    src="https://www.tiktok.com/embed/7167689591422569755"
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
                    src="https://www.tiktok.com/embed/7167303358674439425"
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
                    src="https://www.tiktok.com/embed/7166561066711862555"
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
                    display: { xs: 'flex', md: 'none', lg: 'flex' },
                    justifyContent: 'center'
                  }}
                >
                  {' '}
                  <iframe
                    src="https://www.tiktok.com/embed/7165438272053742875"
                    allowFullScreen
                    scrolling="no"
                    allow="encrypted-media;"
                  ></iframe>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}