import * as React from 'react';
import {useState} from 'react';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';
import { Card, Container, Stack, Typography } from '@mui/material';
import { detailsAssigment } from 'src/API';
import TableAssigmentStudent from 'src/components/TableAssigmentStudent';


export default function Submiteddashboard() {
  let { assigmentId } = useParams();
  const [loading, setloading] = useState(true)
    
    const [Data, setData] = useState([])
    React.useEffect(() => {
        async function fetchdata () {
        await detailsAssigment(assigmentId).then((res)=>{    
          const {submissionDetails}=res.data      
            setData(submissionDetails)
            setloading(false)
            

            
        }).catch((er)=>console.log(er.response.data));
        }
        fetchdata();       
    }, [])
    
  


    return (
        <>
            <Page title="Student List ">
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Assigment Dashboard
                        </Typography>
                    </Stack>
                    <Card >
                        {
                            loading==true ?<p>loding...</p>:Data.length>0?<TableAssigmentStudent data={Data} />:<Typography>No Student</Typography>
                        }
                    </Card>
                    
                </Container>
            </Page>
        </>
    )
}
