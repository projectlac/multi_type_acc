import bg from '@/assets/images/da-ban.png';
import formatMoney from '@/utility/formatMoney';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import MagicBox from './MagicBox';
import frame from '../../../assets/images/def0lr4-7907e9a5-3893-470b-bce4-8cc684340980.png';
interface IProps {
  title: string;
  url: string;
  avatar: string;
  price: string;
  amount: number;
  link: string;
}
function ItemsShop({ title, url, avatar, link, price, amount }: IProps) {
  return (
    <Card
      sx={{
        background: '#fbfbfb',
        width: '100%',
        height: '400px',
        // background: `url(${bg})`,
        backgroundSize: 'cover',
        boxShadow: 'none',
        filter:
          amount === 0
            ? 'grayscale(1) drop-shadow(2px 4px 6px black)'
            : 'drop-shadow(2px 4px 6px black)',
        padding: '15px',
        borderRadius: '5px',
        transition: 'all 0.5s',
        '&:hover': {
          // transform: amount === 0 ? 'none' : 'scale(1.05)',
          '& .eff:before': {
            WebkitAnimation: 'shine .75s',
            animation: 'shine .75s'
          }
        },
        position: 'relative'
        // background:
        //   'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          backgroundImage: `url(${frame})`,
          backgroundSize: 'contain'
        }}
      ></Box>
      {amount === 0 && (
        <Box
          sx={{
            background: `url(${bg})`,
            width: 100,
            height: 100,
            position: 'absolute',
            zIndex: 1,
            backgroundSize: 'contain',
            top: '9px',
            left: '10px',
            filter: 'drop-shadow(2px 4px 6px black)'
          }}
        ></Box>
      )}
      <Link href={url}>
        <Box
          className={`${amount === 0 ? 'disable-link' : ''} eff`}
          sx={{
            height: '175px',
            backgroundImage: `url(${avatar})`,
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '5px',
            position: 'relative',
            // overflow: 'hidden',
            cursor: 'pointer',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
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
      </Link>
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
        <Link href={url}>
          <Typography
            textAlign={'center'}
            fontWeight={'900'}
            fontFamily="Roboto"
            fontSize={15}
            minHeight="45px"
            color={'#333'}
            textTransform="capitalize"
            className={`${amount === 0 ? 'disable-link' : ''}`}
            sx={{
              cursor: 'pointer'
            }}
            component={'h2'}
          >
            {title}
          </Typography>
        </Link>{' '}
        <MagicBox linkTiktok={link} slug={url} />
        <Divider sx={{ my: 1, mt: 'auto' }} />
        <Grid container columnSpacing={1.5}>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600" component={'h5'}>
              Số lượng <br />{' '}
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {amount}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              fontSize={15}
              fontWeight="600"
              component={'h5'}
              textAlign="right"
            >
              Giá bán <br />
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {formatMoney(price)}
              </span>
            </Typography>
          </Grid>
        </Grid>
        {/* <Divider sx={{ mt: 1, mb: 1.5 }} /> */}
        {/* <Box
          textAlign={'center'}
          sx={{
            color: 'secondary',
            fontWeight: ' bold',
            marginBottom: ' 7px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              color: '#d33'
            }
          }}
        >
          Đi tới Tiktok Shop
        </Box>
        <Box
          textAlign={'center'}
          sx={{
            color: 'primary',
            fontWeight: ' bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              color: '#d33'
            }
          }}
        >
          Xem thêm
        </Box> */}
      </Box>
    </Card>
  );
}

export default ItemsShop;
