import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard";

const PUBLIC_PROFILE = gql`
  query piblicProfile($username: String!){
    publicProfile(username: $username){
      _id
      name
      username
      email
      images {
        url
        public_id
      }
      about
      createdAt
      updatedAt
    }
  }
`

const UserProfile = () => {
  
  const params = useParams()
  const {loading, data} = useQuery(PUBLIC_PROFILE, {
    variables: {username: params.username}
  })

  if(loading) return <p className='p-5'>Loading...</p>

  return (
    <div className="container mt-5">
      <UserCard user={data.publicProfile} complete={true} />
    </div>
  )
}

export default UserProfile