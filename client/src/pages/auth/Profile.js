import React, { useState, useMemo } from "react";
import { toast } from 'react-toastify'
import { useQuery, useMutation } from "@apollo/client";
import { PROFILE } from "../../graphql/queries";
import { USER_UPDATE } from "../../graphql/mutations";
import UserProfileForm from "../../components/forms/UserProfileForm";
import FileUpload from "../../components/FileUpload";
import UploadedImages from "../../components/UploadedImages";

const Profile = () => {

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
    console.log('memo')
    if(data){
      let imagesWOType = data.profile.images.map(image => {
        return {public_id: image.public_id, url: image.url}
      })
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: imagesWOType
      })
    }
  }, [data])

  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({data}) => {
      console.log( 'USER UPDATE MUTATION IN PROFILE', data);
      toast.success('Profile updated')
    }
  })

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

  return(
    <div className="container p-5">
      <div className="col-md-12 pb-3">
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Profile</h4>}
      </div>
      <FileUpload setLoading={setLoading} setValues={setValues} loading={loading} values={values}/>
      <UploadedImages setValues={setValues} setLoading={setLoading} values={values} loading={loading} />
      <UserProfileForm {...values} handleSubmit={handleSubmit} handleChange={handleChange}/>
    </div>
  )
}

export default Profile;