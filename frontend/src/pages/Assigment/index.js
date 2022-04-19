import React from 'react'
import CourseDialog from 'src/components/Coursedialog'
import Button from '@mui/material/Button';

export default function Assigment() {
  const [open, setOpen] = React.useState(true);
  
  return (
    <>
    {
      !open===true?<Button onClick={()=>setOpen(true)} >Select the course</Button>:<CourseDialog props="assigment" open={open} setOpen={setOpen} />
    }
    </>
  )
}
