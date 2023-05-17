import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import TinyEditor from '@/components/Common/Editor/TinyEditor';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import getNameSortAtoB from '@/utility/sortArray';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import {
  Autocomplete,
  Box,
  Button,
  styled,
  useTheme, TextField as MuiTextField, Typography
} from '@mui/material';
import { createNews, getListNewsCategory } from 'api/apiNews/newsApi';
import { createWeapon } from 'api/apiTag/tagApi';
import { INewsCategory } from 'model/news';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

interface IEdit {
  title: string;
}

const Input = styled('input')({
  display: 'none'
});

const validationSchema = yup.object({
  title: yup.string().required('Tên bài viết là thuộc tính bắt buộc'),
  detail: yup.string().required('Mô tả là thuộc tính bắt buộc'),
  category: yup.string().required('Danh mục là thuộc tính bắt buộc'),
  description: yup.string().required('Nội dung là thuộc tính bắt buộc'),
});

const initForm = {
  title: '',
  detail: '',
  category: '',
  description: '',
  keyword: '',
  file: null
};

function AddTag({ title }: IEdit) {
  const theme = useTheme();
  const { handleSetMessage, updateSuccess } = useAuth();
  const [preview, setPreview] = useState<string>('');
  const [value, setValue] = useState<INewsCategory>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [listCategory, setListCategory] = useState([]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);

  };

  const onSubmit = (value, { resetForm }) => {
    const { title, file, detail, category, keyword, description } = value;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('tag', category);
    formData.append('keyword', keyword);
    formData.append('description', description);
    formData.append('status', null);

    file && formData.append('image', file);


    try {
      createNews(formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Thêm bài viết thành công'
        });
        handleCloseDialog();
        resetForm();
        (
          document.getElementById(
            'change-cover-news-image'
          ) as HTMLInputElement
        ).value = '';
        setPreview('')
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, kiểm tra lại hoặc liên hệ DEV'
      });
    }

  };
  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    const objectUrl = URL.createObjectURL(
      (e.target as HTMLInputElement).files[0]
    );
    setPreview(objectUrl);
    formik.handleChange({
      target: { name: 'file', value: (e.target as HTMLInputElement).files[0] }
    });
  };
  const changeContent = (data: string) => {
    console.log(data);

    formik.handleChange({
      target: { name: 'description', value: data }
    });
  };
  useEffect(() => {
    const callApi = async () => {
      const res = await getListNewsCategory()
      setListCategory(res.data)
    }
    if (openDialog) {
      callApi();
    }
  }, [openDialog])
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
            sx={{ mt: 1 }}
            label="Tên"
            variant="outlined"
            fullWidth
            name="title"
            type="text"
          />
          <TextField
            formik={formik}
            sx={{ mt: 1 }}
            label="Mô tả ngắn"
            variant="outlined"
            fullWidth
            name="detail"
            type="text"
          />
          <Box mt={1} mb={1}>
            <Autocomplete
              sx={{
                mb: 2
              }}
              value={value}
              onChange={(event: any, newValue: INewsCategory) => {
                console.log(event.type);
                formik.handleChange({
                  target: { name: 'category', value: newValue.slug ?? '' }
                });


              }}
              isOptionEqualToValue={(option, value) => {
                return option.name === value.name;
              }}
              getOptionLabel={(option: INewsCategory) => option.name}
              options={listCategory}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  label="Danh mục tin tức"
                  name="type"
                  error={formik.touched.type && Boolean(formik.errors.type)}
                />
              )}
            />
          </Box>
          <Box mt={1} mb={1}>
            <TinyEditor
              changeBody={changeContent}
              defaultValue={''}
            />
            {
              formik.touched.description && Boolean(formik.errors.description) && (<Typography sx={{
                color: '#FF1943',
                fontSize: '12px', fontWeight: 'bold', marginLeft: '8px',
                marginRight: '8px',
              }}>Chi tiết bài viết không được để trống</Typography>)
            }
          </Box>
          <Box mb={3}>
            <TextField
              formik={formik}
              sx={{ mt: 1 }}
              label="Từ khóa Seo (ngăn cách bằng dấy phẩy)"
              variant="outlined"
              fullWidth
              name="keyword"
              type="text"
            />
          </Box>
          <Box mb={3}>
            <Input
              accept="image/*"
              id="change-cover-news-image"
              type="file"
              name="file"
              onChange={handleFile}
            />


            <label htmlFor="change-cover-news-image">
              <Button
                startIcon={<UploadTwoToneIcon />}
                variant="contained"
                component="span"
                sx={{
                  background: Boolean(formik.errors.file)
                    ? theme.colors.error.main
                    : theme.colors.primary.main
                }}
              >
                Upload avatar
              </Button>
            </label>
          </Box>
          {preview && (
            <Box width={150} height={150} mb={3}>
              <Image
                src={preview}
                layout="responsive"
                width={150}
                height={150}
              ></Image>
            </Box>
          )}

          <Button variant="contained" fullWidth type="submit">
            Thêm
          </Button>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddTag;
