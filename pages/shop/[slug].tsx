import BaseLayout from '@/layouts/BaseLayout';
import React, { ReactElement, useEffect, useState } from 'react';
import { buyProduct, getProductBySlug } from 'api/product/productApi';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import Head from 'next/head';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import formatMoney from '@/utility/formatMoney';
import DialogCommonWithoutIcon from '@/components/Common/DialogCommon/DialogCommonWithoutIcon';
import * as yup from 'yup';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import { useRouter } from 'next/router';

function DetailProduct({ post }) {
  const nav = useRouter();

  const { handleSetMessage, isAuthenticated } = useAuth();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [pending, setPending] = useState(false);
  const [quanlity, setQuanlity] = useState<number>(1);
  const [data, setData] = useState({
    amount: 0,
    avatar: '',
    category: {},
    description: '',
    id: 0,
    images: [],
    name: '',
    link: '',
    price: '',
    slug: '',
    listImage: []
  });

  const increment = () => {
    setQuanlity((prev) => prev + 1);
  };
  const decrement = () => {
    setQuanlity((prev) => (prev === 1 ? prev : prev - 1));
  };
  useEffect(() => {
    const { images, avatar } = post;
    let raw = JSON.parse(images);
    let imageList = [avatar];
    imageList.concat(raw);
    let temp = { ...post, listImage: imageList };

    // console.log(temp);

    setData(temp);
    // console.log(post);
  }, []);

  const onSubmit = async (value, { resetForm }) => {
    if (isAuthenticated) {
      const { receiver, delivery_address, phone, description } = value;
      let details = [{ product: data.slug, amount: 1 }];
      setPending(true);
      try {
        await buyProduct(
          receiver,
          delivery_address,
          phone,
          description,
          details
        ).then(() => {
          handleSetMessage({
            type: 'success',
            message: 'Bạn đã đặt hàng sản phẩm thành công'
          });

          resetForm();

          setPending(false);
          handleCloseDialog();
        });
      } catch (error) {
        setPending(false);
        handleSetMessage({
          type: 'error',
          message:
            'Có lỗi xảy ra, nếu mất tiền, vui lòng liên hệ với Admin để kiểm tra lại'
        });
      }
    } else {
      nav.push('/login');
    }
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validationSchema = yup.object({
    receiver: yup.string().required('Tên người nhận là bất buộc'),
    phone: yup.string().required('Số điện thoại là bất buộc'),
    delivery_address: yup.string().required('Địa chỉ nhận hàng là bất buộc')
  });
  const initForm = {
    receiver: '',
    delivery_address: '',
    phone: '',
    description: ''
  };

  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  return (
    <>
      <Head>
        <title>{post.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.name || 'GenshinViet.com'} />
        <meta
          property="og:description"
          content={`Thông tin account ${post.name}`}
        />
        <meta property="og:image" content={post.avatar} />
        <meta property="og:image:alt" content={post.name} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        <Box
          sx={{
            background: 'rgb(27 25 60 / 58%)',
            minHeight: '100px',
            borderRadius: '20px',
            padding: '20px'
          }}
        >
          <Grid container columnSpacing={3}>
            <Grid item md={6} xs={12}>
              <Slider
                asNavFor={nav2}
                arrows={false}
                dot={false}
                ref={(slider1) => setNav1(slider1)}
              >
                {data.listImage.length > 0 &&
                  data.listImage.map((d, i) => (
                    <Box
                      key={i}
                      sx={{
                        '& img': {
                          width: '100%',
                          borderRadius: '20px'
                        }
                      }}
                    >
                      <img src={d} alt="" />
                    </Box>
                  ))}
              </Slider>
              {data.listImage.length > 1 && (
                <Slider
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={3}
                  dot={false}
                  arrows={false}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  ar
                >
                  {data.listImage.length > 0 &&
                    data.listImage.map((d, i) => (
                      <div key={i}>
                        <img src={d} alt="" />
                      </div>
                    ))}
                </Slider>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                sx={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: '#fff',
                  marginBottom: '15px'
                }}
              >
                {data.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '17px',
                  fontWeight: '500',
                  color: '#fff',
                  marginBottom: '7px'
                }}
              >
                Số lượng: {data.amount}
              </Typography>

              <Typography
                sx={{
                  fontSize: '17px',
                  fontWeight: '500',
                  color: '#fff',
                  marginBottom: '15px'
                }}
              >
                Giá: {formatMoney(data.price)} VNĐ
              </Typography>
              <Box
                className="quantity-input"
                sx={{
                  display: 'flex',
                  justifyContent: 'flext-start  ',
                  alignItems: 'flext-start',
                  mb: 3,
                  '&:focus': {
                    background: 'red'
                  },
                  '.quantity-input__modifier, .quantity-input__screen': {
                    userSelect: 'none',
                    outline: 'none'
                  },
                  '.quantity-input__modifier': {
                    width: '35px',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f3f3f3',
                    color: '#888',
                    border: ' 0 solid #dbdbdb',
                    textAlign: 'center',
                    textShadow: '0 1px 0 rgba(#fff, .6)',
                    cursor: 'pointer',
                    height: '35px',
                    transition: 'all 0.5s',
                    '&:hover': {
                      background: '#d1d1d1',
                      color: '#000'
                    },

                    '&--left': {
                      borderRadius: '10px 0 0 10px'
                    },

                    '&--right': {
                      borderRadius: '0 10px 10px 0'
                    }
                  },
                  '.quantity-input__screen': {
                    padding: '.7rem',
                    fontSize: '1rem',
                    border: '0',
                    borderTop: ' 0 solid #dbdbdb',
                    borderBottom: ' 0 solid #dbdbdb',
                    textAlign: 'center',
                    width: '35px',
                    height: '35px'
                  }
                }}
              >
                <button
                  className="quantity-input__modifier quantity-input__modifier--left"
                  onClick={decrement}
                >
                  -
                </button>
                <input
                  className="quantity-input__screen"
                  type="text"
                  value={quanlity}
                  readOnly
                />
                <button
                  className="quantity-input__modifier quantity-input__modifier--right"
                  onClick={increment}
                >
                  +
                </button>
              </Box>
              <Box
                sx={{
                  display: 'flex'
                }}
              >
                <DialogCommonWithoutIcon
                  titleButton={'Mua ngay'}
                  title={'Xác nhận mua hàng'}
                  handleCloseDialog={handleCloseDialog}
                  handleOpenDialog={handleOpenDialog}
                  openDialog={openDialog}
                >
                  <FormatForm formik={formik}>
                    <Grid container columnSpacing={2} rowSpacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          formik={formik}
                          label="Tên người nhận"
                          placeholder=""
                          variant="outlined"
                          fullWidth
                          name="receiver"
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
                          name="phone"
                          type="text"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          formik={formik}
                          label="Địa chỉ nhận hàng"
                          placeholder=""
                          variant="outlined"
                          fullWidth
                          name="delivery_address"
                          type="text"
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          formik={formik}
                          label="Ghi chú"
                          placeholder=""
                          variant="outlined"
                          fullWidth
                          name="description"
                          type="text"
                        />
                      </Grid>

                      {/* <Grid item md={12} xs={12}>
                        <Button variant="contained" fullWidth type="submit">
                          {formik.isSubmitting ? 'Loading...' : 'Thêm'}
                        </Button>
                      </Grid> */}
                    </Grid>

                    {/* <Typography fontSize={15}>
                    Bạn có chắc muốn mua tài khoản này không?
                    <br />
                    Sau khi mua, thông tin tài khoản sẽ được lưu vào lịch sử mua
                    hàng.
                  </Typography> */}
                    <Divider sx={{ my: 2 }} />
                    <Grid container>
                      <Grid item md={6} xs={12} textAlign="center">
                        <Button
                          variant="contained"
                          disabled={pending}
                          type="submit"
                          // onClick={buyAccountSubmit}
                        >
                          Xác nhận
                        </Button>
                      </Grid>
                      <Grid item md={6} xs={12} textAlign="center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleCloseDialog}
                        >
                          Đóng
                        </Button>
                      </Grid>
                    </Grid>
                  </FormatForm>
                </DialogCommonWithoutIcon>

                <Button
                  variant="contained"
                  color="info"
                  sx={{ ml: 3, '& a': { color: '#fff' } }}
                >
                  <a href={data.link}> Đi tới Tiktok Shop </a>
                </Button>
              </Box>
              {/* <Button variant="contained" sx={{ mr: 2 }}>
                Mua ngay
              </Button> */}

              <Divider sx={{ my: 2, background: '#fff' }}></Divider>
              <Box
                dangerouslySetInnerHTML={{ __html: data.description }}
                sx={{
                  color: '#fff'
                }}
              ></Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default DetailProduct;

DetailProduct.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const res = await getProductBySlug(slug as string);
  const post = await res.data;

  return { props: { post } };
}
