import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {TextField,Stack ,FormControl,Select,MenuItem,InputLabel} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import { createAssigment } from 'src/API';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
export default function NewAssigment({setOpen,open}) {
  const alert=useAlert()
    let { courseId } = useParams();
    
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const todaydate=new Date().getDate()
    const [Assigment, setAssigment] = useState({
        status:"",
        deadline:`2022-04-${todaydate}T10:30`,
        assigmentType: "",
        title:"",
        description:"",

    })
    const handleformSubmit =async(e)=>{
        e.preventDefault();
        console.log(Assigment,images);
        Assigment["material"]=images
        console.log(Assigment);
        await createAssigment(Assigment,courseId).then((res)=>{
          console.log(res.data)
          alert.success("Assigment Created")

          setOpen(false)
        }).catch((err)=>{
          console.log(err.response.data.error)
          alert.error(err.response.data.error.message)
        })
    }
  
    const createProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
  
      setImages([]);
      setImagesPreview([]);
  
      files.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };
  
        reader.readAsDataURL(file);
      });
    };
  

  return (
    <div>
     <Dialog open={open} maxWidth={'xl'} onClose={()=>setOpen(false)}>
        <DialogTitle>Create New Assigment</DialogTitle>
        <form onSubmit={handleformSubmit} >
        <DialogContent>        
        <Stack spacing={2}>
        <FormControl sx={{ mt: 2, minWidth: 350 }}>
            <TextField
                fullWidth            
                type="text"
                value={Assigment.title}
                onChange={(e)=>setAssigment({...Assigment,title:e.target.value})}
                label="Title"            
            /> 
        </FormControl>
        <FormControl sx={{ mt: 2, minWidth: 350 }}>
            <TextField
                fullWidth            
                type="text"
                label="Assigment Description"
                value={Assigment.description}
                onChange={(e)=>setAssigment({...Assigment,description:e.target.value})}
            
            /> 
        </FormControl>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="Batch">AssigmentType</InputLabel>
              <Select
                autoFocus
                label="Batch"
                value={Assigment.assigmentType}
                onChange={(e)=>setAssigment({...Assigment,assigmentType:e.target.value})} 
                
                inputProps={{
                  name: 'AssigmentType',
                  id: 'AssigmentType',
                }}
              >
                <MenuItem value={false}>Select Type </MenuItem>
                <MenuItem value="Assigment">Assigment</MenuItem>
                <MenuItem value="ClassTest">ClassTest</MenuItem>
                <MenuItem value="SubjectiveTest">SubjectiveTest</MenuItem>
                <MenuItem value="McqTest">McqTest</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <TextField
              fullWidth
              id="datetime-local"
              label="Dead Line"
              type="datetime-local"
              value={Assigment.deadline}
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>setAssigment({...Assigment,deadline:e.target.value})}
            />
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </FormControl>
            
            
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="status">status</InputLabel>
              <Select
                autoFocus
                label="status"
                value={Assigment.status}
                onChange={(e)=>setAssigment({...Assigment,status:e.target.value})} 
                
                inputProps={{
                  name: 'status',
                  id: 'status',
                }}
              >
                <MenuItem value={false}>Select status </MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Publish">Publish</MenuItem>
              </Select>
            </FormControl>
                  
        </Stack>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button type='submit' >Add</Button>

          
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
