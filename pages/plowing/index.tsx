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
import { createDeposit, getDeposit } from 'api/apiDeposit/account';
import Head from 'next/head';
import * as React from 'react';
import * as yup from 'yup';

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
        note
      }).then(() => {
        updateSuccess();
        handleSetMessage({
          type: 'success',
          message: 'Yêu cầu nạp thành công'
        });
        setPending(false);
        resetForm();
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
      setPending(false);
    }
  };

  React.useEffect(() => {
    getDeposit(TYPE_DEPOSIT.CAY_THUE).then((res) => {
      setHistory(res.data.data);
    });
  }, [update]);
  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  const listGenshin = [
    {
      value: '34',
      title: '70000 VNĐ - Phong Thần Đồng'
    },
    {
      value: '35',
      title: '120000 VNĐ - Nham Thần Đồng'
    },
    {
      value: '36',
      title: '190000 VNĐ -\nLôi Thần Đồng'
    },
    {
      value: '37',
      title: '300000 VNĐ - Thảo Thần Đồng'
    },
    {
      value: '38',
      title: '90000 VNĐ - Mã Não Đỏ Thẫm'
    },
    {
      value: '39',
      title: '90000 VNĐ - Lưu Tinh Minh Thạch'
    },
    {
      value: '40',
      title: '70000 VNĐ - Ấn Khóa'
    },
    {
      value: '41',
      title: '60000 VNĐ - Đá\nThánh'
    },
    {
      value: '42',
      title: '40000 VNĐ - Tinh Quang Vũ'
    },
    {
      value: '43',
      title: '400000 VNĐ - Mondstadt'
    },
    {
      value: '44',
      title: '150000 VNĐ -\nLong tích tuyết sơn'
    },
    {
      value: '45',
      title: '600000 VNĐ - Liyue'
    },
    {
      value: '46',
      title: '400000 VNĐ - Khu mỏ chính / Ngầm'
    },
    {
      value: '47',
      title: '750000 VNĐ - Inazuma'
    },
    {
      value: '48',
      title: '150000 VNĐ - Enkanomiya'
    },
    {
      value: '49',
      title: '850000 VNĐ - Sumeru rừng\nmưa'
    },
    {
      value: '50',
      title: '400000 VNĐ - Sumeru Sa Mạc 3.1'
    },
    {
      value: '51',
      title: '250000 VNĐ - Sumeru Sa Mạc 3.4'
    },
    {
      value: '52',
      title: '250000 VNĐ - Sumeru Sa Mạc 3.6'
    },
    {
      value: '53',
      title: '12000 VNĐ - Mở điểm tele'
    },
    {
      value: '54',
      title: '120000 VNĐ - Rust\ntheo khu vực'
    },
    {
      value: '55',
      title: '30000 VNĐ - Nhặt tinh điệp '
    },
    {
      value: '56',
      title: '40000 VNĐ - Nhặt Nguyên Liệu\nMondsadt '
    },
    {
      value: '57',
      title: '40000 VNĐ - Nhặt Nguyên Liệu Liyue '
    },
    {
      value: '58',
      title: '60000 VNĐ - Nhặt Nguyên Liệu\nInazuma'
    },
    {
      value: '59',
      title: '70000 VNĐ - Nhặt Nguyên Liệu Sumeru'
    },
    {
      value: '60',
      title: '130000 VNĐ - Lao xiên cá R5'
    },
    {
      value: '61',
      title: '10000 VNĐ - Farm Gỗ '
    },
    {
      value: '62',
      title: '20000 VNĐ - Đào Khoáng '
    },
    {
      value: '63',
      title: '60000 VNĐ - Lần đầu Thám\nHiểm vực sâu'
    },
    {
      value: '64',
      title: '650,000 VNĐ - Aranyaka 5 chương'
    },
    {
      value: '65',
      title:
        '120,000 VNĐ - Tích xanh quyển\naranyaka 5 tích yêu cầu đã hoàn thành xong nhiệm vụ aranyaka'
    },
    {
      value: '66',
      title: '90,000 VNĐ - Tế\nlễ thần anh đào'
    },
    {
      value: '67',
      title: '80,000 VNĐ - Lò luyện Mikage chương 1'
    },
    {
      value: '68',
      title: '70,000 VNĐ - Lò\nLuyện Mikage Chương 2'
    },
    {
      value: '69',
      title: '150,000 VNĐ - Chuyến săn sấm Seira 4 chương'
    },
    {
      value: '70',
      title: '120,000\nVNĐ - Di sản Orobashi 4 chương'
    },
    {
      value: '71',
      title: '100,000 VNĐ - Nhật ký hành trình của biển\nsương mù 1 chương'
    },
    {
      value: '72',
      title: '100,000 VNĐ - Ghi chép cũ'
    },
    {
      value: '73',
      title: '400,000 VNĐ - Cõi mộng hoàng\nkim 4 chương'
    },
    {
      value: '74',
      title: '80,000 VNĐ - Gấp đôi bằng chứng'
    },
    {
      value: '75',
      title: '80,000 VNĐ - Sớm chiều nơi\nvương quốc Đêm Trắng'
    },
    {
      value: '76',
      title: '100,000 VNĐ - DainSelf'
    },
    {
      value: '77',
      title: '20,000 VNĐ - Dũng khí trong\ntim'
    },
    {
      value: '78',
      title: '80,000 VNĐ - Mây xưa có Li'
    },
    {
      value: '79',
      title: '60,000 VNĐ - Vực Tắm Trăng'
    },
    {
      value: '80',
      title: '200,000 VNĐ -\nKhúc Bi Ca bilqis'
    },
    {
      value: '81',
      title: '50,000 VNĐ - Chim Ưng tadhla'
    },
    {
      value: '82',
      title: '350,000 VNĐ - Khvarena\nThiện và Ác'
    },
    {
      value: '83',
      title: '70,000 VNĐ - Ngọn Lửa U Ám'
    },
    {
      value: '84',
      title: '70,000 VNĐ - Nghiên Cứu Bia Khắc'
    },
    {
      value: '85',
      title: '80,000 VNĐ - Nhiệm Vụ Ma Thần 3 màn'
    },
    {
      value: '86',
      title: '30,000 VNĐ - Đồng hành'
    },
    {
      value: '87',
      title: '35,000 VNĐ -\nTruyền Thuyết'
    },
    {
      value: '88',
      title: '180,000 VNĐ - Daily Tháng ủy thác+ xả'
    },
    {
      value: '89',
      title: '50,000 VNĐ - La hoàn\n1-8'
    },
    {
      value: '90',
      title: '60,000 VNĐ - La hoàn 9-12'
    }
  ];

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
                        options={listGenshin}
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
