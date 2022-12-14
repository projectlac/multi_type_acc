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

function DetailProduct() {
  const nav = useRouter();

  const [post, setPost] = useState<any>();
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
    if (nav.query.slug)
      getProductBySlug(nav.query.slug as string).then((res) => {
        setPost(res.data);
        const { images, avatar } = res.data;
        let raw = JSON.parse(images);
        let imageList = [avatar];
        imageList.concat(raw);
        let temp = { ...res.data, listImage: imageList };

        setData(temp);
        console.log(temp);
      });

    // // console.log(post);
  }, [nav.query.slug]);

  const onSubmit = async (value, { resetForm }) => {
    if (isAuthenticated) {
      const { receiver, delivery_address, phone, description } = value;
      let details = [{ product: data.slug, amount: quanlity }];
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
            message: 'B???n ???? ?????t h??ng s???n ph???m th??nh c??ng'
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
            'C?? l???i x???y ra, n???u m???t ti???n, vui l??ng li??n h??? v???i Admin ????? ki???m tra l???i'
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
    receiver: yup.string().required('T??n ng?????i nh???n l?? b???t bu???c'),
    phone: yup.string().required('S??? ??i???n tho???i l?? b???t bu???c'),
    delivery_address: yup.string().required('?????a ch??? nh???n h??ng l?? b???t bu???c')
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
        <title>{post?.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.name || 'GenshinViet.com'} />
        <meta
          property="og:description"
          content={`Th??ng tin account ${post?.name}`}
        />
        <meta property="og:image" content={post?.avatar} />
        <meta property="og:image:alt" content={post?.name} />
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
              {/* <Typography
                sx={{
                  fontSize: '17px',
                  fontWeight: '500',
                  color: '#fff',
                  marginBottom: '7px'
                }}
              >
                S??? l?????ng: {data.amount}
              </Typography> */}

              <Typography
                sx={{
                  fontSize: '17px',
                  fontWeight: '500',
                  color: '#fff',
                  marginBottom: '15px'
                }}
              >
                Gi??: {formatMoney(data.price)} VN??
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
                  title={'X??c nh???n mua h??ng'}
                  handleCloseDialog={handleCloseDialog}
                  handleOpenDialog={handleOpenDialog}
                  openDialog={openDialog}
                >
                  <FormatForm formik={formik}>
                    <Grid container columnSpacing={2} rowSpacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          formik={formik}
                          label="T??n ng?????i nh???n"
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
                          label="S??? ??i???n tho???i"
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
                          label="?????a ch??? nh???n h??ng"
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
                          label="Ghi ch??"
                          placeholder=""
                          variant="outlined"
                          fullWidth
                          name="description"
                          type="text"
                        />
                      </Grid>

                      {/* <Grid item md={12} xs={12}>
                        <Button variant="contained" fullWidth type="submit">
                          {formik.isSubmitting ? 'Loading...' : 'Th??m'}
                        </Button>
                      </Grid> */}
                    </Grid>

                    {/* <Typography fontSize={15}>
                    B???n c?? ch???c mu???n mua t??i kho???n n??y kh??ng?
                    <br />
                    Sau khi mua, th??ng tin t??i kho???n s??? ???????c l??u v??o l???ch s??? mua
                    h??ng.
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
                          X??c nh???n
                        </Button>
                      </Grid>
                      <Grid item md={6} xs={12} textAlign="center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleCloseDialog}
                        >
                          ????ng
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
                  <a href={data.link}> ??i t???i Tiktok Shop </a>
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
