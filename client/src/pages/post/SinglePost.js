import React, {useState, useMemo, useEffect} from "react";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SINGLE_POST } from "../../graphql/queries";
import PostCard from "../../components/PostCard";

const SinglePost = () => {
  const [values, setValues] = useState({
    content: '',
    image: {
      url: '',
      public_id: ''
    },
    postedBy: {}
  })
  const [getSinglePost, {data: singlePost}] = useLazyQuery(SINGLE_POST);

  const { postid } = useParams();

  useMemo(() => {
    if (singlePost) {
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        content: singlePost.singlePost.content,
        image: singlePost.singlePost.image,
        postedBy: {}
      })
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({variables: {postId: postid}})
  }, []);


  return(
    <div className="container p-5">
      <PostCard p={values}/>
    </div>
  )
}

export default SinglePost