import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CountUp from 'react-countup';
interface IAll {
  inStock: number;
  sold: number;
  total: string;
  type: string;
}
interface ICollectionItemProps {
  title: string;
  data: IAll;
  image: string;
  action: () => void;
  url?: string;
}
function ProductCollectionItem({
  data,
  title,
  url,
  image,
  action
}: ICollectionItemProps) {
  const router = useRouter();
  return (
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
      <Box
        onClick={() => {
          // localStorage.removeItem('filter');
          // router.push(url);
          action();
        }}
        sx={{
          cursor: 'pointer',
          minHeight: '175px',
          width: '100%',
          position: 'relative'
        }}
      >
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
        {/* <Box
          className="eff"
          sx={{
            height: '175px',
            background: `url(${image})`,
            width: '100%',
            backgroundSize: 'cover',
            backgrouadPosition: 'center center',
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
      </Box>

      <Box mt={1}>
        <Typography
          textAlign={'center'}
          fontWeight={'900'}
          fontFamily="Roboto"
          fontSize={25}
          color={'primary'}
          textTransform="uppercase"
          sx={{ cursor: 'pointer' }}
          component={'h2'}
          onClick={() => {
            action();
            // localStorage.removeItem('filter');
            // router.push(url);
          }}
        >
          {title}
        </Typography>

        <Divider sx={{ mt: 1, mb: 1.5 }} />
        <Box textAlign={'center'}>
          <Box
            onClick={() => {
              action();
              // localStorage.removeItem('filter');
              // router.push(url);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Button variant="contained" color="secondary">
              Khám phá
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default ProductCollectionItem;
