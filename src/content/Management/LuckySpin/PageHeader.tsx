import { useAuth } from '@/contexts/AuthGuard';
import { Grid, Typography } from '@mui/material';

function PageHeader() {
  const { user: userData } = useAuth();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Quản lý vòng quay
        </Typography>
        <Typography variant="subtitle2">
          Chào {userData?.username}, nơi đây quản lý vòng quay may mắn
        </Typography>
      </Grid>
      <Grid item>{/* <AddAccount title="Thêm tài khoản" /> */}</Grid>
    </Grid>
  );
}

export default PageHeader;
