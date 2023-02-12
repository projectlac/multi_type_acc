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

function PasswordField({ formik }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <FormControl sx={{ mt: 3 }} variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        name="password"
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
        error={formik.touched['password'] && Boolean(formik.errors['password'])}
        label="Password"
      />
      {formik.touched['password'] && (
        <FormHelperText sx={{ color: '#FF1943' }}>
          {formik.errors['password']}
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

export default PasswordField;
