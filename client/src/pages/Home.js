
import React, { useContext, useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_POSTS, TOTAL_POST } from '../graphql/queries';
import PostCard from '../components/PostCard';
import PostPagination from '../components/PostPagination';

function Home() {
  
  const [currentPage, setPage] = useState(1)
  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    variables: {page: currentPage}
  });

  const {data: postCount} = useQuery(TOTAL_POST);
  const [fetchPost, { data: postData, loading: loadingData, error: dataError }] = useLazyQuery(GET_ALL_POSTS);

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
          {data &&
            data.allPosts.map((p, i) => (
              <PostCard key={`post-${i}`} p={p}/>
            ))
          }
        </div>

        <PostPagination currentPage={currentPage} setPage={setPage} postCount={postCount} />
       
        {/* {JSON.stringify(postData)}
        {JSON.stringify(state.user)} */}
        {/* {JSON.stringify(history)} */}
      </div>
    </>
  );
}

export default Home;
