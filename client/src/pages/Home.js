
import React, { useState, useContext } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

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
  const [fetchPost, { data: postsData, loading: loadingData, error: dataError }] = useLazyQuery(GET_ALL_POSTS)

  const {state, dispatch} = useContext(AuthContext)
  let history = useNavigate()

  const updateUserName = () => {
    dispatch({
      type:  "LOGGED_IN_USER",
      payload: 'Victor Garza'
    })
  }

  if(loading) return <p className='p-5'>Loading...</p>


  return (
    <>
      <div className='container p-2'>
        <div className='row'>
          {data.allPosts.map((p) => (
            <div className='col-md-4 mb-2' key={p.id}>
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
        <div className='row p-2'>
          <button onClick={(e) => fetchPost()} className='btn btn-primary col-3 m-1'>Fetch posts</button>
        </div>
        {JSON.stringify(postsData)}
        {JSON.stringify(state.user)}
        <div className='row p-2'>
          <button onClick={(e) => updateUserName()} className='btn btn-primary col-4 m-1'>Change user name</button>
        </div>
        {JSON.stringify(history)}
      </div>
    </>
  );
}

export default Home;
