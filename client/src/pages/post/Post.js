import React, { useState } from "react";
import {toast} from 'react-toastify'
import { useQuery, useMutation } from "@apollo/client";
import FileUpload from "../../components/FileUpload";
import UploadedImages from "../../components/UploadedImages";
import PostCard from "../../components/PostCard";
import { POST_CREATE, POST_DELETE } from "../../graphql/mutations";
import { POSTS_BY_USER } from "../../graphql/queries";

const initialState = {
  content: '',
  image: {
    url: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=Post',
    public_id: '123'
  }
}

const Post = () => {
  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const { data: posts } = useQuery(POSTS_BY_USER)

  const {content, image } = values

  const [postCreate] = useMutation(POST_CREATE, {
    update: (cache, {data: {postCreate}}) => {
      // Read Query from Cache
      const {postByUser} = cache.readQuery({
        query: POSTS_BY_USER  
      })
      // Write Query to Cache
      cache.writeQuery({
        query: POSTS_BY_USER,
        data: {
          postByUser: [postCreate, ...postByUser]
        }
      })
    },
    error: error => console.log(error)
  })

  const [postDelete] = useMutation(POST_DELETE, {
    update: ({data}) => {
      console.log('DELETE', data)
      toast.error('Post deleted')
    },
    onError: (err) => {
      console.log(err)
      toast.error('Post deletion failed')
    }
  })

  const handelDelete = async postId => {
    let answer = window.confirm('Delete?')
    if(answer){
      setLoading(true)
      postDelete({
        variables: {postId},
        refetchQueries: [{query: POSTS_BY_USER}]
      })
  
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    postCreate({variables: {input: values}})
    setValues(initialState)
    setLoading(false)
    toast.success('Post Created')
  }

  const handleChange = (e) => {
    e.preventDefault()
    setValues({...values, [e.target.name]: e.target.value})
  }

  const createForm = () => (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={handleChange}
        name="content"
        rows={'10'}
        className="md-textarea form-control"
        placeholder="Write"
        maxLength={'150'}
        disabled={loading}
      >
      </textarea>
      <button className="btn btn-primary mt-5" type="submit" disabled={loading || !content}>Post</button>
    </form>
  )

  return (
    <div className="container p-5">
      <div>
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4 className="">Create</h4>}
        <FileUpload values={values} loading={loading} setValues={setValues} setLoading={setLoading} singleUpload={true} />
        <UploadedImages values={values} loading={loading} setValues={setValues} setLoading={setLoading} singleUpload={true} />
        {createForm()}
        <hr />
        <div className='row'>
          {posts &&
            posts.postByUser.map((p, i) => (
              <PostCard key={`post-${i}`} p={p} handelDelete={handelDelete} updatable={true} deletable={true} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Post;