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
  import { Link as RouterLink, useNavigate } from 'react-router-dom';
  import React, { useEffect, useState } from 'react';
  import {  fetchUnenrolled,joinedthecourse } from 'src/API';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Chip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
  
  
  
  export default function AllCourse() {
      const navigation= useNavigate()
    const [Data, setData] = useState([])
    useEffect(() => {
      async function fetchdata () {
        await fetchUnenrolled().then((res)=>{
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
     
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
             All Course 
            </Typography>
            
          </Stack>
  
         
              
           
  
            
            <Grid container margin={6}>
              {
                Data.length>0? Data.map((item)=>{
                  return(
                    <Grid  item marginBottom={4} md={6} xl={4} sm={12}>
                        <Card key={item._id} sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="https://images.unsplash.com/photo-1523964517238-b505d09dc571?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {item.courseName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {item.courseDescription.substr(0,151)}.... 
                                </Typography>
                                <Typography variant="body1" color="text.warning">
                                {item.facultyId.facultyName}
                                </Typography>
                            </CardContent>
                            <div style={{
                                position:"absolute",
                                left:4,
                                top:2

                            }}>
                            <Chip label={item.department} color='primary' />
                            </div>
                            <div style={{
                                position:"absolute",
                                right:4,
                                top:2

                            }}>
                            <Chip label={item.batch} color='warning' />
                            </div>
                            <CardActions>
                                <LoadingButton size="large"
                                onClick={async()=>{
                                    await joinedthecourse(item._id).then((res)=>{
                                        navigation("/")

                                    }).catch((err)=>alert(err.response.data.error))
                                }}
                                 >JOIN</LoadingButton>
                                
                            </CardActions>
                        </Card>
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
  