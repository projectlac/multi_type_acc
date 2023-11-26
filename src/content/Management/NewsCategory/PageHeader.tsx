import { Grid, Typography } from '@mui/material';

import AddTag from './Action/AddTag';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: ' /static/images/avatars/LOGO.png'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Quản lý danh mục tin tức
        </Typography>
        <Typography variant="subtitle2">
          Chào {user.name}, thêm và thao tác với danh mục tin tức ở đây nhé
        </Typography>
      </Grid>
      <Grid item>
        <AddTag title="Tạo tag" />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
