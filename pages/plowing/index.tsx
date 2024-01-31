import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import OgTag from '@/components/Common/OgTag';
import TablePlowing from '@/components/Table/TablePlowing';
import { useAuth } from '@/contexts/AuthGuard';
import { ProtectGuess } from '@/contexts/ProtectGuess';
import BaseLayout from '@/layouts/BaseLayout';
import { TYPE_DEPOSIT } from '@/models/enum';
import { Button, Card, Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createDeposit, getDeposit, getPackList } from 'api/apiDeposit/account';
import Head from 'next/head';
import * as React from 'react';
import * as yup from 'yup';

interface ListPack {
  value: string;
  title: string;
}

const validationSchema = yup.object({
  pack: yup.string().required('Trường này là bắt buộc'),
  uid: yup.string().required('Trường này là bắt buộc'),
  username: yup.string().required('Trường này là bắt buộc'),
  password: yup.string().required('Trường này là bắt buộc'),
  server: yup.string().required('Trường này là bắt buộc'),
  ingame: yup.string().required('Trường này là bắt buộc'),
  social: yup.string().required('Trường này là bắt buộc')
});
const initForm = {
  pack: '34',
  uid: '',
  username: '',
  password: '',
  server: 'Asia',
  ingame: '',
  social: '',
  note: ''
};

export default function VerticalTabs() {
  const { handleSetMessage, update, updateSuccess } = useAuth();
  const [listGenshin, setListGenshin] = React.useState<ListPack[]>([]);
  const [history, setHistory] = React.useState([]);
  const [pending, setPending] = React.useState(false);
  const onSubmit = async (values, { resetForm }) => {
    const { pack, uid, username, password, server, ingame, social, note } =
      values;
    setPending(true);
    try {
      await createDeposit({
        pack: +pack,
        uuid: uid,
        username,
        password,
        server,
        name: ingame,
        phone: social,
        note,
        type: TYPE_DEPOSIT.CAY_THUE
      }).then(() => {
        updateSuccess();
        handleSetMessage({
          type: 'success',
          message: 'Yêu cầu được gửi thành công'
        });
        setPending(false);
        resetForm();
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
      setPending(false);
    }
  };

  const callApi = React.useCallback(async () => {
    const res = await getPackList();
    const convert = res.data.map((d) => ({
      value: d.id ?? 0,
      title: d.description ?? ''
    }));
    setListGenshin(convert);
  }, []);

  React.useEffect(() => {
    getDeposit(TYPE_DEPOSIT.CAY_THUE).then((res) => {
      setHistory(res.data.data);
    });
    callApi();
  }, [update]);

  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  // React.useEffect(()=>{

  // },[])
  return (
    <ProtectGuess>
      <Head>
        <title>Cày thuê Genshin</title>
        <OgTag title="Cày thuê Genshin" />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 20, mb: 10 }}>
        <Card sx={{ p: 3 }}>
          <FormatForm formik={formik}>
            <Grid container columnSpacing={1.5} rowSpacing={2}>
              <Grid item md={6} xs={12}>
                <Box mt={1}>
                  <Typography
                    textTransform={'uppercase'}
                    fontWeight={'bold'}
                    fontSize={22}
                    textAlign={'center'}
                    sx={{
                      mb: 2
                    }}
                  >
                    Cày thuê Genshin
                  </Typography>

                  <Grid container columnSpacing={1.5} rowSpacing={2}>
                    <Grid item xs={12}>
                      <Selection
                        formik={formik}
                        label="Gói nạp"
                        variant="outlined"
                        fullWidth
                        name="pack"
                        options={listGenshin ?? []}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="UID"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="uid"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Tên tài khoản"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="username"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Mật khẩu"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="password"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Selection
                        formik={formik}
                        label="Server"
                        variant="outlined"
                        fullWidth
                        name="server"
                        options={[
                          { value: 'Asia', title: 'Asia' },
                          { value: 'America', title: 'America' },
                          { value: 'Europe', title: 'Europe' },
                          { value: 'TW-HK-MO', title: 'TW-HK-MO' }
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Tên ingame"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="ingame"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Số điện thoại"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="social"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        formik={formik}
                        label="Ghi chú ,Zalo hoặc link Facebook"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="note"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={pending}
                      >
                        Gửi yêu cầu
                      </Button>
                      <p>
                        <b>
                          <span style={{ color: '#d33' }}>Lưu ý:</span> Shop sẽ
                          lấy mã để đăng nhập game trong 24h kể từ khi lên đơn.
                        </b>
                        <br /> Các bạn điền SĐT Zalo, shop sẽ liên hệ qua Zalo
                      </p>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box mt={1}>
                  <Typography
                    textTransform={'uppercase'}
                    fontWeight={'bold'}
                    fontSize={22}
                    textAlign={'center'}
                    sx={{
                      mb: 2
                    }}
                  >
                    Lịch sử yêu cầu
                  </Typography>
                  <Box>
                    <TablePlowing data={history} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FormatForm>
        </Card>
      </Container>
    </ProtectGuess>
  );
}
VerticalTabs.getLayout = function getLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
