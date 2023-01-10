import { useAuth } from '@/contexts/AuthGuard';
import {
  Button,
  Dialog,
  Divider,
  Grid,
  Slide,
  Typography
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/system';
import { getListGift, spinWheel } from 'api/apiWheel/wheelApi';
import React, { useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LuckSpin() {
  const { handleSetMessage } = useAuth();
  const [gift, setGift] = useState([]);
  const [radian, setRadian] = useState<number>(0);

  const [value, setValue] = useState<number>(0);
  const [result, setResult] = useState<string>('');

  const [disable, setDisable] = useState<boolean>(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  function getPosition(position) {
    handleOpenDialog();
    setValue(0);
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
        const giftId = res.data.id;
        setResult(res.data.name);
        const index = gift.indexOf(gift.filter((d) => d.id === giftId)[0]);

        let randomResult = -index * radian + 2520;
        setValue(randomResult);

        if (a) {
          a.style.transform = `rotate(${value + randomResult}deg)`;
        }
        setTimeout(() => {
          getPosition(value);
          setDisable(false);
        }, 4500);
      })
      .catch((err) => {
        handleSetMessage({
          type: 'error',
          message: 'Có lỗi xảy ra,  vui lòng kiểm tra lại'
        });
      });
  };

  useState(() => {
    getListGift().then((res) => {
      setGift(res.data);
      setRadian(360 / res.data.length);
    });
  });

  const btnSubmit = () => {};
  return (
    <>
      <div className="wheel">
        <Box
          className="wheel__inner"
          id="wheel__inner"
          sx={{
            '& .wheel__sec': {
              '&:nth-of-type(1)': {
                borderTopColor: '#16a085',
                transform: `rotate(0deg)`
              },
              '&:nth-of-type(2)': {
                borderTopColor: '#2980b9',
                transform: `rotate(${radian}deg)`
              },
              '&:nth-of-type(3)': {
                borderTopColor: '#34495e',
                transform: `rotate(${2 * radian}deg)`
              },
              '&:nth-of-type(4)': {
                borderTopColor: '#f39c12',
                transform: `rotate(${3 * radian}deg)`
              },
              '&:nth-of-type(5)': {
                borderTopColor: '#d35400',
                transform: `rotate(${4 * radian}deg)`
              },
              '&:nth-of-type(6)': {
                borderTopColor: '#c0392b',
                transform: `rotate(${5 * radian}deg)`
              },
              '&:nth-of-type(7)': {
                borderTopColor: '#d35400',
                transform: `rotate(${6 * radian}deg)`
              },
              '&:nth-of-type(8)': {
                borderTopColor: '#c0392b',
                transform: `rotate(${7 * radian}deg)`
              }
            }
          }}
        >
          <div className="wheel__sec">{gift.length > 0 && gift[0]?.name}</div>
          <div className="wheel__sec">{gift.length > 0 && gift[1]?.name}</div>
          <div className="wheel__sec">{gift.length > 0 && gift[2]?.name}</div>
          <div className="wheel__sec">{gift.length > 0 && gift[3]?.name}</div>
          <div className="wheel__sec">{gift.length > 0 && gift[4]?.name}</div>
          <div className="wheel__sec">{gift.length > 0 && gift[5]?.name}</div>
          <div className="wheel__sec">{gift.length > 0 && gift[6]?.name}</div>
          <div className="wheel__sec">{gift.length > 0 && gift[7]?.name}</div>
        </Box>
        <div className="wheel__arrow">
          <button className="wheel__button" onClick={spin} disabled={disable}>
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
        <Box sx={{ p: 3, width: '500px' }}>
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
            <Grid item md={6} xs={12} textAlign="center">
              <Button variant="contained" onClick={btnSubmit}>
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
        </Box>
      </Dialog>
    </>
  );
}

export default LuckSpin;
