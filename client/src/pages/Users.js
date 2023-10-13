
import React, { useState, useContext } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_USERS } from '../graphql/queries';
import UserCard from '../components/UserCard';

function Users() {
  
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if(loading) return <p className='p-5'>Loading...</p>

  return (
    <>
      <div className='container p-2'>
        <div className='row flex'>
          {data &&
            data.allUsers.map((u) => (
              <UserCard key={`card-${u._id}`} user={u} />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Users;
