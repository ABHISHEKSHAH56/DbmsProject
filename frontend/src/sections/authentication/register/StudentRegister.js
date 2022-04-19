import * as Yup from 'yup';
import * as React from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField,Select} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useAlert } from 'react-alert';
import { StudentRegister } from 'src/API';
import { authContext } from 'src/hooks/AuthContext';
// ----------------------------------------------------------------------

export default function StudentForm() {
  const navigate = useNavigate();
  const alert=useAlert()
  const { setAuthData } = React.useContext(authContext);
  
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
      rollNumber: 'CSE/19004/431',
      batch: '2019-2023',
      department: 'CSE'
    },
    validationSchema: RegisterSchema,
    onSubmit: async() => {
      console.log(formik.values);
      await StudentRegister(formik.values).then((res)=>{
        setAuthData(res.data.user);
        navigate("/")
        alert.success("You registered successfully")
      }).catch((err)=>{
        const {data} =err.response;
       alert.error(data.error.message)
      })
     

     
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
                <MenuItem value={"2019-2023"}>2019-2023</MenuItem>
                <MenuItem value={"2020-2024"}>2020-2024</MenuItem>
                <MenuItem value={"2021-2025"}>2021-2025</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Department</InputLabel>
              <Select fullWidth label="Department" {...getFieldProps('department') } >
                <MenuItem value={"CSE"}>CSE</MenuItem>
                <MenuItem value={"ECE"}>ECE</MenuItem>
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
