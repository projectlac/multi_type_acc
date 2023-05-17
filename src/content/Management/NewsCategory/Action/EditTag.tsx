import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
  slug: string;

}

import { getNewsCategoryBySlug, updateNewsCategory } from 'api/apiNews/newsApi';

function EditTag({ title, slug }: IEdit) {

  const { handleSetMessage, updateSuccess } = useAuth();
  const [defaultData, setDefaultData] = useState<any>({
    title: '',
    image: ''
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Tên tag là thuộc tính bắt buộc')
  });
  const initForm = {
    title: defaultData.title,
  };

  useEffect(() => {
    if (openDialog) {
      getNewsCategoryBySlug(slug).then((res) =>
        setDefaultData({ title: res.data.name })
      );

    }
  }, [openDialog]);

  const onSubmit = (value, { resetForm }) => {
    const { title } = value;


    try {
      updateNewsCategory(slug, title).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Sửa tên danh mục thành công'
        });
        handleCloseDialog();
        resetForm();
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, kiểm tra lại hoặc liên hệ DEV'
      });
    }

  };

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
          <TextField
            formik={formik}
            sx={{ mt: 1, mb: 3 }}
            label="Tên"
            variant="outlined"
            fullWidth
            name="title"
            type="text"
          />

          <Button variant="contained" fullWidth type="submit">
            Sửa
          </Button>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditTag;
