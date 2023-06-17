import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { Box, Button, Grid, MenuItem, useTheme } from '@mui/material';
import { styled } from '@mui/styles';
import {
  getAccountBySlugToManager,
  updateAccountNomal
} from 'api/apiAccount/account';
import { getListTagCode } from 'api/apiTag/tagApi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
  slug: string;
}

const Input = styled('input')({
  display: 'none'
});
const validationSchema = yup.object({
  name: yup.string().required('Tên tài khoản is required'),
  username: yup.string().required('Thông tin này là bắt buộc'),
  price: yup.number().required('Thông tin này là bắt buộc'),
  tag_code: yup.string().required('Trường này bắt buộc phải nhập')
});
interface ITagCode {
  desc: string;
  slug: string;
}
function EditAccout({ title, slug }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [tagCode, setTagCode] = useState<ITagCode[]>([]);

  const [preview, setPreview] = useState<string>('');

  const [defaultData, setDefaultData] = useState<any>({
    name: '',
    username: '',
    password: '',
    price: 0,
    type: 'NEW',
    avatar: '',
    tag_code: '',
    images: '',
    file: null
  });
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
  }, [slug]);

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

  useEffect(() => {
    const callApi = async () => {
      await getAccountBySlugToManager(slug).then((res) => {
        const data = res.data;

        let temp = {
          name: data.name,
          username: data.username,
          password: data.password,
          price: data.price,
          avatar: data.avatar.url,
          tag_code: data.tag_code,
          type: data.type,
          file: null
        };

        setDefaultData(temp);
      });
    };
    if (openDialog) {
      callApi();
    }
  }, [openDialog]);
  const onSubmit = async (values, { resetForm }) => {
    const { name, username, password, price, file, type, tag_code } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    password && formData.append('password', password);
    formData.append('server', 'ASIA');
    formData.append('ar_level', '0');
    formData.append('tag_code', tag_code);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('game', 'genshin-impact');

    file && formData.append('avatar', file);

    try {
      await updateAccountNomal(slug, formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Sửa code thành công'
        });
        handleCloseDialog();
        resetForm();

        setPreview('');
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: error.response.data.message
      });
    }
  };

  const initForm = defaultData;

  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <DialogCommon
      icon={<EditTwoToneIcon />}
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
                label="Code"
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
            <Grid item md={4} xs={12}>
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
            <Grid item md={12} xs={12}>
              <Box>
                <Input
                  accept="image/*"
                  id={`change-avatar-edit-account-vip${slug}`}
                  type="file"
                  name="file"
                  onChange={handleFile}
                />
                <label htmlFor={`change-avatar-edit-account-vip${slug}`}>
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

              {preview ? (
                <Box width={200} height={150}>
                  <Image
                    src={preview}
                    layout="responsive"
                    width={200}
                    height={150}
                  ></Image>
                </Box>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  {defaultData.avatar && (
                    <Box width={200} height={150}>
                      {console.log(defaultData.avatar)}
                      <Image
                        src={defaultData.avatar}
                        layout="responsive"
                        width={200}
                        height={150}
                      ></Image>
                    </Box>
                  )}
                </Box>
              )}
            </Grid>

            <Grid item md={12} xs={12}>
              <Button variant="contained" fullWidth type="submit">
                {formik.isSubmitting ? 'Loading...' : 'Sửa '}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditAccout;
