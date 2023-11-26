import { Box, Container, Grid, styled, Typography } from '@mui/material';
import Link from 'next/link';
import TitleSpecial from '../Common/TitleSpecial';
import DialogRedirect from '../Common/DialogRedirect/DialogRedirect';
import { useState } from 'react';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
        background: rgb(27 25 60 / 58%);
        color: #fff;
`
);

function Footer() {
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pt={3}
        pb={2}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="center"
      >
        <Typography component="h1">
          <TitleSpecial mt={2}>GenshinViet.com</TitleSpecial>
        </Typography>
      </Box>
      <Container>
        <Grid container columnSpacing={1.5}>
          <Grid item md={4} xs={12}>
            <Typography
              className="highlight-text"
              fontWeight={'bold'}
              sx={{
                fontSize: { md: 25, xs: 18 }
              }}
            >
              Về chúng tôi
            </Typography>
            {/* <p className="footer-p">
              Shop GenshinViet.com luôn đáp ứng nhu cầu, niềm tin tưởng của
              khách hàng khi muốn tìm 1 Account chất lượng để trải nghiệm tựa
              game Genshin Impact với tiêu chí: <br />
            </p>
            <p className="footer-p">Rẻ - Chất lượng - An toàn</p>
            <p className="footer-p">
              Chúng tôi với đội ngũ chuyên nghiệp, luôn hỗ trợ khách hàng nhanh
              chóng hiệu quả
            </p> */}
          </Grid>

          <Grid item md={4} xs={12}>
            <Box
              sx={{
                px: { xs: 0, md: 2 },
                '& p a': {
                  color: '#fff',
                  fontWeight: '600'
                }
              }}
            >
              <Typography
                className="highlight-text"
                fontWeight={'bold'}
                sx={{
                  fontSize: { md: 25, xs: 18 }
                }}
              >
                Sản phẩm và dịch vụ
              </Typography>
              <p className="footer-p" onClick={handleClickOpen}>
                <Link href={'#'}>ACC VIP</Link>
              </p>

              <p className="footer-p" onClick={handleClickOpen}>
                <Link href={'#'}>ACC REROLL</Link>
              </p>
              <p className="footer-p" onClick={handleClickOpen}>
                <Link href={'#'}>ACC RANDOM</Link>
              </p>
              <p className="footer-p" onClick={handleClickOpen}>
                <Link href={'#'}>NẠP GAME</Link>
              </p>
              <DialogRedirect open={open1} handleClose={handleClose} />
              {/* <p className="footer-p">
                <Link href={'/shop'}>SHOP PHỤ KIỆN</Link>
              </p> */}
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography
              className="highlight-text"
              fontWeight={'bold'}
              sx={{
                fontSize: { md: 25, xs: 18 }
              }}
            >
              Liên hệ
            </Typography>
            <p className="footer-p">
              Hotline:{' '}
              <Link href={'tel:0372790362'}>
                <b>0372790362</b>
              </Link>
            </p>{' '}
            <p className="footer-p">
              Zalo:{' '}
              <Link href={'https://zalo.me/0372790362'}>
                <b>0372790362</b>
              </Link>
            </p>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              '& p': {
                textAlign: 'center',
                borderTop: '1px solid #fff',
                paddingTop: '15px'
              },
              '& p a': { fontWeight: '600', color: '#fff' }
            }}
          >
            <p className="mt-3 small">
              Copyright by © <Link href={'/'}>GenshinViet.com </Link>2022
            </p>
          </Grid>
        </Grid>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
