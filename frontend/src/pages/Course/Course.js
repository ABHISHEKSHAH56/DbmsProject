import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import ImgMediaCard from 'src/components/Card';
import { Link as RouterLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchCourse } from "../../API/index"
import NewCourse from './NewCourse';



export default function Course() {
  const [openCoursecreate, setOpenCourseCreate] = React.useState(false);
  const [Data, setData] = useState([])
  useEffect(() => {
    async function fetchdata () {
      await fetchCourse().then((res)=>{
        console.log(res)
        const {data}=res
        setData([...data])
      }).catch((er)=>console.log(er.response.data));
    }
    fetchdata();
    console.log(Data)
  }, [])
  
  
  return (
    <>
    
    <Page title="Course">
    <NewCourse setOpen={setOpenCourseCreate} open={openCoursecreate} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Course 
          </Typography>
          <Button
            variant="contained"
            onClick={()=>setOpenCourseCreate(true)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Course
          </Button>
        </Stack>

       
            
         

          
          <Grid container margin={6}>
            {
              Data.length>0? Data.map((item)=>{
                return(
                  <Grid  item marginBottom={4} md={6} xl={4} sm={12}>
                      <ImgMediaCard key={item._id} data={item} />
                  </Grid>
                )
              }):<p>loding....</p>
            }
        </Grid>
        
         
      </Container>
    </Page>
    </>    
  )
}
