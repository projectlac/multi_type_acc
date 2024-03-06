import random from '@/assets/images/mainCategory/310172264_428812392669349_4896007792527675904_n.webp';
import napgame from '@/assets/images/mainCategory/310320905_485170040201744_4282135316084233675_n.webp';
import rrr from '@/assets/images/mainCategory/310545249_770219224063920_253246776766894058_n.webp';
import newHsr from '@/assets/images/mainCategory/ACCKHOIDAU.webp';
import codegame from '@/assets/images/mainCategory/CODE.jpg';
import caythue from '@/assets/images/mainCategory/CT.jpg';
import rerollHsr from '@/assets/images/mainCategory/accreroll.webp';
import hsr from '@/assets/images/mainCategory/accvip.webp';

import bgVip from '@/assets/images/mainCategory/310860207_1164961827704035_4343141035597341049_n.webp';
import news from '@/assets/images/mainCategory/9bf1a5932675ff2ba664.webp';

import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { getDepositHome, getInfoAllAccount } from 'api/apiAccount/account';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TitleWeb from '../Common/TitleWeb';
import ProductCollectionItem from './ProductCollectionItem';
interface IAll {
  inStock: number;
  sold: number;
  total: string;
  type: string;
  gameSlug: string;
}
function ProductCollection() {
  // const [open1, setOpen1] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen1(true);
  // };

  // const handleClose = () => {
  //   setOpen1(false);
  // };

  const [dataAccVip, setDataAccVip] = useState<IAll>();
  const [dataAccRandom, setDataAccRandom] = useState<IAll>();
  const [dataAccReroll, setDataAccReroll] = useState<IAll>();

  const [dataAccNew, setDataAccNew] = useState<IAll>();
  const [dataProduct, setDataProduct] = useState<IAll>();
  const [dataHsr, setDataHsr] = useState<IAll>();
  const [dataNewHsr, setDataNewHsr] = useState<IAll>();
  const [dataRerollHsr, setDataRerollHsr] = useState<IAll>();
  const [dataRandomHsr, setDataRandomHsr] = useState<IAll>();
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
        if (d.type === 'VIP' && d.gameSlug === 'genshin-impact')
          setDataAccVip(gianDoi(d, 142));
        if (d.type === 'VIP' && d.gameSlug === 'honkai-star-rail')
          setDataHsr(d);
        if (d.type === 'REROLL' && d.gameSlug === 'genshin-impact')
          setDataAccReroll(gianDoi(d, 64));
        if (d.type === 'RANDOM' && d.gameSlug === 'genshin-impact')
          setDataAccRandom(gianDoi(d, 103));
        if (d.type === 'NEW' && d.gameSlug === 'genshin-impact')
          setDataAccNew(gianDoi(d, 1346));
        if (d.type === 'PRODUCT') setDataProduct(gianDoi(d, 209));
        if (d.type === 'NEW' && d.gameSlug === 'honkai-star-rail')
          setDataNewHsr(d);
        if (d.type === 'REROLL' && d.gameSlug === 'honkai-star-rail')
          setDataRerollHsr(d);
        if (d.type === 'RANDOM' && d.gameSlug === 'honkai-star-rail')
          setDataRandomHsr(d);
      });
    });
    getDepositHome().then((res) => {
      setDataDeposit(res.data);
    });
  }, []);
  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item md={12} sm={12} xs={12}>
        <Box
          pt={3}
          pb={2}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="center"
        >
          <TitleWeb mt={2}>ACC GENSHIN</TitleWeb>
        </Box>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Vip"
          url="/account/genshin-impact/vip"
          image={bgVip}
          data={dataAccVip}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Khởi Đầu"
          url="/account/genshin-impact/new"
          image={news}
          data={dataAccNew}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Reroll"
          url="/reroll-check"
          image={rrr}
          data={dataAccReroll}
        />
      </Grid>

      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Acc Random"
          url="/account/genshin-impact/random"
          image={random}
          data={dataAccRandom}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
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
              // onClick={handleClickOpen}
              sx={{
                cursor: 'pointer',
                minHeight: '175px',
                width: '100%',
                position: 'relative'
              }}
            >
              <Image
                src={napgame}
                alt="Nạp game"
                layout="fill"
                objectFit="cover"
              />
            </Box>
            {/* <Box
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
            ></Box> */}
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
              Nạp Genshin & HSR
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
                <Button
                  variant="contained"
                  color="secondary"
                  // onClick={handleClickOpen}
                >
                  Khám phá
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Grid>
      {/* <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="Shop phụ kiện"
          url="/shop"
          image={shopphukien}
          data={dataProduct}
        />
      </Grid> */}
      <Grid item md={3} sm={6} xs={12}>
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
          <Link href={'/code'}>
            <Box
              sx={{
                cursor: 'pointer',
                minHeight: '175px',
                width: '100%',
                position: 'relative'
              }}
            >
              <Image
                src={codegame}
                alt="Code Game"
                layout="fill"
                objectFit="cover"
              />
            </Box>
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
              Code Game
            </Typography>
            <Divider sx={{ mt: 1, mb: 8 }} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Box textAlign={'center'}>
              <Link href={'/code'}>
                <Button variant="contained" color="secondary">
                  Khám phá
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
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
          <Link href={'/plowing'}>
            <Box
              sx={{
                cursor: 'pointer',
                minHeight: '175px',
                width: '100%',
                position: 'relative'
              }}
            >
              <Image
                src={caythue}
                alt="Cày thuê"
                layout="fill"
                objectFit="cover"
              />
            </Box>
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
              Cày thuê
            </Typography>
            <Divider sx={{ mt: 1, mb: 8 }} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Box textAlign={'center'}>
              <Link href={'/plowing'}>
                <Button variant="contained" color="secondary">
                  Khám phá
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Box
          pt={3}
          pb={2}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="center"
        >
          <TitleWeb mt={2}>ACC HONKAI STAR RAIL</TitleWeb>
        </Box>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="HSR VIP"
          url="/account/honkai-star-rail/vip"
          image={hsr}
          data={dataHsr}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="HSR Khởi đầu"
          url="/account/honkai-star-rail/new"
          image={newHsr}
          data={dataNewHsr}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="HSR Reroll"
          url="/account/honkai-star-rail/reroll"
          image={rerollHsr}
          data={dataRerollHsr}
        />
      </Grid>
      {/* <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          title="HSR Random"
          url="/account/honkai-star-rail/random"
          image={randomHsr}
          data={dataRandomHsr}
        />
      </Grid>{' '} */}
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
          <Link href={'/lucky-spin'}>
            <Box
              sx={{
                cursor: 'pointer',
                minHeight: '175px',
                width: '100%',
                position: 'relative'
              }}
            >
              <Image
                src={lucky}
                alt="Vòng quay may mắn"
                layout="fill"
                objectFit="cover"
              />
            </Box>
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
              Lucky Spin
            </Typography>
            <Divider sx={{ mt: 1, mb: 8 }} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Box textAlign={'center'}>
              <Link href={'/lucky-spin'}>
                <Button variant="contained" color="secondary">
                  Khám phá
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Grid> */}
      {/* <CommonNotification handleClose={handleClose} open={open1} /> */}
    </Grid>
  );
}

export default ProductCollection;
