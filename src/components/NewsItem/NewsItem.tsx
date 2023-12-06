import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { INews } from 'model/news';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
interface INewsItem {
  data: INews;
}
function NewsItem({ data }: INewsItem) {
  const router = useRouter();
  return (
    <Card
      sx={{
        width: '100%',
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
          localStorage.removeItem('filter');

          window.open(`https://genshinviet.com/news/${data.slug}`, '_blank');

          // router.push(`/news/${data.slug}`);
        }}
        sx={{
          cursor: 'pointer',
          minHeight: '185px',
          width: '100%',
          position: 'relative'
        }}
      >
        <Image
          src={data.image}
          alt={data.title}
          layout="fill"
          objectFit="cover"
        />
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
          fontSize={23}
          color={'primary'}
          textTransform="capitalize"
          sx={{ cursor: 'pointer' }}
          component={'h2'}
          onClick={() => {
            localStorage.removeItem('filter');
            window.open(`https://genshinviet.com/news/${data.slug}`, '_blank');
          }}
        >
          {data.title}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography
          sx={{
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': 2,
            overflow: 'hidden'
          }}
        >
          {data.detail}
        </Typography>

        <Divider sx={{ mt: 1, mb: 1.5 }} />
        <Box textAlign={'center'}>
          <Box
            onClick={() => {
              localStorage.removeItem('filter');
              window.open(
                `https://genshinviet.com/news/${data.slug}`,
                '_blank'
              );
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Button variant="contained" color="secondary">
              Xem ngay <ChevronRightIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default NewsItem;
