import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { UserMoreMenu } from 'src/sections/@dashboard/user';
import { Button, Chip, ListItemSecondaryAction } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
export default function AlignItemsList() {
  return (

     
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:"10px"}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',margin:"10px"}}>        
            <Avatar style={{ backgroundColor:"orange",margin:'10px' }} >1</Avatar>        
            <div >
               <h4>Assigment-01</h4>
               <hr/>
               <p style={{fontSize:'13px'}} > Assigment-01 lorem korem lorem js jd dashboard sjjs </p>               
               
            </div>
            </div>
            <div>
                <Chip label="Submision " />
                <p style={{textAlign:'center',marginTop:'12px'}}>90%</p>

            </div>
            <div>
                <Chip label="Due Date " />
                <p style={{textAlign:'center',marginTop:'15px',fontSize:'12px'}}>12 fabuaray 2019</p>

            </div>
            
            <div>
            <Chip label="Assigned " />

            <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',margin:"10px"}}>
            <Button size="small"
                component={RouterLink}
                to="/dashboard/assigment/1/1"  
                >
                View
            </Button>
                <Button>Edit</Button>
            </div>
            </div>

            
        </div>
        
      
       
      
     
     
    
  );
}
