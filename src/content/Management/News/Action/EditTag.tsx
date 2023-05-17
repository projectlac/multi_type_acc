import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { Autocomplete, Box, Button, TextField as MuiTextField, Typography, useTheme, } from '@mui/material';
import { styled } from '@mui/system';
import {
  editWeapon
} from 'api/apiTag/tagApi';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
interface IEdit {
  title: string;
  slug: string;

}

import TinyEditor from '@/components/Common/Editor/TinyEditor';
import { getListNewsCategory, getNewsBySlug, updateNews } from 'api/apiNews/newsApi';
import { INewsCategory } from 'model/news';
import Image from 'next/image';
const Input = styled('input')({
  display: 'none'
});
function EditTag({ title, slug }: IEdit) {
  const theme = useTheme();
  const { handleSetMessage, updateSuccess } = useAuth();
  const [listCategory, setListCategory] = useState([]);
  const [value, setValue] = useState<INewsCategory>(null);
  const [defaultData, setDefaultData] = useState<any>({
    title: '',
    detail: '',
    category: '',
    description: '',
    keyword: '',
    file: null
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Tên tag là thuộc tính bắt buộc'),
    detail: yup.string().required('Mô tả là thuộc tính bắt buộc'),
    category: yup.string().required('Danh mục là thuộc tính bắt buộc'),
    description: yup.string().required('Nội dung là thuộc tính bắt buộc'),
  });
  const initForm = {
    title: defaultData.title,
    detail: defaultData.detail,
    category: defaultData.category,
    description: defaultData.description,
    keyword: defaultData.keyword,
    file: null
  };

  const changeContent = (data: string) => {
    formik.handleChange({
      target: { name: 'description', value: data }
    });
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await getListNewsCategory()
      setListCategory(res.data)
      const res1 = await getNewsBySlug(slug)
      setDefaultData({
        title: res1.data.title,
        detail: res1.data.detail,
        category: res1.data.tag,
        description: res1.data.description,
        keyword: res1.data.keyword,
        file: null
      })
      setPreview(res1.data.image)


      setValue(res1.data.tags[0])

    }
    if (openDialog) {
      callApi();
    }
  }, [openDialog]);

  const onSubmit = (value, { resetForm }) => {
    const { title, file, detail, category, keyword, description } = value;

    const formData = new FormData();


    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('tag', category);
    formData.append('keyword', keyword);
    formData.append('description', description);
    file && formData.append('image', file);

    try {
      updateNews(slug, formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: 'Sửa bài viết thành công'
        });
        handleCloseDialog();
        resetForm();
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
                return option.name === value?.name;
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
              defaultValue={formik.values.description}
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
              id={`change-cover-news-image-${slug}`}
              type="file"
              name="file"
              onChange={handleFile}
            />


            <label htmlFor={`change-cover-news-image-${slug}`}>
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

          <Button variant="contained" fullWidth type="submit" onClick={() => {
            console.log(formik.errors);
          }} >
            Sửa
          </Button>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default EditTag;
