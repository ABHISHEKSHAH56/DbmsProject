import { Container, Stack, Typography, Card, Scrollbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { detailsCourse } from 'src/API';
import Page from 'src/components/Page';
import TableStudent from 'src/components/TableStudent';

export default function StudentList() {
    let { courseId } = useParams();
    console.log(courseId)
    const [Data, setData] = useState(null)
    useEffect(() => {
        async function fetchdata () {
        await detailsCourse(courseId).then((res)=>{
            const {students}=res.data
            setData(students)
            console.log(students)
            
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
                            Student
                        </Typography>
                    </Stack>
                    <Card >
                        {
                            Data===null ?<p>loding...</p>:Data.length>0?<TableStudent data={Data} />:<Typography>No Student</Typography>
                        }
                    </Card>
                </Container>
            </Page>
        </>
    )
}
