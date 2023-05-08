
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

function App() {

  return (
    <ApolloProvider client={client}>
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
