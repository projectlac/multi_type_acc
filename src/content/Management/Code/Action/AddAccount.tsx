import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import { useAuth } from '@/contexts/AuthGuard';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/styles';
import { createAccountNomal } from 'api/apiAccount/account';
import Image from 'next/image';
import { useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
}

const Input = styled('input')({
  display: 'none'
});
const validationSchema = yup.object({
  name: yup.string().required('Tên tài khoản is required'),
  username: yup.string().required('Thông tin này là bắt buộc'),
  password: yup.string().required('Password là thuộc tính bắt buộc'),
  file: yup.mixed().required('File is required'),
  price: yup
    .number()
    .required('Thông tin này là bắt buộc')
    .min(10000, 'Vui lòng điền đúng giá')
});
const initForm = {
  name: '',
  username: 'Gift-Code',
  password: '',
  price: 0,
  type: 'CODE',
  file: null
};

function AddAccount({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    const objectUrl = URL.createObjectURL(
      (e.target as HTMLInputElement).files[0]
    );
    setPreview(objectUrl);
    formik.handleChange({
      target: { name: 'file', value: (e.target as HTMLInputElement).files[0] }
    });
  };

  const onSubmit = async (values, { resetForm }) => {
    const { name, username, password, price, file, type } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('server', 'ASIA');
    formData.append('ar_level', '0');
    formData.append('price', price);
    formData.append('type', type);
    file && formData.append('avatar', file);
    formData.append('game', 'genshin-impact');
    try {
      await createAccountNomal(formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Thêm code thành công'
        });
        handleCloseDialog();
        resetForm();

        setPreview('');
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin nhập'
      });
    }
  };
  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <DialogCommon
      icon={
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          {title}
        </Button>
      }
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box>
        <FormatForm formik={formik}>
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Tiêu đề"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                formik={formik}
                label="Loại code"
                placeholder=""
                variant="outlined"
                fullWidth
                name="username"
                type="text"
                disabled
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                formik={formik}
                label="Mã code"
                variant="outlined"
                fullWidth
                name="password"
                type="text"
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                formik={formik}
                label="Giá"
                variant="outlined"
                fullWidth
                name="price"
                type="number"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <Input
                  accept="image/*"
                  id="change-cover-create-code-new"
                  type="file"
                  name="file"
                  onChange={handleFile}
                />
                <label htmlFor="change-cover-create-code-new">
                  <Button
                    startIcon={<UploadTwoToneIcon />}
                    variant="contained"
                    component="span"
                    sx={{
                      background: Boolean(formik.errors.file)
                        ? theme.colors.error.main
                        : theme.colors.primary.main
                    }}
                  >
                    Upload avatar
                  </Button>
                </label>
              </Box>
              {preview && (
                <Box width={200} height={150}>
                  <Image
                    src={preview}
                    layout="responsive"
                    width={200}
                    height={150}
                  ></Image>
                </Box>
              )}
            </Grid>

            <Grid item md={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={formik.isSubmitting}
                onClick={() => console.log(formik.errors)}
              >
                {formik.isSubmitting ? 'Loading...' : 'Thêm'}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddAccount;