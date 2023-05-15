import React, {useState} from "react";
import { toast } from 'react-toastify';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from "../../firebase";

const Register = () => {

  const [email, setEmail] = useState('victorgestaltung@gmail.com')
  const [loading, setLoading] = useState(false)
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const auth = getAuth();
  const actionCodeSettings = {
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    handleCodeInApp: true
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then((data) => {
        toast.success(`Email is sent to ${email}. Click the link to complete registration`, options)
        window.localStorage.setItem('emailForSignIn', email);
        setEmail('')
        setLoading(false)
      })
      .catch((error) => {
        console.log('error')
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Sorry, there was an error: ${errorCode} - ${errorMessage}`, options)
        setEmail('')
        setLoading(false)
      });
  }

  return(
    <div className="container">
      <div className="row p-3">
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4 className="">Register</h4>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="m-1">Email address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control col-3 col-m-3 m-0" 
              placeholder="Enter email" 
              disabled={loading} />
          </div>
          <button className='btn btn-primary col-3 mt-5' disabled={!email || loading} >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register