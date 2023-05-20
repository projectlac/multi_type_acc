import TinyEditor from '@/components/Common/Editor/TinyEditor';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { useAuth } from '@/contexts/AuthGuard';
import SidebarLayout from '@/layouts/SidebarLayout';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Grid, Typography, TextField as TF } from '@mui/material';
import {
  setDescNEW,
  setDescRANDOM,
  setDescRERUN,
  setDescVIP
} from 'api/apiSetting/apiSetting';

import { getWebInformation, updateWebInformation } from 'api/auth';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
const validationSchema = yup.object({
  youtube: yup.string().required('Trường này là bắt buộc')
});
const vip = yup.object({
  vip: yup.string().required('Trường này là bắt buộc')
});
const random = yup.object({
  random: yup.string().required('Trường này là bắt buộc')
});
const rerun = yup.object({
  rerun: yup.string().required('Trường này là bắt buộc')
});
const newAcc = yup.object({
  newAcc: yup.string().required('Trường này là bắt buộc')
});
function ContentManager() {
  const { handleSetMessage } = useAuth();
  const [data, setData] = useState({
    description: '',
    youtube: '',
    facebook: ''
  });
  const onSubmit = async (values) => {
    const { youtube, description, facebook } = values;
    try {
      updateWebInformation(youtube, description, facebook).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Cập nhật thành công`
        });
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
  };
  const onSubmitVip = async (values) => {
    const { vip } = values;
    try {
      setDescVIP(vip).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Cập nhật thành công`
        });
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
  };

  const onSubmitRerun = async (values) => {
    const { rerun } = values;
    try {
      // console.log(rerun);
      setDescRERUN(rerun).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Cập nhật thành công`
        });
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
  };

  const onSubmitNew = async (values) => {
    const { newAcc } = values;
    try {
      // console.log(rerun);
      setDescNEW(newAcc).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Cập nhật thành công`
        });
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
  };
  const onSubmitRandom = async (values) => {
    const { random } = values;
    try {
      setDescRANDOM(random).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Cập nhật thành công`
        });
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
  };

  const initForm = data;
  const initForm1 = { vip: '' };
  const initForm2 = { random: '' };
  const initForm3 = { rerun: '' };
  const initForm4 = { newAcc: '' };

  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  const formikVip = useCustomForm(vip, initForm1, onSubmitVip);
  const formikRandom = useCustomForm(random, initForm2, onSubmitRandom);
  const formikRerun = useCustomForm(rerun, initForm3, onSubmitRerun);
  const formikNew = useCustomForm(newAcc, initForm4, onSubmitNew);

  const changeContent = (data: string) => {
    console.log(data);

    formik.handleChange({
      target: { name: 'description', value: data }
    });
  };

  useEffect(() => {
    getWebInformation().then((res) =>
      setData({
        youtube: res.data[0].youtube,
        description: res.data[0].description,
        facebook: res.data[0].facebook
      })
    );
  }, []);
  return (
    <>
      <Head>
        <title>Quản lý nội dung</title>
      </Head>
      <PageTitleWrapper>
        <FormatForm formik={formik}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" component="h3" gutterBottom>
                Quản lý nội dung hiển thị
              </Typography>
              <Typography variant="subtitle2">
                Thông báo và link youtube sẽ được đăng tại đây đây nhé!
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                startIcon={<SaveIcon fontSize="small" />}
                type="submit"
              >
                Lưu
              </Button>
            </Grid>
          </Grid>

          <TextField
            formik={formik}
            label="Link youtube"
            placeholder=""
            variant="outlined"
            fullWidth
            name="youtube"
            type="text"
            sx={{ my: 3, background: '#fff' }}
          />
          <TinyEditor
            changeBody={changeContent}
            defaultValue={formik.values.description}
          />
        </FormatForm>
        <TF
          id="outlined-multiline-static"
          label="Chiết khấu"
          multiline
          fullWidth
          onChange={formik.handleChange}
          name="facebook"
          rows={4}
          value={formik.values['facebook']}
          sx={{
            background: '#fff',
            mt: 3
          }}
        />
        <FormatForm formik={formikVip}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              formik={formikVip}
              label="Mô tả acc vip"
              placeholder=""
              variant="outlined"
              fullWidth
              name="vip"
              type="text"
              sx={{ my: 3, background: '#fff' }}
            />
            <Button
              sx={{ mt: { xs: 2, md: 0 }, height: '53px', ml: 1 }}
              variant="contained"
              startIcon={<SaveIcon fontSize="small" />}
              type="submit"
            >
              Lưu
            </Button>
          </Box>
        </FormatForm>
        <FormatForm formik={formikRandom}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              formik={formikRandom}
              label="Mô tả acc random"
              placeholder=""
              variant="outlined"
              fullWidth
              name="random"
              type="text"
              sx={{ my: 3, background: '#fff' }}
            />
            <Button
              sx={{ mt: { xs: 2, md: 0 }, height: '53px', ml: 1 }}
              variant="contained"
              startIcon={<SaveIcon fontSize="small" />}
              type="submit"
            >
              Lưu
            </Button>
          </Box>
        </FormatForm>
        <FormatForm formik={formikRerun}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              formik={formikRerun}
              label="Mô tả acc rerun"
              placeholder=""
              variant="outlined"
              fullWidth
              name="rerun"
              type="text"
              sx={{ my: 3, background: '#fff' }}
            />
            <Button
              sx={{ mt: { xs: 2, md: 0 }, height: '53px', ml: 1 }}
              variant="contained"
              startIcon={<SaveIcon fontSize="small" />}
              type="submit"
            >
              Lưu
            </Button>
          </Box>
        </FormatForm>
        <FormatForm formik={formikNew}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              formik={formikNew}
              label="Mô tả acc khởi đầu"
              placeholder=""
              variant="outlined"
              fullWidth
              name="newAcc"
              type="text"
              sx={{ my: 3, background: '#fff' }}
            />
            <Button
              sx={{ mt: { xs: 2, md: 0 }, height: '53px', ml: 1 }}
              variant="contained"
              startIcon={<SaveIcon fontSize="small" />}
              type="submit"
            >
              Lưu
            </Button>
          </Box>
        </FormatForm>
      </PageTitleWrapper>
    </>
  );
}

ContentManager.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ContentManager;
