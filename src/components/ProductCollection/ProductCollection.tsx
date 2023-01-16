import random from '@/assets/images/mainCategory/310172264_428812392669349_4896007792527675904_n.jpg';
import napgame from '@/assets/images/mainCategory/310320905_485170040201744_4282135316084233675_n.jpg';
import shopphukien from '@/assets/images/e8287ab33eade6f3bfbc.jpg';

import rrr from '@/assets/images/mainCategory/310545249_770219224063920_253246776766894058_n.jpg';
import bgVip from '@/assets/images/mainCategory/310860207_1164961827704035_4343141035597341049_n.jpg';
import news from '@/assets/images/mainCategory/9bf1a5932675ff2ba664.jpg';

import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import ProductCollectionItem from './ProductCollectionItem';

import { getDepositHome, getInfoAllAccount } from 'api/apiAccount/account';
import Link from 'next/link';
import { useEffect, useState } from 'react';
interface IAll {
  inStock: number;
  sold: number;
  total: string;
  type: string;
}
function ProductCollection() {
  const [dataAccVip, setDataAccVip] = useState<IAll>();
  const [dataAccRandom, setDataAccRandom] = useState<IAll>();
  const [dataAccReroll, setDataAccReroll] = useState<IAll>();
  const [dataAccNew, setDataAccNew] = useState<IAll>();
  const [dataProduct, setDataProduct] = useState<IAll>();

  const [dataDeposit, setDataDeposit] = useState<any>({
    pending: 0,
    success: 0
  });

  const gianDoi = (data, number) => {
    let temp = { ...data };
    temp.sold = temp?.sold + number;

    return temp;
  };
  useEffect(() => {
    getInfoAllAccount().then((res) => {
      res.data.map((d) => {
        if (d.type === 'VIP') setDataAccVip(gianDoi(d, 142));
        if (d.type === 'REROLL') setDataAccReroll(gianDoi(d, 64));
        if (d.type === 'RANDOM') setDataAccRandom(gianDoi(d, 103));
        if (d.type === 'NEW') setDataAccNew(gianDoi(d, 1346));
        if (d.type === 'PRODUCT') setDataProduct(gianDoi(d, 209));
      });
    });
    getDepositHome().then((res) => {
      setDataDeposit(res.data);
    });
  }, []);
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Vip"
          url="/account/vip"
          image={bgVip}
          data={dataAccVip}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Khởi Đầu"
          url="/account/new"
          image={news}
          data={dataAccNew}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Reroll"
          url="/account/reroll"
          image={rrr}
          data={dataAccReroll}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Random"
          url="/account/random"
          image={random}
          data={dataAccRandom}
        />
      </Grid>
      {/* <Grid item md={3} sm={6} xs={12}>
        <Card
          sx={{
            background:
              'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)',
            padding: '15px',
            borderRadius: '5px',
            transition: 'all 0.5s',
            '&:hover': {
              transform: 'scale(1.05)',
              '& .eff:before': {
                WebkitAnimation: 'shine .75s',
                animation: 'shine .75s'
              }
            }

          }}
        >
          <Link href={'/topup-genshin'}>
            <Box
              className="eff"
              sx={{
                height: '175px',
                background: `url(${napgame})`,
                width: '100%',
                backgroundSize: 'cover',
                borderRadius: '5px',
                position: 'relative',
                overflow: 'hidden',
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

          <Box mt={1}>
            <Typography
              textAlign={'center'}
              fontWeight={'900'}
              fontFamily="Roboto"
              fontSize={25}
              color={'primary'}
              textTransform="uppercase"
              component={'h2'}
            >
              Nạp Game
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container columnSpacing={1.5}>
              <Grid item md={6} xs={6}>
                <Typography fontSize={15} fontWeight="600" component={'h5'}>
                  Yêu cầu <br />{' '}
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 'bold',
                      color: '#d33'
                    }}
                  >
                    {dataDeposit.pending}
                  </span>
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography
                  fontSize={15}
                  fontWeight="600"
                  textAlign="right"
                  component={'h5'}
                >
                  Thành công <br />
                  <span
                    style={{
                      fontSize: '17px',
                      fontWeight: 'bold',
                      color: '#d33'
                    }}
                  >
                    {dataDeposit.success + 10}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 1, mb: 1.5 }} />
            <Box textAlign={'center'}>
              <Link href={'/topup-genshin'}>
                <Button variant="contained" color="secondary">
                  Khám phá
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Grid>
       */}
      {/* <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Shop phụ kiện"
          url="/shop"
          image={shopphukien}
          data={dataProduct}
        />
      </Grid> */}
    </Grid>
  );
}

export default ProductCollection;
