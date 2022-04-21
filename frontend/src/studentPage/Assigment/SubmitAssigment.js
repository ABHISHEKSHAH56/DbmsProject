import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {TextField,Stack ,FormControl,Select,MenuItem,InputLabel,Container,Typography,Card} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Page from 'src/components/Page';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import { createAssigment, submitAssigment } from 'src/API';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';

export default function AssigmentSubmission() {
    let { assigmentId } = useParams();
    const navigation=useNavigate()
    const alert =useAlert()
    const [open, setOpen] = useState(true);
    const [images, setImages] = useState([]);    
    const [Assigment, setAssigment] = useState({})
    const handleformSubmit =async(e)=>{
        e.preventDefault();
        Assigment["material"]=images
        await submitAssigment(Assigment,assigmentId ).then((res)=>{
          console.log(res)
          alert.success("Assigment Submited")
          setOpen(false)
          navigation.pop()
        }).catch((err)=>{
          console.log(err.response)
          alert.error(err.response)
        })
    }
  
    const createProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
  
      setImages([]);
      
  
      files.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
           setImages((old) => [...old, reader.result]);
          }
        };
  
        reader.readAsDataURL(file);
      });
    };
  


    return (
        <>
            <Page title="Student List ">
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Assigment Dashboard
                        </Typography>
                    </Stack>
                    <Card >
                    <Dialog open={open} maxWidth={'xl'} onClose={()=>setOpen(false)}>
            <DialogTitle>Submit the Assigment</DialogTitle>
            <form onSubmit={handleformSubmit} >
            <DialogContent>        
                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
                  />
                </FormControl>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button type='submit' >Add</Button>

          
        </DialogActions>
        </form>
      </Dialog>
                    </Card>
                </Container>
            </Page>
        </>
    )
}
