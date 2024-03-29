import image from '@/assets/images/change/BANNER.jpg';
import useCustomForm from '@/components/Common/Form/Form';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  styled,
  Typography
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import * as yup from 'yup';

import FormatForm from '@/components/Common/Form/FormatForm';
import PasswordField from '@/components/Common/Form/PasswordField';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Tài khoản là bắt buộc')
    .matches(/^[a-zA-Z0-9\W|_]\S+$/g, 'Không được có khoảng trắng'),
  password: yup
    .string()
    .min(6, 'Password phải có ít nhất 6 ký tự')
    .required('Password là bắt buộc')
});
const validationSchemaRegis = yup.object({
  username: yup
    .string()
    .required('Username là bắt buộc')
    .matches(/^[a-zA-Z0-9\W|_]\S+$/g, 'Không được có khoảng trắng'),
  email: yup.string().email().required('Email là bắt buộc'),
  password: yup
    .string()
    .min(6, 'Password phải có ít nhất 6 ký tự')
    .required('Password là bắt buộc')
});
function Overview() {
  const [loginMode, setLoginMode] = useState<boolean>(true);
  const { login, register } = useAuth();

  const initForm = {
    username: '',
    password: ''
  };
  const initFormRegis = {
    username: '',
    password: '',
    email: ''
  };
  const onSubmit = (values) => {
    const { username, password } = values;
    login(username, password);
  };
  const onRegis = (values) => {
    const { username, password, email } = values;
    register(username, password, email);
  };
  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  const formikRegis = useCustomForm(
    validationSchemaRegis,
    initFormRegis,
    onRegis
  );

  return (
    <OverviewWrapper>
      <Head>
        <title>Genshin Shop</title>
      </Head>

      <Container maxWidth="md" sx={{ mt: 15 }}>
        <Box py={3}>
          <Card>
            <Grid container sx={{ position: 'relative' }}>
              <Grid md={6} xs={12} item>
                {!loginMode && (
                  <Box sx={{ p: { md: 10, xs: 2 } }}>
                    <FormatForm formik={formikRegis}>
                      <Typography
                        mb={2.7}
                        textAlign="center"
                        fontWeight="bold"
                        fontSize={19}
                        textTransform="uppercase"
                      >
                        Đăng ký ngay
                      </Typography>
                      <TextField
                        type="text"
                        label="Tài khoản"
                        variant="outlined"
                        name="username"
                        formik={formikRegis}
                        fullWidth
                      />
                      <PasswordField formik={formikRegis} />
                      <TextField
                        sx={{ mt: 2.48 }}
                        name="email"
                        type="email"
                        formik={formikRegis}
                        label="Email"
                        variant="outlined"
                        fullWidth
                      />
                      <Typography fontSize={12} color="error">
                        <i>
                          *Vui lòng sử dụng email thật phòng khi quên mật khẩu
                        </i>
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2.48 }}
                        type="submit"
                      >
                        Đăng ký
                      </Button>
                    </FormatForm>
                  </Box>
                )}
              </Grid>
              <Grid md={6} xs={12} item>
                {loginMode && (
                  <Box sx={{ p: { md: 10, xs: 2 } }}>
                    <FormatForm formik={formik}>
                      <Typography
                        mb={3}
                        textAlign="center"
                        fontWeight="bold"
                        fontSize={19}
                        textTransform="uppercase"
                      >
                        Đăng nhập ngay
                      </Typography>
                      <TextField
                        formik={formik}
                        label="Tài khoản"
                        variant="outlined"
                        fullWidth
                        name="username"
                        type="text"
                      />

                      <PasswordField formik={formik} />

                      <Typography
                        textAlign={'right'}
                        sx={{ my: 1, cursor: 'pointer' }}
                      >
                        <Link href={'/forgot-password'}>Quên mật khẩu</Link>
                      </Typography>

                      <Button variant="contained" fullWidth type="submit">
                        Đăng nhập
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => {
                          setLoginMode(false);
                        }}
                      >
                        Đăng ký
                      </Button>
                    </FormatForm>
                  </Box>
                )}
              </Grid>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Grid
                  md={6}
                  xs={12}
                  item
                  className={`dinamic-login ${loginMode ? '' : 'active-login'}`}
                >
                  <Box
                    sx={{
                      background: `url(${image})`,
                      width: '100%',
                      height: '100%',
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  ></Box>
                </Grid>
              </Box>
            </Grid>
          </Card>
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
