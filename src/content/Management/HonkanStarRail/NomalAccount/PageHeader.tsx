import { useAuth } from '@/contexts/AuthGuard';
import { Box, Grid, Typography } from '@mui/material';

import AddAccount from './Action/AddAccount';
import AddMultiAccount from './Action/AddMultiAccount';

function PageHeader() {
  const { user: userData } = useAuth();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách tài khoản thường
        </Typography>
        <Typography variant="subtitle2">
          Chào {userData?.username}, nơi đây quản lý tài khoản reroll và random
        </Typography>
      </Grid>
      <Grid item>
        <Box>
          <Box mb={1}>
            <AddAccount title="Thêm tài khoản" />
          </Box>
          <AddMultiAccount title="Thêm nhiều tài khoản" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
