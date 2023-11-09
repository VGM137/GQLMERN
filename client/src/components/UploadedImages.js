import React, { useContext } from "react";
import axios from 'axios'
import { AuthContext } from "../context/authContext";
import Image from "./Image";

const UploadedImages = ({setValues, setLoading, values, loading, singleUpload = false}) => {

  const {state} = useContext(AuthContext)

  const handleImageRemove = (id) => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_RESTL_ENDPOINT}/removeimages`, {public_id:id}, {headers: {authtoken: state.user.token}},)
      .then(res => {
        setLoading(false)
        if(singleUpload){
          const {image} = values
          setValues({...values, image: {
              url: '',
              public_id: ''
            }
          })
        }else{
          const {images} = values
          let filteredImges = images.filter(item => {return item.public_id !== id})
          setValues({...values, images: filteredImges})
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <div className="row mb-3">
      {singleUpload && values.image 
        ?
          <div key={`wrapper-${values.image.public_id}`} className="" style={{width: '150px'}}>
            <Image image={values.image}/>
            <button  key={`button-${values.image.public_id}`} className="btn btn-primary mb-3" onClick={() => handleImageRemove(values.image.public_id)}>Delete</button>
          </div>
        :
          values.images.map(image => (
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