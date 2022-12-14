import bg from '@/assets/images/genshin-impact-nawpic.jpg';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthGuard';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, styled } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FC, ReactNode, useState } from 'react';
import MessengerChat from 'react-messenger-customer-chat';
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
                  }
                }
              }
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <ul style={{ padding: 0 }}>
                <li style={{ marginLeft: 0 }}>
                  <Link href={'https://m.me/103780805920496'}>
                    <a target="_blank">Fanpage h??? tr??? kh??ch h??ng</a>
                  </Link>
                </li>
                <li>
                  <Link href={'/'}>Trang ch???</Link>
                </li>
                <li>
                  <Link href={'/topup'}>N???p ti???n</Link>
                </li>
                <li>
                  <Link href={'/topup-genshin'}>N???p game</Link>
                </li>
                <li>
                  <Link href={'/reputation'}>Check uy t??n</Link>
                </li>
                <li>
                  <Link href={'/shop'}>Shop</Link>
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
                <ul onClick={() => setOpen(false)}>
                  <li>
                    <Link href={'/'}>Trang ch???</Link>
                  </li>
                  <li>
                    <Link href={'/topup'}>N???p ti???n</Link>
                  </li>
                  <li>
                    <Link href={'/topup-genshin'}>N???p game</Link>
                  </li>
                  <li>
                    <Link href={'/reputation'}>Check uy t??n</Link>
                  </li>
                  <li>
                    <Link href={'/shop'}>Shop</Link>
                  </li>
                  <li>
                    <Link href={'https://m.me/103780805920496'}>
                      <a target="_blank">Fanpage h??? tr??? kh??ch h??ng</a>
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
                    <Link href={'/login'}>????ng nh???p</Link>
                  </li>
                </ul>
              )}
            </Box>
          </MenuWrapper>
          <MessengerChat pageId="103780805920496" language="vi_VN" />
        </Container>
      </Header>
      <FullBG>
        {children} <Footer />
      </FullBG>
    </Box>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
