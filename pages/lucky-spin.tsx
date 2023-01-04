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
import React, { useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// interface Rate {
//   persent: number;
//   image: string;
//   gift: string;
// }
function LuckSpin() {
  const [value, setValue] = useState<number>(0);
  const [result, setResult] = useState<string>('');
  // const data: Rate[] = [
  //   {
  //     persent: 5,
  //     image: '',
  //     gift: 'Cái nịt'
  //   },
  //   {
  //     persent: 10,
  //     image: '',
  //     gift: 'Con ngựa'
  //   },
  //   {
  //     persent: 10,
  //     image: '',
  //     gift: 'Con heo'
  //   },
  //   {
  //     persent: 10,
  //     image: '',
  //     gift: 'Con chó'
  //   },
  //   {
  //     persent: 10,
  //     image: '',
  //     gift: 'Con vịt'
  //   },
  //   {
  //     persent: 10,
  //     image: '',
  //     gift: '20 Triệu trong bọc túi đen'
  //   },
  //   {
  //     persent: 10,
  //     image: '',
  //     gift: 'Cái gì thế này'
  //   },
  //   {
  //     persent: 10,
  //     image: '',
  //     gift: 'Có làm thì mới có ăn'
  //   },
  //   {
  //     persent: 10,
  //     image: '',
  //     gift: 'Huhuhu'
  //   },
  //   {
  //     persent: 15,
  //     image: '',
  //     gift: 'Cái gì thế này'
  //   }
  // ];
  const [rate, setRate] = useState<number[]>([
    0, 1, 5, 10, 15, 24, 35, 50, 67, 78, 89
  ]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  function getPosition(position) {
    if (position <= 60) {
      setResult('Giải độc đắc vip pro 1%');
    } else if (position <= 120) {
      setResult('Giải nhì khó vl 5% 1-5');
    } else if (position <= 180) {
      setResult('Hên xui thì trúng 5% 5-10');
    } else if (position <= 240) {
      setResult('Kỳ lạ 10% 10-25');
    } else if (position <= 300) {
      setResult('Dễ trúng 25% 25-50');
    } else if (position <= 360) {
      setResult('Chúc bạn may mắn lần sau 50% 50-100');
    } else {
      setResult('CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CĂN NHÀ LẦU 4 TẦNG');
    }

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
    let a = document.getElementById('wheel__inner');
    a.style.transform = `rotate(${0}deg)`;
    let random = 0;
    let randomResult = Math.floor(Math.random() * 100);
    console.log(randomResult);

    rate.map((value, index, elements) => {
      if (randomResult < rate[0]) {
        console.log('1%');

        random = Math.floor(Math.random() * (360 / rate.length) + 2520);
        setValue(random);
      }
      if (rate.at(-1) < randomResult && randomResult < 100) {
        console.log('50%');

        random = Math.floor(
          Math.random() * (360 / rate.length) +
            2520 +
            (360 * (rate.length - 1)) / rate.length
        );
        setValue(random);
      } else {
        var next = elements[index + 1];

        if (randomResult >= value && randomResult < next) {
          console.log('Khoảng giá trị', value, next);
          console.log('giá trị tại vị trí', rate[index]);
          console.log('VỊ TRÍ', index);

          random = Math.floor(
            Math.random() * (360 / rate.length) +
              2520 +
              (360 / rate.length) * index +
              1
          );
        }

        // var next = elements[index + 1];
        // if(value)
      }
    });

    // random =
    //   Math.random() * (360 / rate.length) +
    //   2520 +
    //   (360 * (rate.length - (rate.length - 1))) / rate.length;
    // setValue(random);

    // rate.map((value, index) => {
    //   if (index == 0 && randomResult < value) {
    //     random = Math.floor(Math.random() * (360 / rate.length) + 2520);
    //   }

    //   if (index == rate.length - 1 && value > rate.at(-1) && value < 100) {
    //     random = Math.floor(
    //       Math.random() * (360 / rate.length) +
    //         2520 +
    //         (360 * (rate.length - 1)) / rate.length
    //     );
    //   } else {
    //     random = Math.floor(
    //       Math.random() * (360 / rate.length) +
    //         2520 +
    //         (360 * (rate.length - (rate.length - index))) / rate.length
    //     );
    //   }
    // });

    if (a) a.style.transform = `rotate(${random}deg)`;
    setTimeout(() => {
      getPosition(random % 360);
    }, 5000);
  };

  const btnSubmit = () => {};
  return (
    <>
      <div className="wheel">
        <div className="wheel__inner" id="wheel__inner">
          <div className="wheel__sec"></div>
          <div className="wheel__sec"></div>
          <div className="wheel__sec"></div>
          <div className="wheel__sec"></div>
          <div className="wheel__sec"></div>
          <div className="wheel__sec"></div>
        </div>
        <div className="wheel__arrow">
          <button className="wheel__button" onClick={spin}>
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
        <Box sx={{ p: 3 }}>
          <Typography fontSize={15}>{result}</Typography>
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
