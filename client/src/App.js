
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import Home from './pages/Home';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

function App() {

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
