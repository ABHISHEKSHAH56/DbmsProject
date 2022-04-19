// routes
import Router from './routes';
import React, { useEffect, useState,useContext } from 'react'
// theme

import { authContext } from './hooks/AuthContext';
import { Navigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function App() {
  const { auth } = useContext(authContext);
  const [data, setdata] = useState(auth)
  useEffect(() => {
    setdata(auth)
  }, [auth])
  
  const {loading}=data
  if(loading)
  {
    return <p>loading......</p>
  }
  
  

  if (data.data===null) {
    return (
      
      <Navigate to="/login" />
   
    );
  }
  console.log(data.data.role)
  return (
    
      <Router role={data.data.role} />
  );
}
