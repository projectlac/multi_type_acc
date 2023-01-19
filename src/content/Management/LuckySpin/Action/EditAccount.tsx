import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  useTheme
} from '@mui/material';
import { styled } from '@mui/styles';
import {
  getAccountBySlugToManager,
  updateAccountNomal
} from 'api/apiAccount/account';
import { getOneGiftById } from 'api/apiWheel/wheelApi';
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
  name: yup.string().required('Trường này là bắt buộc'),
  reate: yup.number().required('Tỷ lệ là thuộc tính bắt buộc')
});

function EditAccount({ title, slug }: IEdit) {
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

  const [defaultData, setDefaultData] = useState<any>({
    name: '',
    rate: '',
    file: null
  });

  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).files[0]) {
      const objectUrl = URL.createObjectURL(
        (e.target as HTMLInputElement).files[0]
      );
      setPreview(objectUrl);
      formik.handleChange({
        target: { name: 'file', value: (e.target as HTMLInputElement).files[0] }
      });
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    const { name, rate, file } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rate', rate.toString());

    file && formData.append('image', file);

    try {
      await updateAccountNomal(slug, formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Sửa phần quà vòng quay thành công`
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

  const initForm = defaultData;
  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  useEffect(() => {
    if (openDialog) {
      getOneGiftById(slug).then((res) => {
        const data = res.data;

        let temp = {
          name: data.name,

          rate: data.number,

          file: null
        };
        setDefaultData(temp);
      });
    }
  }, [openDialog]);
  return (
    <DialogCommon
      icon={<EditTwoToneIcon fontSize="small" />}
      title={title}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <Box>
        <FormatForm formik={formik}>
          <Grid container columnSpacing={2} rowSpacing={3} pt={2}>
            <Grid item md={8} xs={12}>
              <TextField
                formik={formik}
                label="Tên sản phẩm"
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
                label="Tỷ lệ"
                placeholder=""
                variant="outlined"
                fullWidth
                name="rate"
                type="number"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Box>
                <Input
                  accept="image/*"
                  id={`change-cover-create-gift-normal-${slug}`}
                  type="file"
                  name="file"
                  onChange={handleFile}
                />
                <label htmlFor={`change-cover-create-gift-normal-${slug}`}>
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
                {formik.isSubmitting ? 'Loading...' : 'Sửa'}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditAccount;
