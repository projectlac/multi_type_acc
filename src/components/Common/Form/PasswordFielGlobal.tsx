import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import React, { useState } from 'react';

function PasswordFielGlobal({ formik, name, label }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        name={name}
        onChange={formik.handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        error={formik.touched[name] && Boolean(formik.errors[name])}
        label={label}
      />

      {formik.touched[name] && Boolean(formik.errors[name]) && (
        <FormHelperText sx={{ color: '#FF1943' }}>
          {formik.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
    // <TF
    //   fullWidth
    //   type={type}
    //   name={name}
    //   label={label}
    //   value={formik.values[name]}
    //   onChange={formik.handleChange}
    //   error={formik.touched[name] && Boolean(formik.errors[name])}
    //   helperText={formik.touched[name] && formik.errors[name]}
    //   {...props}
    // />
  );
}

export default PasswordFielGlobal;
