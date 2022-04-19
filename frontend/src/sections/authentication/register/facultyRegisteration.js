import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography"
import { FacultyRegister } from 'src/API';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { authContext } from 'src/hooks/AuthContext';






export default function FacultyForm() {
  const alert =useAlert();
  const navigate = useNavigate();
  const { setAuthData } = React.useContext(authContext);
  
  React.useEffect(() => {
    
    async function data(){
      const pata={
        department:[]

      }
      await FacultyRegister(pata).then((res)=>
      { console.log(res.data)        
        setAuthData(res.data.user);
        alert.success("Successfully registered")
        navigate("/");})
      .catch((err)=> {
        console.log(err);
      })
    }
    data()
    
  });
  

  
  return (
    <div>
      <Box sx={{ mb: 5 }}>
            <Typography variant="p" gutterBottom>
             Loding......
            </Typography>
          </Box>
      
    </div>
  );
}
