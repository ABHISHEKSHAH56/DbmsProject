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
import { createCourse } from 'src/API';

export default function NewCourse({setOpen,open}) {
    const [Course, setCourse] = useState({
        batch:"",
        courseName:"",
        department: "",
        courseDescription:""
    })
    const handleformSubmit =async(e)=>{
        e.preventDefault();
        console.log(Course);
        await createCourse(Course).then((res)=>{
            console.log(res)
            setOpen(false)
            alert("Created")

        }).catch((err)=>console.log(err.response.data))
    }
  

  

  return (
    <div>
     <Dialog open={open} maxWidth={'xl'} onClose={()=>setOpen(false)}>
        <DialogTitle>Create Course</DialogTitle>
        <form onSubmit={handleformSubmit} >
        <DialogContent>        
        <Stack spacing={2}>
        <FormControl sx={{ mt: 2, minWidth: 350 }}>
            <TextField
                fullWidth            
                type="text"
                value={Course.courseName}
                onChange={(e)=>setCourse({...Course,courseName:e.target.value})}
                label="Course Name"            
            /> 
        </FormControl>
        <FormControl sx={{ mt: 2, minWidth: 350 }}>
            <TextField
                fullWidth            
                type="text"
                label="Course Description"
                value={Course.courseDescription}
                onChange={(e)=>setCourse({...Course,courseDescription:e.target.value})}
            
            /> 
        </FormControl>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="Batch">Batch</InputLabel>
              <Select
                autoFocus
                label="Batch"
                value={Course.batch}
                onChange={(e)=>setCourse({...Course,batch:e.target.value})} 
                
                inputProps={{
                  name: 'Batch',
                  id: 'Batch',
                }}
              >
                <MenuItem value={false}>Select Batch </MenuItem>
                <MenuItem value="2019-2023">2019-2023</MenuItem>
                <MenuItem value="2020-2024">2020-2024</MenuItem>
                <MenuItem value="2021-2025">2021-2025</MenuItem>
                <MenuItem value="2022-2026">2022-2026</MenuItem>
              </Select>
            </FormControl>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="Department">Department</InputLabel>
              <Select
                autoFocus
                label="Department"
                value={Course.department}
                onChange={(e)=>setCourse({...Course,department:e.target.value})} 
                
                inputProps={{
                  name: 'Department',
                  id: 'Department',
                }}
              >
                <MenuItem value={false}>Select Department </MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="ECE">ECE</MenuItem>
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
