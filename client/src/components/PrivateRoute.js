import React, { useContext } from 'react';
import { Outlet, Navigate} from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({children, ...rest}) => {
  const {state} = useContext(AuthContext)  

  return state.user ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute;