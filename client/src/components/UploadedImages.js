import React, { useContext } from "react";
import axios from 'axios'
import { AuthContext } from "../context/authContext";
import Image from "./Image";

const UploadedImages = ({setValues, setLoading, values, loading}) => {

  const {state} = useContext(AuthContext)
  const {images} = values

  const handleImageRemove = (id) => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_RESTL_ENDPOINT}/removeimages`, {public_id:id}, {headers: {authtoken: state.user.token}},)
      .then(res => {
        setLoading(false)
        let filteredImges = images.filter(item => {return item.public_id !== id})
        setValues({...values, images: filteredImges})
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <div className="row mb-3">
      {images.map(image => (
          <div key={`wrapper-${image.public_id}`} className="" style={{width: '150px'}}>
            <Image image={image}/>
            <button  key={`button-${image.public_id}`} className="btn btn-primary mb-3" onClick={() => handleImageRemove(image.public_id)}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default UploadedImages