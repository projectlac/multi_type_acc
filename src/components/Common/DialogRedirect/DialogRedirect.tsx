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
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontSize: 20 }}>
        {'Thông báo'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography
            fontWeight={'bold'}
            color={'black'}
            sx={{ span: { color: 'red', textTransform: 'uppercase' } }}
          >
            Web vẫn <span>hoạt động bình thường</span> vui lòng hãy liên hệ
            admin:
          </Typography>
          <Typography
            fontWeight={'bold'}
            color={'red'}
            sx={{
              span: { textTransform: 'uppercase' },
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',

              a: { mx: 0.5, textTransform: 'uppercase' },
              p: { mb: 0 }
            }}
          >
            <PlayArrowIcon />
            <p>
              Nếu sử dụng <span>zalo</span> hãy liên hệ admin ấn vào đây{' '}
              <a href="https://zalo.me/0372790362" target="__blank">
                ấn vào đây
              </a>
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

              a: { mx: 0.5, textTransform: 'uppercase' }
            }}
          >
            <PlayArrowIcon />
            <p style={{ margin: 0 }}>
              Nếu các bạn sử dụng <span>facebook</span> hãy{' '}
              <a href="https://www.facebook.com/nguyenhung208" target="__blank">
                ấn vào đây
              </a>{' '}
              để liên hệ admin
            </p>
          </Typography>
          <hr />
          <Typography
            fontWeight={'600'}
            sx={{
              span: { textTransform: 'uppercase' },
              textAlign: 'center',
              a: { mx: 0.5, textTransform: 'uppercase' },
              p: { mb: 0 }
            }}
          >
            Lưu ý: <br /> Web vẫn hoạt động bình thường, <br /> các bạn hãy liên
            hệ admin để biết thêm thông tin chi tiết <br />
            Cảm ơn các bạn và rất xin lỗi vì sự bất tiện này ❤
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
