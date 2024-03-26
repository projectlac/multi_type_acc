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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
function DialogRedirect({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'red',
          animation: 'color-change infinite 0.5s'
        }}
      >
        {'Thông báo'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography
            fontWeight={'bold'}
            color={'black'}
            sx={{
              span: { color: 'red', textTransform: 'uppercase' },
              a: {
                color: 'red',
                textTransform: 'uppercase',
                animation: 'color-change infinite 0.5s'
              }
            }}
          >
            Web vẫn <span>hoạt động bình thường</span> vui lòng{' '}
            <a
              href="https://genshinviet.com.vn/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              ấn vào đây
            </a>
          </Typography>
          <br />

          <hr />
          <Typography
            fontWeight={'600'}
            sx={{
              span: { textTransform: 'uppercase' },
              textAlign: 'center',
              a: {
                mx: 0.5,
                textTransform: 'uppercase',
                animation: 'color-change infinite 0.5s'
              },
              p: { mb: 0 }
            }}
          >
            Lưu ý: <br /> Web vẫn hoạt động bình thường, <br /> các bạn hãy
            <a
              href="https://genshinviet.com.vn/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              ẤN VÀO ĐÂY
            </a>
            để biết thêm thông tin chi tiết <br />
            Cảm ơn các bạn và rất xin lỗi vì sự bất tiện này ❤
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogRedirect;
