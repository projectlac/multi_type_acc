import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
function DialogRedirect({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography fontWeight={"bold"} color={"red"}>
            Thông Báo
          </Typography>
          <Typography
            fontWeight={"bold"}
            color={"red"}
            sx={{ span: { textTransform: "uppercase" } }}
          >
            Web vẫn <span>hoạt động bình thường</span>{" "}
            vui lòng hãy liên hệ admin:
          </Typography>

          <Typography
            fontWeight={"bold"}
            color={"red"}
            sx={{ span: { textTransform: "uppercase" } }}
          >
            <PlayArrowIcon /> Nếu sử dụng <span>zalo</span>{" "}
            hãy liên hệ admin ấn vào đây{" "}
            <a href="https://zalo.me/0372790362" target="__blank">
              ấn vào đây
            </a>
          </Typography>
          <Typography
            fontWeight={"bold"}
            color={"red"}
            sx={{ span: { textTransform: "uppercase" } }}
          >
            <PlayArrowIcon /> Nếu các bạn sử dụng <span>facebook</span> hãy{" "}
            <a href="https://www.facebook.com/nguyenhung208" target="__blank">
              ấn vào đây
            </a>{" "}
            để liên hệ admin
          </Typography>

          Lưu ý : Web vẫn hoạt động bình thường các bạn hãy liên hệ admin để
          biết thêm thông tin chi tiết

          Cảm ơn các bạn và rất xin lỗi vì sự bất tiện này ❤
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogRedirect;
