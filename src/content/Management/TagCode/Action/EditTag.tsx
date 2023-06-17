import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Box, Button } from '@mui/material';
import { getTagCodeBySlug, updateTagCode } from 'api/apiTag/tagApi';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
  slug: string;
}

function EditTag({ title, slug }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const [defaultData, setDefaultData] = useState<any>({
    title: ''
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Tên loại code là thuộc tính bắt buộc')
  });
  const initForm = {
    title: defaultData.title,
    type: 'TAGCODE'
  };

  useEffect(() => {
    if (openDialog) {
      getTagCodeBySlug(slug).then((res) => {
        setDefaultData({ title: res.data.desc });
      });
    }
  }, [openDialog]);

  const onSubmit = (value, { resetForm }) => {
    const { title } = value;
    const formData = new FormData();
    formData.append('desc', title);
    formData.append('type', 'TAGCODE');
    try {
      updateTagCode(slug, formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Sửa vũ khí thành công'
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
