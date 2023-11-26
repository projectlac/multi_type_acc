import { useRef, useState } from 'react';

import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import NextLink from 'next/link';

import { useAuth } from '@/contexts/AuthGuard';
import formatMoney from '@/utility/formatMoney';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { styled } from '@mui/material/styles';
import DialogChangePassword from '@/components/Common/DialogCommon/DialogChangePassword';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  () => `
        color:#fff
`
);

function HeaderUserbox() {
  const { logout } = useAuth();
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/LOGO.png',
    jobtitle: 'Admin'
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { user: userData } = useAuth();

  const [openDialogChangePassword, setOpenDialogChangePassword] =
    useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenDialogChangePassword(true);
  };
  const handleClickClose = () => {
    setOpenDialogChangePassword(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <UserBoxText>
            <UserBoxLabel
              variant="body1"
              sx={{
                color: '#fff'
              }}
            >
              {userData.username || user.name}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {userData.role || user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Box>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {userData.username || user.name}
            </UserBoxLabel>
            <UserBoxDescription variant="body2" sx={{ color: `#d33` }}>
              {formatMoney(userData.money) || `0`} VNĐ
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          {userData.role !== 'USER' && (
            <>
              {userData && userData?.role === 'NEWS' ? (
                <NextLink href="/management/news" passHref>
                  <ListItem button>
                    <AccountTreeTwoToneIcon fontSize="small" />
                    <ListItemText primary="Quản lý" />
                  </ListItem>
                </NextLink>
              ) : (
                <NextLink href="/dashboards" passHref>
                  <ListItem button>
                    <AccountTreeTwoToneIcon fontSize="small" />
                    <ListItemText primary="Quản lý" />
                  </ListItem>
                </NextLink>
              )}
            </>
          )}
          {userData.role && (
            <NextLink href="/history" passHref>
              <ListItem button>
                <AccountTreeTwoToneIcon fontSize="small" />
                <ListItemText primary="Lịch sử mua hàng" />
              </ListItem>
            </NextLink>
          )}
          {userData.role && (
            <Box onClick={handleClickOpen}>
              <ListItem button>
                <AccountTreeTwoToneIcon fontSize="small" />
                <ListItemText primary="Đổi mật khẩu" />
              </ListItem>
            </Box>
          )}
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={logout}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Đăng xuất
          </Button>
        </Box>
      </Popover>
      <DialogChangePassword
        open={openDialogChangePassword}
        handleClose={handleClickClose}
      ></DialogChangePassword>
    </>
  );
}

export default HeaderUserbox;
