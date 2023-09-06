
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import PasswordForgot from './pages/auth/PasswordForgot';
import CompleteRegistration from './pages/auth/CompleteResgistration';
import { AuthContext } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  
  const { state } = useContext(AuthContext)
  const { user } = state

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  });

  const authLink = setContext((_, { headers }) => {
    const token = user ? user.token : ''
    return {
      headers: {
        ...headers,
        authtoken: token
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <ToastContainer />
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/complete-registration' element={<CompleteRegistration />} />
        <Route path='/' element={<PrivateRoute />} >
          <Route path='/' element={<Home/>}/>
          <Route exact path='/password/forgot' element={<PasswordForgot />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
