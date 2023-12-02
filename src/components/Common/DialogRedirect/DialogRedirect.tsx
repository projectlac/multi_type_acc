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
            <a href="https://genshinviet.com.vn/">ấn vào đây</a>
          </Typography>
          <br />
          <Typography
            fontWeight={'bold'}
            color={'red'}
            sx={{
              span: { textTransform: 'uppercase' },
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',

              a: {
                mx: 0.5,
                textTransform: 'uppercase',
                animation: 'color-change infinite 0.5s'
              },
              p: { mb: 0 }
            }}
          >
            <PlayArrowIcon />
            <p>
              Nếu các bạn sử dụng <span>FACEBOOK</span> hãy{' '}
              <a
                href="https://m.me/122101845332012058"
                target="_blank"
                rel="noopener noreferrer"
              >
                ẤN VÀO ĐÂY
              </a>{' '}
              để liên hệ admin
            </p>
          </Typography>
          <Typography
            fontWeight={'bold'}
            color={'red'}
            sx={{
              span: { textTransform: 'uppercase' },
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',

              a: {
                mx: 0.5,
                textTransform: 'uppercase',
                animation: 'color-change infinite 0.5s'
              },
              p: { mb: 0 }
            }}
          >
            <PlayArrowIcon />
            <p>
              Nếu page không trả lời hãy{' '}
              <a href="https://zalo.me/0372790362" target="__blank">
                <b>ấn vào đây</b>
              </a>{' '}
              để liên hệ ADMIN
            </p>
          </Typography>
          <Typography
            fontWeight={'bold'}
            color={'red'}
            sx={{
              span: { textTransform: 'uppercase' },
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              p: { mb: 0 },
              a: {
                mx: 0.5,
                textTransform: 'uppercase',
                animation: 'color-change infinite 0.5s'
              }
            }}
          >
            <PlayArrowIcon />
            <p>
              Link facebook chủ shop
              <a href="https://www.facebook.com/nguyenhung208" target="__blank">
                ấn vào đây
              </a>{' '}
            </p>
          </Typography>
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
              rel="noopener noreferrer"
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
