import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import { useAuth } from '@/contexts/AuthGuard';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { updateHiddenAccount } from 'api/apiAccount/account';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IParamUpdateHidden {
  slug: string;
  isHidden: boolean;
}

const validationSchema = yup.object({
  isHidden: yup.string().required('Chức vụ is required')
});

function HiddenAccount({ slug, isHidden }: IParamUpdateHidden) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const [initForm, setInitForm] = useState({
    isHidden: false,
    slug: ''
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onSubmit = async (value, { resetForm }) => {
    const { slug, isHidden } = value;

    try {
      await updateHiddenAccount({ slug, isHidden }).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Thao tác thành công'
        });
        handleCloseDialog();
        resetForm();
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

  useEffect(() => {
    if (openDialog)
      setInitForm({
        ...initForm,
        isHidden: isHidden ? true : false,
        slug
      });
  }, [openDialog]);

  return (
    <DialogCommon
      icon={<VisibilityOffIcon fontSize="small" color="warning" />}
      title={'Ẩn tài khoản'}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
    >
      <FormatForm formik={formik}>
        <Selection
          formik={formik}
          label="Ẩn/Hiện"
          variant="outlined"
          fullWidth
          name="isHidden"
          sx={{
            my: 2
          }}
          options={[
            { value: true, title: 'Ẩn' },
            { value: false, title: 'Hiện' }
          ]}
        />

        <Button variant="contained" fullWidth type="submit">
          {formik.isSubmitting ? 'Loading...' : 'Cập nhật'}
        </Button>
      </FormatForm>
    </DialogCommon>
  );
}

export default HiddenAccount;
