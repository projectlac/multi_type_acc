import { Grid, Typography } from '@mui/material';

import AddTag from './Action/AddTag';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: ' /static/images/avatars/android-chrome-512x512.png'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Danh sách các loại Code
        </Typography>
        <Typography variant="subtitle2">
          Chào {user.name}, thêm và thao tác với các loại Code ở đây nhé!
        </Typography>
      </Grid>
      <Grid item>
        <AddTag title="Tạo loại code mới" />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
