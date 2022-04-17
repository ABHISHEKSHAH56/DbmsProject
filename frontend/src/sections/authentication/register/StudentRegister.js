import * as Yup from 'yup';
import * as React from 'react';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment ,Select} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// ----------------------------------------------------------------------

export default function StudentForm() {
  const navigate = useNavigate();
  
  const RegisterSchema = Yup.object().shape({
    rollNumber: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Roll Number required'),
    batch: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Batch required'),
    department: Yup.string().required('Department is required'),
   
  });

  const formik = useFormik({
    initialValues: {
      rollNumber: '',
      batch: '',
      department: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async() => {
      console.log(formik.values);
      <Navigate to="/login" />
     

     
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  

 

  return (
    <>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
         
            <TextField
              fullWidth
              label="Roll Number "
              {...getFieldProps('rollNumber')}
              error={Boolean(touched.rollNumber && errors.rollNumber)}
              helperText={touched.rollNumber && errors.rollNumber}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Batch</InputLabel>
              <Select fullWidth label="Batch" {...getFieldProps('batch') } >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select fullWidth label="Department" {...getFieldProps('department') } >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
           
            


          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
    
    </>
  );
}
