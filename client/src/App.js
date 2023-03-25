
import React, {useState} from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

function App() {
  const [posts, setPosts] = useState([]);
  client.query({
    query: gql`
      {
        allPosts {
          id
          title
          description
        }
      }
    `
  }).then(result => setPosts(result.data.allPosts))

  return (
    <p>Hello</p>
  );
}

export default App;
