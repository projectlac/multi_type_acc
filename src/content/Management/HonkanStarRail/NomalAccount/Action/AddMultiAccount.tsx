import DialogCommon from '@/components/Common/DialogCommon/DialogCommon';
import AutoCompleteHarder from '@/components/Common/Form/AutoCompleteHarder';
import useCustomForm from '@/components/Common/Form/Form';
import FormatForm from '@/components/Common/Form/FormatForm';
import Selection from '@/components/Common/Form/Selection';
import TextField from '@/components/Common/Form/TextField';
import { useAuth } from '@/contexts/AuthGuard';
import getNameSortAtoB from '@/utility/sortArray';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  useTheme
} from '@mui/material';
import { styled } from '@mui/styles';
import { createMultiAccount } from 'api/apiAccount/account';
import { getHero, getWeapon } from 'api/apiTag/tagApi';
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
  name: yup.string().required('Trường này là bắt buộc'),
  info: yup.string().required('Thông tin này là thuộc tính bắt buộc'),
  type: yup.string().required('Loại tài khoản là thuộc tính bắt buộc'),
  file: yup.mixed().required('File is required')
});
const initForm = {
  name: '',
  server: 'ASIA',
  detail: '',
  info: '',
  hero: '',
  weapon: '',
  type: 'REROLL',
  game: 'honkai-star-rail',
  file: null
};

function AddMultiAccount({ title }: IEdit) {
  const { handleSetMessage, updateSuccess } = useAuth();

  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>('');
  const [weapon, setWeapon] = useState([]);
  const [hero, setHero] = useState([]);
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
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

  const onSubmit = async (values, { resetForm }) => {
    const { name, server, detail, info, type, file, hero, weapon, game } =
      values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('server', server);
    formData.append('description', detail);
    formData.append('info', info);
    formData.append('type', type);
    formData.append('game', game);
    formData.append('hero', hero.map((d) => d.desc).toString());
    formData.append('weapon', weapon.map((d) => d.desc).toString());
    file && formData.append('image', file);

    try {
      await createMultiAccount(formData).then(() => {
        handleSetMessage({
          type: 'success',
          message: `Tạo tài khoản ${type} thành công`
        });
        handleCloseDialog();
        resetForm();
        (
          document.getElementById(
            'change-cover-create-account-vip-multi'
          ) as HTMLInputElement
        ).value = '';
        setPreview('');
        updateSuccess();
      });
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: 'Có lỗi xảy ra, vui lòng kiểm tra lại thông tin nhập'
      });
    }
  };

  const formik = useCustomForm(validationSchema, initForm, onSubmit);

  const handleSelectedWeapon = (data: any) => {
    formik.handleChange({ target: { name: 'weapon', value: data } });
  };
  const handleSelectedCharacter = (data: any) => {
    formik.handleChange({ target: { name: 'hero', value: data } });
  };

  useEffect(() => {
    if (openDialog) {
      getWeapon(999, formik.values.game).then((res) => {
        let temp = res.data.data.map((d) => ({ desc: d.desc, slug: d.slug }));
        setWeapon(temp);
      });
      getHero(999, formik.values.game).then((res) => {
        let temp = res.data.data.map((d) => ({ desc: d.desc, slug: d.slug }));
        setHero(temp);
      });
      setTrigger(true);
    }
  }, [openDialog, formik.values.game]);

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
          <Grid container columnSpacing={2} rowSpacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Tiêu đê"
                placeholder=""
                variant="outlined"
                fullWidth
                name="name"
                type="text"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                formik={formik}
                label="Chi tiết tài khoản"
                variant="outlined"
                fullWidth
                name="detail"
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
                  { value: 'ASIA', title: 'Asia' },
                  { value: 'AMERICA', title: 'America' },
                  { value: 'EUROPE', title: 'Europe' },
                  { value: 'TW-HK-MO', title: 'TW-HK-MO' }
                ]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <AutoCompleteHarder
                  trigger={trigger}
                  title="Danh sách vũ khí"
                  data={getNameSortAtoB(weapon)}
                  id="create-vip-weapon"
                  name="weapon"
                  formik={formik}
                  defaultValue={[]}
                  handleSelected={handleSelectedWeapon}
                />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <AutoCompleteHarder
                  trigger={trigger}
                  title="Danh sách nhân vật"
                  data={getNameSortAtoB(hero)}
                  id="create-vip-hero"
                  name="hero"
                  formik={formik}
                  defaultValue={[]}
                  handleSelected={handleSelectedCharacter}
                />
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                formik={formik}
                label="Thông tin acc"
                variant="outlined"
                fullWidth
                name="info"
                type="text"
                rows="5"
                multiline
              />
              <sup>
                nếu dùng ảnh thì x, dùng link ảnh thì điền link <br />
                thứ tự : username, password, giá, ar của accout, link ảnh <br />
                Ví dụ: <br />
                có link ảnh: username,password,10000,10,https://abc <br />
                dùng ảnh: username,password,10000,10,x <br />
              </sup>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Loại acc
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="type"
                  value={formik.values.type}
                  onChange={(event) => {
                    formik.handleChange({
                      target: {
                        name: 'type',
                        value: event.target.value
                      }
                    });
                  }}
                >
                  <FormControlLabel
                    value="REROLL"
                    control={<Radio />}
                    label="Reroll"
                  />
                  <FormControlLabel
                    value="RANDOM"
                    control={<Radio />}
                    label="Random"
                  />
                  <FormControlLabel
                    value="NEW"
                    control={<Radio />}
                    label="Khởi đầu"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Game
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-game-label"
                  name="game"
                  value={formik.values.game}
                  onChange={(event) => {
                    formik.handleChange({
                      target: {
                        name: 'game',
                        value: event.target.value
                      }
                    });
                  }}
                >
                  <FormControlLabel
                    value="honkai-star-rail"
                    control={<Radio />}
                    label="Honkai star rail"
                  />
                  <FormControlLabel
                    value="genshin-impact"
                    control={<Radio />}
                    label="Genshin Impact"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box>
                <Input
                  accept="image/*"
                  id="change-cover-create-account-vip-multi"
                  type="file"
                  name="file"
                  onChange={handleFile}
                />
                <label htmlFor="change-cover-create-account-vip-multi">
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
                <Box width={200} height={150}>
                  <Image
                    src={preview}
                    layout="responsive"
                    width={200}
                    height={150}
                  ></Image>
                </Box>
              )}
            </Grid>

            <Grid item md={12} xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                onClick={() => {
                  console.log(formik.errors);
                }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Loading...' : 'Thêm'}
              </Button>
            </Grid>
          </Grid>
        </FormatForm>
      </Box>
    </DialogCommon>
  );
}

export default AddMultiAccount;
