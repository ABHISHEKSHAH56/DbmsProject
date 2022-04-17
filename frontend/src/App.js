// routes
import Router from './routes';
import React from 'react'
// theme
import react ,{ useContext } from 'react'

import { authContext } from './hooks/AuthContext';
import { Navigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function App() {
  const { auth } = useContext(authContext);
  const {loading}=auth
  if(loading)
  {
    return <p>loading......</p>
  }
  
  

  if (auth.data===null) {
    return (
      
      <Navigate to="/login" />
   
    );
  }
  console.log(auth.data.role)
  return (
    
      <Router role={auth.data.role} />
  );
}
