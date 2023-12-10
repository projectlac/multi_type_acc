import codegame from '@/assets/images/change/CODEPRIME.jpg';
import rerollHsr from '@/assets/images/change/REROLL HSR.jpg';
import napgame from '@/assets/images/change/THETHANG.jpg';
import caythue from '@/assets/images/change/cay.jpg';
import newHsr from '@/assets/images/change/newhrs.jpg';
import random from '@/assets/images/change/ran.jpg';
import rrr from '@/assets/images/change/roll.jpg';
import hsr from '@/assets/images/change/viphrs.jpg';

import news from '@/assets/images/change/kd.jpg';
import bgVip from '@/assets/images/change/vip.jpg';

import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { getInfoAllAccount } from 'api/apiAccount/account';
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
function ProductCollection({ action }) {
  const [dataAccVip, setDataAccVip] = useState<IAll>();
  const [dataAccRandom, setDataAccRandom] = useState<IAll>();
  const [dataAccReroll, setDataAccReroll] = useState<IAll>();
  const [dataAccNew, setDataAccNew] = useState<IAll>();
  const [dataHsr, setDataHsr] = useState<IAll>();
  const [dataNewHsr, setDataNewHsr] = useState<IAll>();
  const [dataRerollHsr, setDataRerollHsr] = useState<IAll>();

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

        if (d.type === 'NEW' && d.gameSlug === 'honkai-star-rail')
          setDataNewHsr(d);
        if (d.type === 'REROLL' && d.gameSlug === 'honkai-star-rail')
          setDataRerollHsr(d);
      });
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
          <TitleWeb mt={2}>ACC GS</TitleWeb>
        </Box>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          action={action}
          title="Acc Vip"
          url="/account/genshin-impact/vip"
          image={bgVip}
          data={dataAccVip}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          action={action}
          title="Acc Khởi Đầu"
          url="/account/genshin-impact/new"
          image={news}
          data={dataAccNew}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          action={action}
          title="Acc Reroll"
          url="/account/genshin-impact/reroll"
          image={rrr}
          data={dataAccReroll}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          action={action}
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
          <Link href={'#'} onClick={action}>
            <Box
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

            <Divider sx={{ mt: 1, mb: 1.5 }} />
            <Box textAlign={'center'}>
              <Link href={'#'} onClick={action}>
                <Button variant="contained" color="secondary">
                  Khám phá
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Grid>
      {/* <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
        action={action}
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
          <Link href={'#'} onClick={action}>
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

            <Divider sx={{ mt: 1, mb: 1.5 }} />
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
          <Link href={'#'} onClick={action}>
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
            <Divider sx={{ mt: 1, mb: 1.5 }} />
            <Box textAlign={'center'}>
              <Link href={'#'} onClick={action}>
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
          <TitleWeb mt={2}>ACC HSR</TitleWeb>
        </Box>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          action={action}
          title="HSR VIP"
          url="/account/honkai-star-rail/vip"
          image={hsr}
          data={dataHsr}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          action={action}
          title="HSR Khởi đầu"
          url="/account/honkai-star-rail/new"
          image={newHsr}
          data={dataNewHsr}
        />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ProductCollectionItem
          action={action}
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
    </Grid>
  );
}

export default ProductCollection;
