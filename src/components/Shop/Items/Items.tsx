import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import eff from '@/assets/images/effect/pngwing.png';
import Link from 'next/link';
import bg from '@/assets/images/da-ban.png';
import formatMoney from '@/utility/formatMoney';
interface IProps {
  title: string;
  url: string;
  imageUrl: string;
  price: string;
  code: string;
  des: string;
  isSold: boolean;
  server?: any;
  ar_level?: string;
}
function Items({
  title,
  url,
  imageUrl,
  price,
  code,
  isSold,
  server,
  ar_level
}: IProps) {
  return (
    <Card
      sx={{
        background: '#fff',
        width: '100%',
        // background: `url(${bg})`,
        backgroundSize: 'cover',
        boxShadow: 'none',
        filter: isSold
          ? 'grayscale(1) drop-shadow(2px 4px 6px black)'
          : 'drop-shadow(2px 4px 6px black)',
        padding: '15px',
        borderRadius: '5px',
        transition: 'all 0.5s',
        '&:hover': {
          transform: isSold ? 'none' : 'scale(1.05)',
          '& .eff:before': {
            transform: isSold ? 'translateX(-375px)' : 'translateX(375px)'
          }
        },
        position: 'relative'
      }}
    >
      {isSold && (
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
          className={`${isSold ? 'disable-link' : ''} eff`}
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
              width: '388px',
              height: '300px',
              bottom: 0,
              position: 'absolute',
              content: '""',
              background: `url(${eff})`,
              backgroundSize: 'cover',
              transform: 'translateX(-375px)',
              transition: 'all 1.2s'
            }
          }}
        ></Box>
      </Link>
      <Box mt={1}>
        <Link href={url}>
          <Typography
            textAlign={'center'}
            fontWeight={'900'}
            fontFamily="Roboto"
            fontSize={15}
            minHeight="45px"
            color={'primary'}
            textTransform="capitalize"
            className={`${isSold ? 'disable-link' : ''}`}
            sx={{
              cursor: 'pointer'
            }}
          >
            {title}
          </Typography>
        </Link>{' '}
        <Divider sx={{ my: 1 }} />
        <Grid container columnSpacing={1.5}>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600">
              AR <br />{' '}
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {ar_level}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600" textAlign="right">
              Server <br />
              <span
                style={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  color: '#d33',
                  textTransform: 'capitalize'
                }}
              >
                {server?.slug}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />
        <Grid container columnSpacing={1.5}>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600">
              Mã account <br />{' '}
              <span
                style={{ fontSize: '17px', fontWeight: 'bold', color: '#d33' }}
              >
                {code}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize={15} fontWeight="600" textAlign="right">
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
        {/* <Box textAlign={'center'}>{des}</Box> */}
      </Box>
    </Card>
  );
}

export default Items;
