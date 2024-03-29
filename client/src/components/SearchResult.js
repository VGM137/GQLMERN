import React from "react";
import { useParams } from 'react-router-dom'
import { useQuery } from "@apollo/client";
import { SEARCH } from "../graphql/queries";
import PostCard from "./PostCard";

const SearchResult = () => {
  const { query } = useParams()

  const {data, loading} = useQuery(SEARCH, {
    variables: { query }
  })
  
  if(loading) return (
    <div className="container text-center">
      <p className="text-danger p-5">Loading...</p>
    </div>
  )
  if(!data.search.length) return (
    <div className="container text-center">
      <p className="text-danger p-5">No results...</p>
    </div>
  )

  return (
    <div className="container">
      <div className="row py-5">
        {data.search.map((post, i) => (
          <PostCard key={post._id} p={post} />
        ))}
      </div>
    </div>
  )
}

export default SearchResult