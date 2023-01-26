import { useAuth } from '@/contexts/AuthGuard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { getCode, topUpWithCard } from 'api/apiUser/userApi';
import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';
import useCustomForm from '../Common/Form/Form';
import FormatForm from '../Common/Form/FormatForm';
import Selection from '../Common/Form/Selection';
import TextField from '../Common/Form/TextField';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const validationSchema = yup.object({
  homeNetwork: yup.string().required('Trường này là bắt buộc'),
  cost: yup.string().required('Trường này là bắt buộc'),
  seri: yup.string().required('Trường này là bắt buộc'),
  code: yup.string().required('Trường này là bắt buộc')
});

const initForm = {
  homeNetwork: 'Viettel',
  cost: '',
  seri: '',
  code: ''
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { md: 3, xs: 0 } }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
enum CopyTextDefaut {
  COPY = 'Copy',
  COPIED = 'Compied!'
}
export default function TopUpMobile() {
  const { handleSetMessage } = useAuth();

  const [value, setValue] = React.useState(0);
  const [code, setCode] = React.useState<string>('');

  const [copyText, setCopyTexy] = React.useState(CopyTextDefaut.COPY);

  const [token, getToken] = React.useState('');
  const refreshCapcha = () => {
    getToken('');
  };

  const copySomething = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopyTexy(CopyTextDefaut.COPIED);
    setTimeout(() => {
      setCopyTexy(CopyTextDefaut.COPY);
    }, 500);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event.type);
  };
  const onSubmitBank = async () => {
    try {
      await getCode('VCB', token).then((res) => {
        setCode(res.data);
        handleSetMessage({
          type: 'success',
          message: 'Lấy mã thành công'
        });
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: error.response.data.message
      });
    }
    refreshCapcha();
  };

  const onSubmitMomo = async () => {
    try {
      await getCode('MOMO', token).then((res) => {
        setCode(res.data);
        handleSetMessage({
          type: 'success',
          message: 'Lấy mã thành công'
        });
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: error.response.data.message
      });
    }
    refreshCapcha();
  };
  const onChange = (value: any) => {
    getToken(value);
  };
  const onSubmit = async (values, { resetForm }) => {
    const { homeNetwork, cost, seri, code } = values;
    try {
      await topUpWithCard(homeNetwork, +cost, seri, code, token).then((res) => {
        if (res.data) {
          handleSetMessage({ type: 'error', message: res.data.message });
        } else {
          handleSetMessage({
            type: 'success',
            message: 'Thẻ đang được xử lý, vui lòng đợi'
          });
          resetForm();
        }
      });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }
  };

  const formik = useCustomForm(validationSchema, initForm, onSubmit);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTab-root': {
              color: '#fff'
            }
          }}
        >
          <Tab
            label="Nạp thẻ cào tự động"
            {...a11yProps(0)}
            onClick={refreshCapcha}
          />
          <Tab
            label="Nạp thẻ qua ATM/MOMO"
            {...a11yProps(1)}
            onClick={refreshCapcha}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: '#000',
            fontSize: '20px',
            textTransform: 'uppercase',
            textAlign: 'center',
            mt: 2
          }}
        >
          Nạp thẻ cào tự động
        </Typography>
        {/* <Box
          sx={{
            pa: 3,
            textAlign: 'center'
          }}
        >
          <h2>Tính năng Nạp tiền bằng thẻ cào đang được bảo trì !!!</h2>
          <Divider></Divider>
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: '600',
              margin: '20px'
            }}
          >
            Để nạp tiền vui lòng nhắn tin với{' '}
            <a
              target="__blank"
              style={{ color: '#5569ff', background: '#fff' }}
              href="https://m.me/152659528261467"
            >
              Fanpage
            </a>{' '}
            {''}
            để được hỗ trợ
          </Typography>
          <Box my={3}>
            <Button
              variant="contained"
              onClick={(e) => {
                handleChange(e, 1);
              }}
            >
              Nạp qua ATM/MOMO
            </Button>
          </Box>
        </Box> */}
        <Box
          mt={2}
          sx={{
            border: '1px solid #fff',
            padding: '15px',
            width: '100%',
            minHeight: '350px',
            background: '#fff'
          }}
        >
          <Grid container columnSpacing={1.5} rowSpacing={2}>
            <Grid item md={6} xs={12}>
              <Card sx={{ p: { md: 3, xs: 1 } }}>
                <FormatForm formik={formik}>
                  <Grid container columnSpacing={1.5} rowSpacing={2}>
                    <Grid item md={6} xs={12}>
                      <Selection
                        formik={formik}
                        label="Nhà mạng"
                        variant="outlined"
                        fullWidth
                        name="homeNetwork"
                        options={[
                          { value: 'VIETTEL', title: 'Viettel' },
                          { value: 'MOBIFONE', title: 'MobiPhone' },
                          { value: 'VINAPHONE', title: 'VinaPhone' },
                          { value: 'VIETNAMOBILE', title: 'VietnamMobile' },
                          { value: 'ZING', title: 'Zing' },
                          { value: 'GATE', title: 'Gate' }
                          // { value: 'GARENA', title: 'Garena' }
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Selection
                        formik={formik}
                        label="Mệnh giá"
                        variant="outlined"
                        fullWidth
                        name="cost"
                        options={[
                          { value: '10000', title: '10.000 VND' },
                          { value: '20000', title: '20.000 VND' },
                          { value: '30000', title: '30.000 VND' },
                          { value: '50000', title: '50.000 VND' },
                          { value: '100000', title: '100.000 VND' },
                          { value: '200000', title: '200.000 VND' },
                          { value: '300000', title: '300.000 VND' },
                          { value: '500000', title: '500.000 VND' },
                          { value: '1000000', title: '1.000.000 VND' }
                        ]}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Seri thẻ"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="seri"
                        type="text"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        formik={formik}
                        label="Mã thẻ"
                        placeholder=""
                        variant="outlined"
                        fullWidth
                        name="code"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12} justifyContent="center">
                      <ReCAPTCHA
                        sitekey="6LdGLHkjAAAAAJysfam5Ylmnjmq37torTEoPqsrD"
                        onChange={onChange}
                      />
                      {/* <Typography textAlign={'center'}>
                        Hệ thống nạp thẻ cào đang bảo trì, <br /> vui lòng liên
                        hệ admin để nạp thẻ
                      </Typography> */}
                      {token && (
                        <Button
                          fullWidth
                          sx={{
                            '&.Mui-disabled': {
                              background: '#ddd'
                            },
                            mt: 1
                          }}
                          variant="contained"
                          disabled={!!!token}
                          type="submit"
                        >
                          Nạp
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </FormatForm>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                fontSize={'17px'}
                fontWeight={'bold'}
                textTransform="uppercase"
                textAlign={'center'}
              >
                Hướng dẫn nạp
              </Typography>
              <Divider sx={{ my: 1 }}></Divider>
              <Typography fontSize={'15px'} fontWeight={500}>
                THẺ CÀO ZING CHIẾT KHẤU 16%(100K THẺ = 84K) <br /> LƯU Ý : MỆNH
                GIÁ THẺ CÀO ĐƯỢC CẬP NHẬT Ở THÔNG BÁO
              </Typography>
              <Typography fontSize={'15px'} fontWeight={500}>
                <span style={{ color: 'red', background: 'white' }}>
                  <b>Chúng tôi sẽ cập nhật bảng giá chiết khấu sớm nhất</b>
                </span>{' '}
              </Typography>
              <Divider sx={{ my: 1 }}></Divider>
              <Typography fontSize={'15px'} fontWeight={500}>
                Nếu nạp thẻ bị lỗi sau 2 phút{' '}
                <span style={{ background: 'red', color: '#fff' }}>
                  {' '}
                  không nhận được tiền
                </span>{' '}
                hãy IB cho Shop để được xử lý
              </Typography>
              <Typography fontSize={'15px'} fontWeight={500}>
                <span style={{ color: 'red', background: 'white' }}>
                  <b>Lưu ý:</b> Vui lòng chọn đúng mệnh giá, sai mệnh giá đồng
                  nghĩa với mất thẻ
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: '#000',
            fontSize: '20px',
            textTransform: 'uppercase',
            textAlign: 'center',
            mt: 2
          }}
        >
          Nạp thẻ qua ATM/MOMO
        </Typography>
        <Box
          mt={2}
          sx={{
            border: '1px solid #fff',
            padding: '15px',
            width: '100%',
            background: '#fff'
          }}
        >
          <Typography variant="h4" component="h4">
            Chuyển khoản qua ngân hàng và ví điện tử
          </Typography>
          <Typography fontSize={13}>Chuyển khoản online</Typography>
          <Box mt={2}>
            <table className="table-payment">
              <tr>
                <th style={{ width: '30%' }}>Thông tin</th>
                <th>Số tài khoản</th>
              </tr>
              <tr>
                <td>
                  <Typography fontSize={15}>
                    VietComBank <br />
                    (Nguyễn Xuân Hùng)
                  </Typography>
                </td>
                <td>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={17} mr={1}>
                      1017910233
                    </Typography>
                    <Tooltip title={copyText} arrow placement="right">
                      <IconButton
                        aria-label="copy"
                        onClick={() => {
                          copySomething('1017910233');
                        }}
                      >
                        <ContentCopyIcon
                          sx={{
                            color: '#000'
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography fontSize={15}>
                    Momo {`(>6000VND)`}
                    <br /> ( Nguyễn Xuân Hùng)
                  </Typography>
                </td>
                <td>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={17} mr={1}>
                      0372790362
                      {/* Nạp Momo đang lỗi, vui lòng ib Shop để
                      được nạp tiền */}
                    </Typography>{' '}
                    <Tooltip title={copyText} arrow placement="right">
                      <IconButton
                        aria-label="copy"
                        onClick={() => {
                          copySomething('0372790362');
                        }}
                      >
                        <ContentCopyIcon
                          sx={{
                            color: '#000'
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </td>
              </tr>
            </table>
          </Box>
          <Typography
            fontSize={17}
            sx={{ my: 2 }}
            fontWeight={'bold'}
            textTransform={'uppercase'}
            textAlign={'center'}
          >
            Lấy nội dung chuyển tiền
          </Typography>
          <Box textAlign={'center'}>
            <Box
              sx={{
                width: '250px',
                background: 'rgb(0 0 0 / 27%)',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                margin: '8px auto'
              }}
            >
              {code}
            </Box>
            <Grid
              container
              margin="0 auto"
              justifyContent="center"
              rowSpacing={2}
            >
              <ReCAPTCHA
                sitekey="6LdGLHkjAAAAAJysfam5Ylmnjmq37torTEoPqsrD"
                onChange={onChange}
              />
              {token && (
                <>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      disabled={!!!token}
                      sx={{
                        fontSize: '12px',
                        '&.Mui-disabled': {
                          background: '#ddd'
                        },
                        mt: 1
                      }}
                      onClick={onSubmitMomo}
                    >
                      Lấy mã MOMO
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      disabled={!!!token}
                      sx={{
                        fontSize: '12px',
                        '&.Mui-disabled': {
                          background: '#ddd'
                        },
                        mt: 1
                      }}
                      onClick={onSubmitBank}
                    >
                      Lấy mã VCB
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Typography color="error" fontSize={15} fontWeight={600} mt={3}>
            <b>Lưu ý!!!</b> Một mã chỉ sử dụng được 10 phút lấy mã, vui lòng nạp
            ngay. Sau 10 phút hãy ấn lấy mã mới để nạp!
          </Typography>
          <Typography color="error" fontSize={15} fontWeight={600}>
            <b>Lưu ý!!!</b> Hệ thống cộng tiền tự động, nên vui lòng chuyển đúng
            nội dung ở trên
          </Typography>
          <Typography>
            <b>Mẹo:</b>
          </Typography>
          <Typography ml={3}>
            - Không nên lấy mã mới trong khi đang thực hiện giao dịch trước đó.
          </Typography>
          <Typography ml={3}>
            - Vui lòng không spam lấy mã trước khi nạp. Điều này có thể khiến
            bạn nạp không thành công
          </Typography>
          <Typography ml={3}>
            - Nếu chuyển sai, vui lòng liên hệ{' '}
            <a href="https://www.facebook.com/GenshinViet">
              <b style={{ color: '#FF1943' }}>ADMIN</b>{' '}
            </a>
            hoặc số điện thoại{' '}
            <b style={{ color: '#FF1943' }}>0372790362 (8h-24h)</b> để được hỗ
            trợ.
          </Typography>
        </Box>
      </TabPanel>
    </Box>
  );
}
