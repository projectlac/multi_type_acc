import { useAuth } from '@/contexts/AuthGuard';
import { ProtectGuess } from '@/contexts/ProtectGuess';
import BaseLayout from '@/layouts/BaseLayout';
import formatMoney from '@/utility/formatMoney';
import {
  Button,
  Container,
  Dialog,
  Divider,
  Grid,
  Slide,
  Typography
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/system';
import {
  getListGift,
  spinWheel,
  spinWheelHistory
} from 'api/apiWheel/wheelApi';
import { getWebInformation } from 'api/auth';
import React, { ReactElement, useEffect, useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LuckSpin() {
  const { handleSetMessage, update, updateSuccess } = useAuth();
  const [gift, setGift] = useState([]);
  const [radian, setRadian] = useState<number>(0);
  const [history, setHistory] = useState<any>([]);
  const [value, setValue] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const [price, setPrice] = useState<string>('0');
  const [disable, setDisable] = useState<boolean>(false);
  const [countTurn, setCountTurn] = useState(0);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  function getPosition(position) {
    handleOpenDialog();
    setValue(position);
  }
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const spin = () => {
    setDisable(true);
    let a = document.getElementById('wheel__inner');

    spinWheel()
      .then((res) => {
        setCountTurn((prev) => prev + 1);
        const giftId = res.data.id;
        setResult(res.data.name);
        const index = gift.indexOf(gift.filter((d) => d.id === giftId)[0]);

        let randomResult = -index * radian + 2520;
        setValue(randomResult);

        if (a) {
          a.style.transform = `rotate(${randomResult + 3600 * countTurn}deg)`;
        }

        setTimeout(() => {
          getPosition(randomResult);
          setDisable(false);
          updateSuccess();
        }, 4500);
      })
      .catch((err) => {
        handleSetMessage({
          type: 'error',
          message: 'Có lỗi xảy ra,  vui lòng kiểm tra lại'
        });
      });
  };

  useEffect(() => {
    getListGift().then((res) => {
      setGift(res.data);
      setRadian(360 / res.data.length);
    });
    spinWheelHistory().then((res) => {
      setHistory(res.data.data);
    });

    getWebInformation().then((res) => {
      setPrice(
        typeof res.data[0].spinning_price === 'string'
          ? res.data[0].spinning_price
          : 0
      );
    });
  }, [update]);

  return (
    <ProtectGuess>
      <Container maxWidth="lg" sx={{ mt: 15, position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              width: { md: '515px', xs: '300px' },
              height: { md: '515px', xs: '300px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: '#fff',
              overflow: 'hidden',
              boxShadow: '0px 0px 8px 1px #1c1c1c'
            }}
            mb={6}
          >
            <div className="wheel">
              <Box
                className="wheel__inner"
                id="wheel__inner"
                sx={{
                  '& .wheel__sec': {
                    '&:nth-of-type(1)': {
                      borderTopColor: '#16a085',
                      transform: `rotate(0deg)`,

                      '&:before': {
                        md: {
                          background: `url(${gift[0]?.image}) center top / contain no-repeat`
                        },
                        xs: {
                          background: `url(${gift[0]?.image}) center / contain no-repeat`
                        }
                      }
                    },
                    '&:nth-of-type(2)': {
                      borderTopColor: '#2980b9',
                      transform: `rotate(${radian}deg)`,

                      '&:before': {
                        md: {
                          background: `url(${gift[1]?.image}) center top / contain no-repeat`
                        },
                        xs: {
                          background: `url(${gift[1]?.image}) center / contain no-repeat`
                        }
                      }
                    },
                    '&:nth-of-type(3)': {
                      borderTopColor: '#34495e',
                      transform: `rotate(${2 * radian}deg)`,

                      '&:before': {
                        md: {
                          background: `url(${gift[2]?.image}) center top / contain no-repeat`
                        },
                        xs: {
                          background: `url(${gift[2]?.image}) center / contain no-repeat`
                        }
                      }
                    },
                    '&:nth-of-type(4)': {
                      borderTopColor: '#f39c12',
                      transform: `rotate(${3 * radian}deg)`,

                      '&:before': {
                        md: {
                          background: `url(${gift[3]?.image}) center top / contain no-repeat`
                        },
                        xs: {
                          background: `url(${gift[3]?.image}) center / contain no-repeat`
                        }
                      }
                    },
                    '&:nth-of-type(5)': {
                      borderTopColor: '#d35400',
                      transform: `rotate(${4 * radian}deg)`,

                      '&:before': {
                        md: {
                          background: `url(${gift[4]?.image}) center top / contain no-repeat`
                        },
                        xs: {
                          background: `url(${gift[4]?.image}) center / contain no-repeat`
                        }
                      }
                    },
                    '&:nth-of-type(6)': {
                      borderTopColor: '#c0392b',
                      transform: `rotate(${5 * radian}deg)`,

                      '&:before': {
                        md: {
                          background: `url(${gift[5]?.image}) center top / contain no-repeat`
                        },
                        xs: {
                          background: `url(${gift[5]?.image}) center / contain no-repeat`
                        }
                      }
                    },
                    '&:nth-of-type(7)': {
                      borderTopColor: '#d35400',
                      transform: `rotate(${6 * radian}deg)`,

                      '&:before': {
                        md: {
                          background: `url(${gift[6]?.image}) center top / contain no-repeat`
                        },
                        xs: {
                          background: `url(${gift[6]?.image}) center / contain no-repeat`
                        }
                      }
                    },
                    '&:nth-of-type(8)': {
                      borderTopColor: '#c0392b',
                      transform: `rotate(${7 * radian}deg)`,

                      '&:before': {
                        md: {
                          background: `url(${gift[7]?.image}) center top / contain no-repeat`
                        },
                        xs: {
                          background: `url(${gift[7]?.image}) center / contain no-repeat`
                        }
                      }
                    }
                  }
                }}
              >
                <div className="wheel__sec">
                  {gift.length > 0 && gift[0]?.name}
                </div>
                <div className="wheel__sec">
                  {gift.length > 0 && gift[1]?.name}
                </div>
                <div className="wheel__sec">
                  {gift.length > 0 && gift[2]?.name}
                </div>
                <div className="wheel__sec">
                  {gift.length > 0 && gift[3]?.name}
                </div>
                <div className="wheel__sec">
                  {gift.length > 0 && gift[4]?.name}
                </div>
                <div className="wheel__sec">
                  {gift.length > 0 && gift[5]?.name}
                </div>
                <div className="wheel__sec">
                  {gift.length > 0 && gift[6]?.name}
                </div>
                <div className="wheel__sec">
                  {gift.length > 0 && gift[7]?.name}
                </div>
              </Box>
              <div className="wheel__arrow">
                <button
                  className="wheel__button"
                  onClick={spin}
                  disabled={disable}
                >
                  QUAY
                </button>
              </div>
            </div>
            <Dialog
              open={openDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialog}
              aria-describedby="alert-dialog-slide-description"
            >
              <Box sx={{ p: 2, width: { md: '500px', xs: '100%' } }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    textAlign: 'center',
                    mb: 1
                  }}
                >
                  Thông báo
                </Typography>
                <Divider />
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: '15px',
                    textAlign: 'center',
                    mt: 3
                  }}
                >
                  {result}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container>
                  <Grid item md={6} xs={6} textAlign="center">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleCloseDialog();
                        spin();
                      }}
                      sx={{
                        fontSize: { xs: '11px', md: '16px' },
                        fontWeight: 'normal'
                      }}
                    >
                      Quay tiếp
                    </Button>
                  </Grid>
                  <Grid item md={6} xs={6} textAlign="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCloseDialog}
                      sx={{
                        fontSize: { xs: '11px', md: '16px' },
                        fontWeight: 'normal'
                      }}
                    >
                      Đóng
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Dialog>
          </Box>

          <Box
            sx={{
              position: 'relative',
              right: '0',
              height: '320px',
              background: '#000000cf',
              padding: '15px',
              borderRadius: '8px',
              width: { md: 'calc(100% - 550px)', xs: '100%' }
            }}
          >
            <Typography
              sx={{
                color: '#fff',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Giá quay lần này: {formatMoney(price)} VNĐ
            </Typography>
            <Typography
              sx={{
                color: '#fff',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              10 lần quay gần nhất
            </Typography>
            <Box
              sx={{
                height: '240px',
                overflow: 'hidden',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '10px'
                },

                /* Track */
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1'
                },

                /* Handle */
                '&::-webkit-scrollbar-thumb': {
                  background: '#888'
                },

                /* Handle on hover */
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555'
                }
              }}
            >
              {history.map((d, i) => (
                <Typography
                  key={i}
                  sx={{
                    color: '#fff',
                    textAlign: 'left',
                    fontSize: '14px'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-dot"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  </svg>{' '}
                  {d.wheel.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </ProtectGuess>
  );
}

export default LuckSpin;

LuckSpin.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
