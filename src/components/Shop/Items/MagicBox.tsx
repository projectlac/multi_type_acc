import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import imgTik from '../../../assets/images/tiktok-logo-4500.svg';
interface IProp {
  linkTiktok: string;
  slug: string;
}
function MagicBox({ linkTiktok, slug }: IProp) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '37px',
        mt: 2
      }}
    >
      <Box
        sx={{
          height: '37px',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffefa3',
          zIndex: 1,
          width: '10%',
          cursor: 'pointer',
          transition: 'all 0.3s',
          '& img': {
            position: 'absolute',
            width: '26px',
            left: '5px',
            top: '6px'
          },
          '& span': {
            color: '#ffefa3',
            opacity: 0,
            visibility: 'hidden',
            transition: '0.3s all'
          },
          '&::before': {
            width: '0',
            height: '0',
            borderTop: '19px solid transparent',
            borderBottom: '18px solid transparent',
            content: '""',
            position: 'absolute',
            borderLeft: '19px solid #ffefa3',
            right: '-19px'
          },
          '&:hover': {
            width: '90%',

            '& span': {
              color: '#000',
              opacity: 1,
              visibility: 'inherit'
            }
          }
        }}
      >
        <a href={linkTiktok}>
          <img src={imgTik} alt="An SVG of an eye" />
          <span>Đi tới Tiktok Shop</span>
        </a>
      </Box>
      <Box
        sx={{
          height: '37px',
          position: 'absolute',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#c1bfff',
          zIndex: 0,
          cursor: 'pointer',
          '& a': {
            color: '#000'
          }
        }}
      >
        <Link href={`${slug}`}>Xem Chi tiết</Link>
      </Box>
    </Box>
  );
}

export default MagicBox;
