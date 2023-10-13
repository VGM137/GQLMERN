import React, { useContext, Fragment} from "react";
import Resizer from "react-image-file-resizer";
import axios from 'axios'
import { AuthContext } from "../context/authContext";

const FileUpload = ({setValues, setLoading, values, loading}) => {

  const {state} = useContext(AuthContext)

  const resizeFile = (file) => 
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

  const fileResizeAndUpload = async (e) => {
    setLoading(true)
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_RESTL_ENDPOINT}/uploadimages`,
        headers: {authtoken: state.user.token},
        data: {image: image}
      });

      let data = res.data;
      if(data){
        setLoading(false)
        const {images} = values
        let newObject = {...values, images: [...images, data]}
        setValues(newObject)
      }
    } catch (err) {
      setLoading(false)
      console.log('CLOUDINARY UPLOAD FAIL', err)
    }
  }
  return (
    <div className="col-md-3">
      <div className="form-group">
        <label className="btn btn-primary mb-3" htmlFor='uploadImage'>UploadImage</label>
        <input 
          hidden
          id="uploadImage"
          className="form-control" 
          placeholder="Image" 
          type="file" 
          accept='image/*'
          onChange={fileResizeAndUpload}>
        </input>
      </div>
    </div>
  )
}

export default FileUpload