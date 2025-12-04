import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const getToken = () =>{
  if(!localStorage.getItem('token')){
    return false;
  }
  return true;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return getToken() ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;