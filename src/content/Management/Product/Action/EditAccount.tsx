import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
// import { createAccountNomal } from 'api/apiAccount/account';
import TinyEditor from '@/components/Common/Editor/TinyEditor';
import AutoCompleteHarder from '@/components/Common/Form/AutoCompleteHarder';
import Basic from '@/components/Dropzone/StyledDropzone';
import { useAuth } from '@/contexts/AuthGuard';
import { getCategory } from 'api/category/categoryApi';
import { getProductBySlug, updateProduct } from 'api/product/productApi';
interface IEdit {
  title: string;
  slug: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Trường này là bắt buộc'),

  description: yup.string().required('Trường này là thuộc tính bắt buộc'),
  file: yup.mixed().notRequired(),
  amount: yup.number().required('Trường này là thuộc tính bắt buộc'),
  price: yup.number().required('Trường này là thuộc tính bắt buộc'),

  category: yup.array().min(1)
});

function EditAccount({ title, slug }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();
  const [category, setCategory] = useState([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string[]>([]);

  const [trigger, setTrigger] = useState<boolean>(false);

  const [defaultData, setDefaultData] = useState<any>({
    name: '',
    price: '',
    description: '',
    file: null,
    amount: 0,
    category: []
  });
  const initForm = defaultData;
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectedCategory = (data: any) => {
    formik.handleChange({ target: { name: 'category', value: data } });
  };

  const handleFile = (file) => {
    let a = file.length > 0 && file.map((d, i) => URL.createObjectURL(d));
    setPreview(a);

    // const objectUrl = URL.createObjectURL(
    //   (e.target as HTMLInputElement).files[0]
    // );
    formik.handleChange({
      target: { name: 'file', value: file }
    });
  };

  useEffect(() => {
    if (openDialog) {
      const callApi = async () => {
        await getCategory().then((res) => {
          let temp = res.data.map((d) => ({ desc: d.name, slug: d.slug }));
          // console.log(temp);

          setCategory(temp);
        });
        await getProductBySlug(slug).then((res) => {
          const data = res.data;
          let temp = {
            name: data.name,
            description: data.description,
            price: data.price,
            file: null,
            amount: data.amount,
            category: [{ desc: data.category.name, slug: data.category.slug }]
          };
          let avatar = [data.avatar];
          let image = JSON.parse(data.images);
          let listImage = avatar.concat(image);

          setPreview(listImage);
          setDefaultData(temp);
          setTrigger(true);
        });
      };
      callApi();
    }
  }, [openDialog]);

  const onSubmit = async (values, { resetForm }) => {
    const { name, description, price, amount, file, category } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);

    formData.append('description', description);
    formData.append('amount', amount);
    formData.append(
      'categorySlug',
      category.map((d) => d.slug)
    );

    file && formData.append('avatar', file[0]);
    if (file && file.length > 1) {
      for (let index = 1; index <= file.length - 1; index++) {
        formData.append('images', file[index]);
      }
    }

    try {
      await updateProduct(slug, formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Sửa sản phẩm thành công`
        });
        handleCloseDialog();
        resetForm();

        setPreview([]);
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin nhập'
      });
    }
  };
  const changeContent = (data: string) => {
    formik.handleChange({
      target: { name: 'description', value: data }
    });
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
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Tên sản phảm"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid container columnSpacing={2}>
                <Grid item md={6}>
                  <TextField
                    formik={formik}
                    label="Giá"
                    placeholder=""
                    variant="outlined"
                    fullWidth
                    name="price"
                    type="number"
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    formik={formik}
                    label="Số lượng"
                    placeholder=""
                    variant="outlined"
                    fullWidth
                    name="amount"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography>Mô tả</Typography>
              <TinyEditor
                changeBody={changeContent}
                defaultValue={defaultData.description}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Box>
                <AutoCompleteHarder
                  trigger={trigger}
                  title="Danh sách danh mục sản phẩm"
                  data={category}
                  id="create-vip-weapon"
                  name="category"
                  formik={formik}
                  defaultValue={defaultData.category}
                  handleSelected={handleSelectedCategory}
                />
              </Box>
            </Grid>

            <Grid item md={12} xs={12}>
              <Basic handleFile={handleFile} />
              <Box
                mt={3}
                sx={{
                  display: 'flex',
                  '& div': {
                    marginRight: 1,
                    border: '3px solid #fff',
                    '&:first-of-type': { border: '3px solid #d50d0d' }
                  }
                }}
              >
                {preview.length > 0 &&
                  preview.map((d, i) => (
                    <Box
                      width={200}
                      height={150}
                      key={i}
                      sx={{
                        background: `url(${d})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                      }}
                    ></Box>
                  ))}
              </Box>
            </Grid>

            <Grid item md={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                onClick={() => {
                  console.log(formik.errors);
                }}
              >
                {formik.isSubmitting ? 'Loading...' : 'Sửa'}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditAccount;
