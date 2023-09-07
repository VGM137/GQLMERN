import React, { useContext, useState, useEffect } from 'react';
import { Route, Link, Outlet, Navigate} from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PrivateRoute = ({children, ...rest}) => {
  const {state} = useContext(AuthContext)  

  return state.user ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute;
  /*  const navLinks = () => {
     <nav>
       <ul>
         <li>
           <Link className='nav-link' to='/update/profile'>
             Profile
           </Link>
         </li>
         <li>
           <Link className='nav-link' to='/update/password'>
             Password
           </Link>
         </li>
         <li>
           <Link className='nav-link' to='/create/post'>
             Post
           </Link>
         </li>
       </ul>
     </nav>
   } */
 
   /* const renderContent = () => (
     <div className='container-fluid pt-5'>
       <div className='row'>
         <div className='col-md-4'>
           {navLinks()}
         </div>
         <div className='col-md-8'>
           <Route {...rest} />
         </div>
       </div>
     </div>
   ) */