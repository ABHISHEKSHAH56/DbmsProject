import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,  
  TableBody,
  Container,
  Typography,
  TableContainer,
  Button,
} from '@mui/material';
// components
import Page from '../../components/Page';



import { fetchAllAssigmen } from 'src/API';
import Scrollbar from 'src/components/Scrollbar';
import ListOfAssigment from './ListofAssigment';

export default function CourseStudentAssigment() {
  
  let { courseId } = useParams();
  console.log(courseId)
  const [loading,setLoading]=useState(true)
  const [Data, setData] = useState([])
  useEffect(() => {
      async function fetchdata () {
      await fetchAllAssigmen(courseId).then((res)=>{
          console.log(res)
          const {assigmentData}=res.data
          setData(assigmentData)
          console.log(Data)
          setLoading(false)
          
      }).catch((er)=>console.log(er.response.data));
      }
      fetchdata();       
  }, [])
      
  return (
    <>
    <Page title="Assigemnt">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Assigment
          </Typography> 
                 
        </Stack>

        
          {
            loading===true ?<p>loading..</p>:Data.length>0 ?Data.map((item,index)=>{
              return(
               
                  <Scrollbar>
                   
                    <ListOfAssigment data={item} index={index} key={item._id} /> 
                   
                    </Scrollbar>                   
                         
                
              )
            }) :<p>No Assigment for Now</p>
          }
        

         
         

          

          
        
      </Container>
    </Page>
    </>


  )
}
