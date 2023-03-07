import { useAuth } from '@/contexts/AuthGuard';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { getWebInformation, updatePriceSpin } from 'api/auth';
import { useEffect, useState } from 'react';

function PageHeader() {
  const { user: userData, update, updateSuccess, handleSetMessage } = useAuth();

  const [price, setPrice] = useState<number>(0);
  useEffect(() => {
    getWebInformation().then((res) => {
      setPrice(
        typeof res.data[0].spinning_price === 'number'
          ? res.data[0].spinning_price
          : 0
      );
    });
  }, [update]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+e.target.value);
  };
  const submit = () => {
    updatePriceSpin(price).then(() => {
      handleSetMessage({
        type: 'success',
        message: `Cập nhật thành công!`
      });
      updateSuccess();
    });
  };
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
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          name="price"
          label="Giá 1 lượt quay"
          type={'number'}
          value={price}
          onChange={handleChange}
        ></TextField>
        <Button variant="contained" onClick={submit}>
          Sửa
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
