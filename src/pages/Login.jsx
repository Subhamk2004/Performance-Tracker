import React, { useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
    let isAuthenticated = false;
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, []);
    
  return (
    <div>Login</div>
  )
}

export default Login