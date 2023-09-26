import React, { useState, useMemo, Fragment, useContext } from "react";
import { toast } from 'react-toastify'
import Resizer from "react-image-file-resizer";
import axios from 'axios'
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation } from "@apollo/client";
import { PROFILE } from "../../graphql/queries";
import { USER_UPDATE } from "../../graphql/mutations";

const Profile = () => {
  const {state} = useContext(AuthContext)
  const [values, setValues] = useState({
    username: '',
    name: '', 
    email: '',
    about: '',
    images: []
  })
  const [loading, setLoading] = useState(false)

  const {data} = useQuery(PROFILE)

  useMemo(() => {
    if(data){
      const images = data.profile.images.map(image => {
        return {public_id: image.public_id, url: image.url}
      })
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: images
      })
    }
  }, [data])

  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({data}) => {
      console.log( 'USER UPDATE MUTATION IN PROFILE', data);
      toast.success('Profile updated')
    }
  })

  const { username, name, email, about, images } = values

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    setLoading(true)
    userUpdate({variables: {input: values}})
    setLoading(false)
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value})
  }

  const fileResizeAndUpload = (e) => {
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          e.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            axios.post(
              `${process.env.REACT_APP_RESTL_ENDPOINT}/uploadimages`, 
              { image: uri },
              {
                headers: {
                  authtoken: state.user.token
                }
              }
            ).then(res => {
              setLoading(false)
              console.log('CLOUDINARY UPLOAD', res)
              setValues({...values, images: [...images, res.data]})
              console.log(values)
            }).catch(error => {
              setLoading(false)
              console.log('CLOUDINARY UPLOAD FAIL', error)
            })
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }

  }

  const profielUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input 
          className="form-control" 
          placeholder="Username" 
          type="text" 
          name="username" 
          value={username || ''} 
          onChange={handleChange} 
          disabled={loading}>
          </input>
      </div>
      <div className="form-group">
        <label>Name</label>
        <input 
          className="form-control" 
          placeholder="Name" 
          type="text" 
          name="name" 
          value={name || ''} 
          onChange={handleChange} 
          disabled={loading}>
          </input>
      </div>
      <div className="form-group">
        <label>E-mail</label>
        <input 
          className="form-control" 
          placeholder="Name" 
          type="email" 
          name="email" 
          value={email || ''} 
          onChange={handleChange} 
          disabled={loading}>
          </input>
      </div>
      <div className="form-group">
        <label>About</label>
        <textarea 
          className="form-control" 
          placeholder="About" 
          name="about" 
          value={about || ''} 
          onChange={handleChange} 
          disabled={loading}>
          </textarea>
      </div>
      <div className="form-group">
        <label>Image</label>
        <input 
          className="form-control" 
          placeholder="Image" 
          type="file" 
          accept='image/*'
          onChange={fileResizeAndUpload}>
        </input>
      </div>

      <button className="btn btn-primary mt-3" type="submit" disabled={!email || loading}>Submit</button>
    </form>
  )

  return(
    <div className="container p-5">
      {profielUpdateForm()}
    </div>
  )
}

export default Profile;