
import React from 'react';
import { gql, useQuery } from '@apollo/react-hooks';

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  } 
`;

function Home() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if(loading) return <p className='p-5'>Loading...</p>

  return (
    <>
      <div className='container p-5'>
        <div className='row p-5'>
          {data.allPosts.map((p) => (
            <div className='col-md-4' key={p.id}>
              <div className='card'>
                <div className='card-body'>
                  <div className='card-title'>
                    <h4>{p.title}</h4>
                  </div>
                  <p className='card-text'>{p.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
