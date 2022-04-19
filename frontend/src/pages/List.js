import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Card, Chip, Grid, ListItemSecondaryAction, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import Moment from "react-moment"

export default function AlignItemsList({data,index}) {
    console.log(data)
  return (

     <Card>
    <Grid container wrap="nowrap" style={{padding:"5px",marginTop:"5px"}} spacing={3}>
        <Grid item>
        <Avatar sx={{ bgcolor: "orangered" ,margin:"5px"}} >{data.assigmentType.charAt(0)}-{index+1}</Avatar>
        </Grid>
        <Grid item xs>
        <Typography variant='h5' >{data.title}</Typography>
        <Typography>{data.description}</Typography>
        </Grid>
        
        <Grid>
        {
                data.status==="Publish" ? <div>
                <Typography align='center' variant='subtitle2'>Deadline </Typography>
                <Chip color='error' label="12 jan 2020" />
            </div>:null
        }
        </Grid>
        <Grid>
        {
                data.status==="Draft" ? <div>
                    <Typography align='center' variant='subtitle2'>Status</Typography>
                    <Chip color='warning' label={data.status} />
                </div>:<div>
                    <Typography align='center' variant='subtitle2'>Assign At </Typography>
                    <Chip color='success' label="12 jan 2020" />
                </div>
        }
        </Grid>


        
        
        <Grid item > 
            <a href={data.material[0].url} target="_blank" rel="noreferrer"><Button>Download</Button></a>                 
            <Button component={RouterLink}
             to={`/assigment/details/${data._id}`} >View</Button>
            <Button>Edit</Button>
        
        </Grid>
  </Grid>
  </Card>
        
      
       
      
     
     
    
  );
}
