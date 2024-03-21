import bg from '@/assets/images/genshin-impact-nawpic.webp';
import Zalo from '@/assets/images/zalogo-png.png';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthGuard';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, styled } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FC, ReactNode, useState } from 'react';
import MessengerChat from 'react-messenger-customer-chat';
// import MessengerChat from 'react-messenger-customer-chat';
import HeaderUserbox from './Userbox';
interface BaseLayoutProps {
  children?: ReactNode;
}
const Header = styled(Box)({
  backgroundColor: 'rgb(0 0 0 / 27%)',
  position: 'fixed',
  width: '100%',
  zIndex: 999
});
const MenuWrapper = styled(Box)({
  display: 'flex',
  height: '70px',
  alignItems: 'center',
  justifyContent: 'space-between'
});
const FullBG = styled(Box)({
  background: `url(${bg})`,
  overflow: 'auto',
  flex: '1',
  overflowX: 'hidden',
  backgroundAttachment: 'fixed'
});
const MobileMenu = styled(Box)({
  zIndex: '9999',
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: '0',
  left: '0',
  transition: '0.3s all',
  transform: 'translateX(-110vw)',
  background: '#090909ba',
  '& ul': {
    display: 'block',
    marginTop: '75px',
    '& li': {
      padding: '7px 5px',
      borderLeft: '5px solid red',
      margin: '7px 0',
      borderBottom: '1px solid #00000021',
      '& a': {
        fontSize: '15px'
      }
    }
  },
  '& svg': {
    display: 'flex',
    position: 'fixed',
    right: '25px',
    top: '25px'
  },
  '&.active': {
    transform: 'translateX(0)'
  }
});
const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [open, setOpen] = useState<boolean>(false);
  // const [open1, setOpen1] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen1(true);
  // };

  // const handleClose = () => {
  //   setOpen1(false);
  // };
  return (
    <Box>
      <Header>
        <Container>
          <MenuWrapper
            sx={{
              '& ul': {
                display: 'flex',
                listStyle: 'none',
                '& li': {
                  margin: '0 25px',
                  fontWeight: 'bold',
                  '@media (max-width:768px)': {
                    '&.login': {
                      border: '1px solid #fff',
                      borderRadius: '20px',
                      margin: '0',
                      padding: '5px'
                    }
                  },

                  '& a': {
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: 17
                  },
                  '& p': {
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: 17,
                    marginBlockStart: 0,
                    marginBlockEnd: 0,
                    cursor: 'pointer'
                  }
                }
              }
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <ul style={{ padding: 0 }}>
                <li style={{ marginLeft: 0 }}>
                  {/* <Link
                    href={'https://m.me/122101845332012058'}
                    target={'__blank'}
                  >
                    <a target="_blank">Hỗ trợ KH </a>
                  </Link> */}
                  <Link href={'https://zalo.me/84372790362'} target={'__blank'}>
                    <a target="_blank">Hỗ trợ KH </a>
                  </Link>
                </li>
                <li>
                  <Link href={'/'}>Trang chủ</Link>
                </li>
                <li>
                  <Link href={'/topup'}>Nạp tiền</Link>
                </li>
                <li>
                  <Link href={'/topup-genshin'}>Nạp game</Link>
                </li>
                <li>
                  <Link href={'/reputation'}>Check uy tín</Link>
                </li>
                <li>
                  <Link href={'/news'}>Thông tin Shop</Link>
                </li>
              </ul>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <MenuIcon
                sx={{
                  color: '#fff'
                }}
                onClick={() => {
                  setOpen(true);
                }}
              />

              <MobileMenu className={open ? 'active' : ''}>
                <CloseIcon
                  sx={{ color: '#fff' }}
                  onClick={() => setOpen(false)}
                />
                <ul
                  onClick={() => setOpen(false)}
                  style={{ flexDirection: 'column' }}
                >
                  <li>
                    <Link href={'/'}>Trang chủ</Link>
                  </li>
                  <li>
                    <Link href={'/topup'}>Nạp tiền</Link>
                  </li>
                  <li>
                    <Link href={'/topup-genshin'}>Nạp game</Link>
                  </li>
                  <li>
                    <Link href={'/reputation'}>Check uy tín</Link>
                  </li>
                  <li>
                    <Link href={'/news'}>Thông tin Shop</Link>
                  </li>
                  <li>
                    {/* <Link
                      href={'https://www.facebook.com/nguyenhung208/'}
                      target={'__blank'}
                    >
                      <a target="_blank">Fanpage hỗ trợ khách hàng</a>
                    </Link> */}
                    <Link
                      href={'https://zalo.me/84372790362'}
                      target={'__blank'}
                    >
                      <a target="_blank">Fanpage hỗ trợ khách hàng</a>
                    </Link>
                  </li>
                </ul>
              </MobileMenu>
            </Box>
            <Box>
              {isAuthenticated ? (
                <HeaderUserbox />
              ) : (
                <ul>
                  <li className="login">
                    <Link href={'/login'}>Đăng nhập</Link>
                  </li>
                </ul>
              )}
            </Box>
          </MenuWrapper>
          {/* <MessengerChat pageId="103780805920496" language="vi_VN" /> */}
        </Container>
      </Header>
      <FullBG>
        {children}
        {/* <MessengerChat pageId="122101845332012058" language="vi_VN" /> */}
        <Box
          sx={{
            width: 90,
            height: 90,
            position: 'fixed',
            right: '10px',
            bottom: '100px'
          }}
        >
          <a href="https://zalo.me/0372790362" target="__blank">
            <Image
              src={Zalo}
              alt="Zalo"
              width={90}
              height={90}
              objectFit="contain"
            />
          </a>
        </Box>
        <Footer />
      </FullBG>
      {/* <CommonNotification handleClose={handleClose} open={open1} /> */}
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
