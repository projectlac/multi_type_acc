import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import { useAuth } from '@/contexts/AuthGuard';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button, Grid, MenuItem, useTheme } from '@mui/material';
import { styled } from '@mui/styles';
import { uploadMultiCode } from 'api/apiCode/userApi';
import { getListTagCode } from 'api/apiTag/tagApi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
}

const Input = styled('input')({
  display: 'none'
});
const validationSchema = yup.object({
  name: yup.string().required('Tên tài khoản is required'),
  password: yup.string().required('Password là thuộc tính bắt buộc'),
  avatar: yup.mixed().required('File is required'),
  tag_code: yup.string().required('Trường này bắt buộc phải nhập'),
  price: yup
    .number()
    .required('Thông tin này là bắt buộc')
    .min(0, 'Vui lòng điền đúng giá')
});
const initForm = {
  name: '',
  password: '',
  tag_code: '',
  price: 0,
  avatar: null
};
interface ITagCode {
  desc: string;
  slug: string;
}
function AddAccount({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');
  const [tagCode, setTagCode] = useState<ITagCode[]>([]);
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
      target: {
        name: 'avatar',
        value: (e.target as HTMLInputElement).files[0]
      }
    });
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await getListTagCode();
      const data = res.data.data.map((d: any) => ({
        desc: d.desc,
        slug: d.slug
      }));
      setTagCode(data);
    };
    callApi();
  }, []);

  const onSubmit = async (values, { resetForm }) => {
    const { name, password, price, tag_code, file } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('price', price);
    formData.append('tag_code', tag_code);
    file && formData.append('avatar', file);
    try {
      await uploadMultiCode(formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Thêm code thành công'
        });
        handleCloseDialog();
        resetForm();
        (
          document.getElementById(
            'change-cover-create-code-new'
          ) as HTMLInputElement
        ).value = '';
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

            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Danh sách mã code"
                variant="outlined"
                fullWidth
                name="password"
                type="text"
                multiline
                rows={4}
              />
              {`Cách nhau bằng dấu phẩy (,)`}
            </Grid>
            <Grid item md={6} xs={12}>
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
              <TextField
                formik={formik}
                label="Loại code"
                variant="outlined"
                fullWidth
                name="tag_code"
                type="text"
                select
              >
                {tagCode.map((d) => (
                  <MenuItem key={d.slug} value={d.slug}>
                    {d.desc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={8} xs={12}></Grid>
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
