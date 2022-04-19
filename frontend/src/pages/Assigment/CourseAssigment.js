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

// component
import Iconify from '../../components/Iconify';
import TableStudent from 'src/components/TableStudent';
import AlignItemsList from '../List';
import NewAssigment from './NewAssigment';
import { fetchAllAssigmen } from 'src/API';
import Scrollbar from 'src/components/Scrollbar';

export default function CourseAssigment() {
  const [openAssigmentcreate, setOpenAssigmentCreate] = React.useState(false);
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
    <NewAssigment setOpen={setOpenAssigmentCreate} open={openAssigmentcreate} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Assigment
          </Typography> 
          <Button
            variant="contained"
            onClick={()=>setOpenAssigmentCreate(true)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Assigment
          </Button>         
        </Stack>

        
          {
            loading===true ?<p>loading..</p>:Data.length>0 ?Data.map((item,index)=>{
              return(
               
                  <Scrollbar>
                   
                    <AlignItemsList data={item} index={index} key={item._id} /> 
                   
                    </Scrollbar>                   
                         
                
              )
            }) :<p>No Assigment for Now</p>
          }
        

         
         

          

          
        
      </Container>
    </Page>
    </>


  )
}
