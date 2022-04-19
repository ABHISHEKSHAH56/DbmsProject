import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { Chip } from '@mui/material';

export default function ImgMediaCard({data}) {
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.unsplash.com/photo-1523964517238-b505d09dc571?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.courseName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {data.courseDescription.substr(0,151)}.... 
        </Typography>
        <Typography variant="body1" color="text.warning">
          {data.facultyId.facultyName}
        </Typography>
      </CardContent>
      <div style={{
        position:"absolute",
        left:4,
        top:2

      }}>
      <Chip label={data.department} color='primary' />
      </div>
      <div style={{
        position:"absolute",
        right:4,
        top:2

      }}>
      <Chip label={data.batch} color='warning' />
      </div>
      <CardActions>
        <Button size="small"
           component={RouterLink}
            to={`/student/${data._id}`}  >Student</Button>
        <Button 
          size="small"
          component={RouterLink}
          to={`/assigment/${data._id}`}
          
        >
          Assigment
        </Button>
      </CardActions>
    </Card>
  );
}
