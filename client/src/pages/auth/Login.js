import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { app, googleAuth } from "../../firebase";


const Login = () => {

  const {dispatch} = useContext(AuthContext)

  const [email, setEmail] = useState('victorgestaltung@gmail.com')
  const [password, setPassword] = useState('12345678')
  const [loading, setLoading] = useState(false)

  const auth = getAuth()

  let history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      await signInWithEmailAndPassword(auth, email, password)
        .then(async result => {
          console.log(result)
          const {user} = result
          const idTokenResult = user.getIdTokenResult()

          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {email: user.email, token: idTokenResult.token}
          })

          history('/')
        })

    }catch(error){
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  const googleLogin = (e) => {
  signInWithPopup(auth, googleAuth)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(credential)
      console.log(result)

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {email: user.email, token: token}
      })

      history('/')
    }).catch((error) => {
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error)
      console.log(credential)
      toast.error(error.message)
      setLoading(false)
    });
  }

  return(
    <div className="container">
      <div className="row p-3">
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4 className="">Login</h4>}
        <button onClick={googleLogin} className='btn btn-raised btn-danger btn-primary col-3 mt-5' disabled={!email || !password || loading} >Login with google</button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control" 
              placeholder="Enter email" 
              disabled={loading} />
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control" 
              placeholder="Enter email" 
              disabled={loading} />
          </div>
          <button className='btn btn-primary col-3 mt-5' disabled={!email || !password || loading} >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login