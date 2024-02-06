import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/styles';
import Link from 'next/link';

import React from 'react';

const Header = styled(Box)({
  backgroundColor: 'rgb(16 9 9 / 59%)',
  position: 'fixed',
  width: '100%'
});
const MenuWrapper = styled(Box)({
  display: 'flex',
  height: '70px',
  alignItems: 'center',
  justifyContent: 'space-between'
});

function HeaderWrapper() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
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
                '& a': {
                  color: '#e9ebf1',
                  textDecoration: 'none',
                  fontSize: 17
                }
              }
            }
          }}
        >
          <ul>
            <li>
              <Link href={'/'}>Trang chủ</Link>
            </li>
            <li>
              <Link href={''} onClick={handleClickOpen}>
                Nạp tiền
              </Link>
            </li>
            <li>
              <Link href={''}>Nạp game</Link>
            </li>
          </ul>
          <Box>
            <ul>
              <li>
                <Link href={''}>Đăng nhập</Link>
              </li>
              <li>
                <Link href={''}>Đăng ký</Link>
              </li>
            </ul>
          </Box>
        </MenuWrapper>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nạp game IB Zalo{' '}
            <a
              href="http://zalo.me/0372790362"
              target="_blank"
              rel="noopener noreferrer"
            >
              0372790362
            </a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Header>
  );
}

export default HeaderWrapper;
