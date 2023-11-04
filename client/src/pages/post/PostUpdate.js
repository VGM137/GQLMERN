import React, {useState, useMemo, useEffect} from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SINGLE_POST } from "../../graphql/queries";
import { POST_UPDATE } from "../../graphql/mutations";
import FileUpload from "../../components/FileUpload";
import UploadedImages from "../../components/UploadedImages";

const PostUpdate = () => {
  const [values, setValues] = useState({
    content: '',
    image: {
      url: '',
      public_id: ''
    }
  })
  const [getSinglePost, {data: singlePost}] = useLazyQuery(SINGLE_POST);
  const [postUpdate] = useMutation(POST_UPDATE)

  const [loading, setLoading] = useState(false);
  const { postid } = useParams();

  const { content, image } = values

  useMemo(() => {
    if (singlePost) {
      console.log(singlePost)
      let imagesWOType = {
        url: singlePost.singlePost.image.url,
        public_id: singlePost.singlePost.image.public_id
      }
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        content: singlePost.singlePost.content,
        image: imagesWOType,
      })
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({variables: {postId: postid}})
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)  
    postUpdate({variables: { input: values }});
    setLoading(false)
    toast.success('Post Updated')
  }
  
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const updateForm = () => (
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

  return(
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4 className="">Update</h4>}
      
      <FileUpload values={values} loading={loading} setValues={setValues} setLoading={setLoading} singleUpload={true} />
      <UploadedImages values={values} loading={loading} setValues={setValues} setLoading={setLoading} singleUpload={true} />
      {updateForm()}
      
    </div>
  )
}

export default PostUpdate