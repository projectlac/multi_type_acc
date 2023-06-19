import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Box, Button } from '@mui/material';
import { createTagCode } from 'api/apiTag/tagApi';
import { useState } from 'react';
import * as yup from 'yup';

interface IEdit {
  title: string;
}

const validationSchema = yup.object({
  title: yup.string().required('Tên tag là thuộc tính bắt buộc')
});

const initForm = {
  title: ''
};

function AddTag({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = (value, { resetForm }) => {
    const { title } = value;
    const formData = new FormData();
    formData.append('type', 'TAGCODE');
    formData.append('desc', title);
    try {
      createTagCode(formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Thêm vũ khí thành công'
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
            Thêm
          </Button>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddTag;
