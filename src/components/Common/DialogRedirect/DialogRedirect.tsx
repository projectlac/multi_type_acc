import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import React from 'react';

function DialogRedirect({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Thông báo'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography fontWeight={'bold'}>
            Hãy ib zalo 0372790362 để biết thêm thông tin chi tiết{' '}
            <a href="https://zalo.me/0372790362" target="__blank">
              ấn vào đây
            </a>
          </Typography>
          <br />{' '}
          <Typography fontWeight={'bold'}>
            Hoặc Facebook chủ shop{' '}
            <a href="https://www.facebook.com/nguyenhung208" target="__blank">
              ấn vào đây
            </a>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogRedirect;
