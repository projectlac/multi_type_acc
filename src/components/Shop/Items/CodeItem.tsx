import { useAuth } from '@/contexts/AuthGuard';
import formatMoney from '@/utility/formatMoney';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { buyAccount } from 'api/apiAccount/account';
import { useRouter } from 'next/router';
import { useState } from 'react';
interface IProps {
  title: string;
  imageUrl: string;
  price: string;
  code: string;
  slug: string;
}
function CodeItem({ title, imageUrl, price, code, slug }: IProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { handleSetMessage } = useAuth();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [pending, setPending] = useState(false);
  const handleSubmit = async () => {
    setPending(true);
    try {
      await buyAccount(slug as string).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Bạn đã mua code thành công'
        });
        setOpen(false);
        setPending(false);

        router.push('/history');
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message:
          'Có lỗi xảy ra, nếu mất tiền, vui lòng liên hệ với Admin để kiểm tra lại'
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        onClick={handleClickOpen}
        sx={{
          // background: '#fff',
          width: '100%',
          // background: `url(${bg})`,
          backgroundSize: 'cover',
          boxShadow: 'none',
          filter: 'drop-shadow(2px 4px 6px black)',
          padding: '15px',
          borderRadius: '5px',
          transition: 'all 0.5s',
          '&:hover': {
            transform: 'scale(1.05)',
            '& .eff:before': {
              WebkitAnimation: 'shine .75s',
              animation: 'shine .75s'
            }
          },
          position: 'relative',
          background:
            'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)'
        }}
      >
        <Box>
          <Box
            className={` eff`}
            sx={{
              height: '175px',
              background: `url(${imageUrl})`,
              width: '100%',
              backgroundSize: '100% 100%',
              borderRadius: '5px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '&:before': {
                position: 'absolute',
                top: '0',
                left: '-75%',
                zIndex: '2',
                display: 'block',
                content: "''",
                width: '50%',
                height: '100%',
                background:
                  'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%)',
                WebkitTransform: 'skewX(-25deg)',
                transform: 'skewX(-25deg)'
              }
            }}
          ></Box>
        </Box>
        <Box
          mt={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            justifyContent: 'space-between',
            height: 'calc(100% - 175px - 7px)'
          }}
        >
          <Box>
            <Typography
              textAlign={'center'}
              fontWeight={'900'}
              fontFamily="Roboto"
              fontSize={15}
              minHeight="45px"
              color={'#333'}
              textTransform="capitalize"
              sx={{
                cursor: 'pointer'
              }}
              component={'h2'}
            >
              {title}
            </Typography>
          </Box>{' '}
          <Divider sx={{ my: 1, mt: 'auto' }} />
          <Grid container columnSpacing={1.5}>
            <Grid item xs={6}>
              <Typography fontSize={15} fontWeight="600" component={'h5'}>
                Mã <br />{' '}
                <span
                  style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#d33'
                  }}
                >
                  {code}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                fontSize={15}
                fontWeight="600"
                textAlign="right"
                component={'h5'}
              >
                Giá bán <br />
                <span
                  style={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#d33'
                  }}
                >
                  {formatMoney(price)}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận mua?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn mua mã code này với giá {formatMoney(price)} VNĐ?
            <br />
            Sau khi mua, sản phẩm sẽ không thể hoàn lại
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            disabled={pending}
            autoFocus
            variant="contained"
          >
            {pending ? 'Đang xử lý' : 'Đồng ý'}
          </Button>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CodeItem;
