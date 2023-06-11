import { useAuth } from '@/contexts/AuthGuard';
import { Grid, Typography } from '@mui/material';

import AddAccount from './Action/AddAccount';

function PageHeader() {
  const { user: userData } = useAuth();
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách Code
        </Typography>
        <Typography variant="subtitle2">
          {userData?.username}, thao tác với Code tại đây
        </Typography>
      </Grid>
      <Grid item>
        <AddAccount title="Thêm code" />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
