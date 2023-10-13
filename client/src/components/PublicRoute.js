import React, { useContext } from 'react';
import { Outlet, Navigate} from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PublicRoute = ({children, ...rest}) => {
  const {state} = useContext(AuthContext)

  return state.user ? <Navigate to={'/'} /> : <Outlet /> 
}

export default PublicRoute;