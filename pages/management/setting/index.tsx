import TinyEditor from '@/components/Common/Editor/TinyEditor';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { useAuth } from '@/contexts/AuthGuard';
import SidebarLayout from '@/layouts/SidebarLayout';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField as TF,
  Typography
} from '@mui/material';
import { updateMomo } from 'api/apiSetting/apiSetting';

import { saleType } from 'api/product/productApi';
import Head from 'next/head';
import { useState } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  type: yup.string().required('Trường này là bắt buộc'),
  game: yup.string().required('Trường này là bắt buộc'),
  sale: yup.number().required('Trường này là bắt buộc')
});

const validationMomo = yup.object({
  phone: yup.string().required('Trường này là bắt buộc'),
  token: yup.string().required('Trường này là bắt buộc')
});

function SettingSale() {
  const { handleSetMessage } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const initForm = {
    type: 'RANDOM',
    game: 'genshin-impact',
    sale: '0'
  };

  const initFormMOMO = {
    token: '',
    phone: ''
  };

  const onSubmit = async (values) => {
    const { type, game, sale } = values;
    setLoading(true);
    try {
      saleType({ type, game, sale }).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Cập nhật thành công`
        });
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const updateMOMO = async (values) => {
    const { token, phone } = values;
    setLoading(true);
    try {
      updateMomo(token, phone).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Cập nhật thành công`
        });
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: error.response.data.message
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  const formikMomo = useCustomForm(validationMomo, initFormMOMO, updateMOMO);

  return (
    <>
      <Head>
        <title>Quản lý sale</title>
      </Head>
      <PageTitleWrapper>
        <FormatForm formik={formik}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            rowSpacing={2}
            columnSpacing={2}
          >
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Quản lý sale
              </Typography>
              <Typography variant="subtitle2">
                Quản lý sale sẽ được đăng tại đây đây nhé!
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<SaveIcon fontSize="small" />}
                type="submit"
                disabled={loading}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Game
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-game-label"
                name="game"
                value={formik.values.game}
                onChange={(event) => {
                  formik.handleChange({
                    target: {
                      name: 'game',
                      value: event.target.value
                    }
                  });
                  formik.handleChange({
                    target: {
                      name: 'type',
                      value: 'REROLL'
                    }
                  });
                }}
              >
                <FormControlLabel
                  value="honkai-star-rail"
                  control={<Radio />}
                  label="Honkai star rail"
                />
                <FormControlLabel
                  value="genshin-impact"
                  control={<Radio />}
                  label="Genshin Impact"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Loại acc
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="type"
                value={formik.values.type}
                onChange={(event) => {
                  formik.handleChange({
                    target: {
                      name: 'type',
                      value: event.target.value
                    }
                  });
                }}
              >
                <FormControlLabel
                  value="REROLL"
                  control={<Radio />}
                  label="Reroll"
                />
                {formik.values.game === 'genshin-impact' && (
                  <FormControlLabel
                    value="REROLLVIP"
                    control={<Radio />}
                    label="Reroll 5 sao"
                  />
                )}
                <FormControlLabel
                  value="RANDOM"
                  control={<Radio />}
                  label="Random"
                />
                <FormControlLabel
                  value="NEW"
                  control={<Radio />}
                  label="Khởi đầu"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              formik={formik}
              label="Phần trăm giảm giá"
              variant="outlined"
              fullWidth
              name="sale"
              type="number"
            />
          </Grid>
        </FormatForm>
        <Divider sx={{ my: 2 }} />
        <FormatForm formik={formikMomo}>
          <Grid container columnSpacing={2}>
            <Grid item xs={5}>
              <TextField
                formik={formik}
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                name="phone"
                type="text"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                formik={formik}
                label="Token"
                variant="outlined"
                fullWidth
                name="token"
                type="text"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                sx={{ mt: { xs: 2, md: 0 }, height: '100%' }}
                variant="contained"
                startIcon={<SaveIcon fontSize="small" />}
                type="submit"
                disabled={loading}
                fullWidth
              >
                Update Token
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </PageTitleWrapper>
    </>
  );
}

SettingSale.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default SettingSale;
