import { useAuth } from '@/contexts/AuthGuard';
import { Grid, Typography } from '@mui/material';

function PageHeaderLuckySpin() {
  const { user: userData } = useAuth();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Quản lý đơn yêu cầu gửi
        </Typography>
        <Typography variant="subtitle2">
          Hú {userData?.username}, quản lý đơn ở đây nhé~!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeaderLuckySpin;
