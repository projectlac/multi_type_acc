import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material';
import React from 'react';
interface PropsNotification {
  open: boolean;
  handleClose: () => void;
}
function CommonNotification({ open, handleClose }: PropsNotification) {
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
          <Typography sx={{ color: '#000' }}>
            Vui lòng IB Zalo{' '}
            <a
              href="http://zalo.me/0372790362"
              target="_blank"
              rel="noopener noreferrer"
            >
              0372790362
            </a>{' '}
            <br />
            Để được nạp game
          </Typography>
        </DialogContentText>
      </DialogContent>
      <Divider></Divider>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="contained">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommonNotification;
