import { Grid, Typography } from '@mui/material';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: ' /static/images/avatars/android-chrome-512x512.png'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Lịch sử nạp
        </Typography>
        <Typography variant="subtitle2">
          Chào {user.name}, 500 bản ghi nạp gần nhất
        </Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}

export default PageHeader;
