
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import Home from './pages/Home';
import Users from './pages/Users';
import UserProfile from './components/UserProfile';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';
import Post from './pages/post/Post';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import CompleteRegistration from './pages/auth/CompleteResgistration';
import { AuthContext } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  
  const { state } = useContext(AuthContext)
  const { user } = state
  console.log(user)

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
    client ?
    <ApolloProvider client={client}>
      <ToastContainer />
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/user/:username' element={<UserProfile />} />
        <Route path='/' element={<PublicRoute user={user} />}>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/complete-registration' element={<CompleteRegistration />} />
          <Route exact path='/password/forgot' element={<PasswordForgot />} />
        </Route>
        <Route path='/' element={<PrivateRoute user={user} />} >
          <Route path='/' element={<Home/>}/>
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/post/create' element={<Post />} />
          <Route exact path='/password/update' element={<PasswordUpdate />} />
        </Route>
      </Routes>
    </ApolloProvider>
    :
    <>
      <div>Loading...</div>
    </>
    
  );
}

export default App;
