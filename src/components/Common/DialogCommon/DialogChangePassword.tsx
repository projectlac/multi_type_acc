import { useAuth } from '@/contexts/AuthGuard';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { changePasswordByUser } from 'api/auth';
import * as React from 'react';
import * as yup from 'yup';
import useCustomForm from '../Form/Form';
import FormatForm from '../Form/FormatForm';
import PasswordFielGlobal from '../Form/PasswordFielGlobal';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IProps {
  open: boolean;
  handleClose: () => void;
}

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .min(6, 'Password cũ phải có ít nhất 6 ký tự')
    .required('Password cũ là bắt buộc'),
  newPassword: yup
    .string()
    .min(6, 'Password mới phải có ít nhất 6 ký tự')
    .required('Password mới là bắt buộc'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không giống')
});

export default function DialogChangePassword({ handleClose, open }: IProps) {
  const { handleSetMessage } = useAuth();
  const initForm = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const onSubmit = (values, { resetForm }) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    changePasswordByUser(oldPassword, newPassword, confirmPassword)
      .then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Đổi mật khẩu thành công'
        });
        resetForm();
        handleClose();
      })
      .catch(() =>
        handleSetMessage({
          type: 'error',
          message: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin'
        })
      );
  };
  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <Box>
      <Dialog
        sx={{ zIndex: 9999 }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Đổi mật khẩu'}</DialogTitle>
        <DialogContent>
          <FormatForm formik={formik}>
            <PasswordFielGlobal
              name={'oldPassword'}
              formik={formik}
              label={'Mật khẩu cũ'}
            />
            <PasswordFielGlobal
              name={'newPassword'}
              formik={formik}
              label={'Mật khẩu mới'}
            />
            <PasswordFielGlobal
              name={'confirmPassword'}
              formik={formik}
              label={'Nhập lại mật khẩu'}
            />

            <Box mt={2} textAlign="right">
              <Button
                type="submit"
                variant="contained"
                onClick={() => {
                  console.log(formik.errors);
                }}
              >
                Agree
              </Button>
              <Button
                onClick={handleClose}
                color="error"
                sx={{ ml: 2 }}
                variant="contained"
              >
                Đóng
              </Button>
            </Box>
          </FormatForm>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
