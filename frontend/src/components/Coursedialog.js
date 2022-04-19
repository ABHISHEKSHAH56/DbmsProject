import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fetchCourse } from 'src/API';

const emails = ['username@gmail.com', 'user02@gmail.com','None',
'Atria',
'Callisto',
'Dione',
'Ganymede',
'Hangouts Call',
'Luna',
'Oberon',
'Phobos',
'Pyxis',
'Sedna',
'Titania',
'Triton',
'Umbriel'];



export default function CourseDialog({props,open ,setOpen}) {
  
  const [loading ,setLoading]=React.useState(true);
  const [courseList,setCourseList]=React.useState(null)
  React.useEffect(() => {
    async function datafetch()
    {
      await fetchCourse().then((res)=>{
        console.log(res)
        setCourseList(res.data);
        setLoading(false)
        console.log(courseList)

      }).catch((err)=>alert(err.response.data.error.message))
    }
    datafetch();
    console.log(courseList)
    
  },[]);
  

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       
      >
        <DialogTitle id="alert-dialog-title">
          {"Select The Course "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let help to find the better result for you please select the course for Assigment.
          </DialogContentText>
        </DialogContent>
        <DialogContent dividers>
        <List sx={{ pt: 0 }}>
        {
            loading===true ? <p>loading....</p>
             :
            courseList.map((item) => (
        
                <ListItem component={RouterLink}  to={`/${props}/${item._id}`}  key={item._id}>
                  <ListItemAvatar>
                  <Avatar style={{ backgroundColor:"orange",margin:'10px' }} >{item.courseName.charAt(0)}</Avatar>        
                  
                    
                  </ListItemAvatar>
                  <ListItemText primary={item.courseName} />
                </ListItem>
               
              ))
        }
        </List>

        </DialogContent>
        
      </Dialog>
    </div>
  );
}
