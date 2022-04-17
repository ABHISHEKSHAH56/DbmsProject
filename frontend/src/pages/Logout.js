import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { authContext } from '../hooks/AuthContext';



  

export default function Logout({ children }) {
    const { setAuthData } = useContext(authContext);
    const navigate =useNavigate()
    useEffect(() => {
        setAuthData(null);
        navigate("/");
      
    }, []);
    
  return (
    <>{children}</>
  )
}
