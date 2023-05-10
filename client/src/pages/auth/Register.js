import React, {useState} from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from "../../firebase";

const Register = () => {

  const [email, setEmail] = useState()
  const [loading, setLoading] = useState(false)

  const auth = getAuth(app);
  const actionCodeSettings = {
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    handleCodeInApp: true
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then((data) => {
        console.log(data)
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        setEmail('')
        setLoading(false)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }

  return(
    <div className="container">
      <div className="row p-3">
        <h4 className="">Register</h4>
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