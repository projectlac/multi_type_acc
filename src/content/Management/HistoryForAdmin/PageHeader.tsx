import { Grid, Typography } from '@mui/material';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: ' /static/images/avatars/LOGO.png'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Lịch sử Web
        </Typography>
        <Typography variant="subtitle2">
          Chào {user.name}, bạn có thể xem lịch sử mua bán, nạp, xóa tài khoản ở
          đây nhé
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
