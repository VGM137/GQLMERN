import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { app, googleAuth } from "../../firebase";
import { useMutation } from "@apollo/client"
import AuthForm from "../../components/forms/AuthForm";
import { USER_CREATE } from "../../graphql/mutations";

const Login = () => {

  const {dispatch} = useContext(AuthContext)

  const [email, setEmail] = useState('victorgestaltung@gmail.com')
  const [password, setPassword] = useState('123456789')
  const [loading, setLoading] = useState(false)

  const auth = getAuth()

  let history = useNavigate()

  const [userCreate] = useMutation(USER_CREATE)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      await signInWithEmailAndPassword(auth, email, password)
        .then(async result => {
          const {user} = result
          const idTokenResult = await user.getIdTokenResult(true)

          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {email: user.email, token: idTokenResult.token}
          })

          userCreate()
          history('/profile')
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
      const credential = await GoogleAuthProvider.credentialFromResult(result);
      const {user} = result
      const idTokenResult = await user.getIdTokenResult(true)

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {email: user.email, token: idTokenResult.token}
      })

      await userCreate()
      history('/profile')
    }).catch((error) => {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    });
  }

  return(
    <div className="container">
      <div className="row p-3">
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4 className="">Login</h4>}
        <button onClick={googleLogin} className='btn btn-raised btn-danger btn-primary col-3 mt-5' disabled={!email || !password || loading} >Login with google</button>
        <AuthForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} loading={loading} handleSubmit={handleSubmit} showPasswordInput={true} />
        <Link className="text-danger float-right" to={'/password/forgot'}>
          Forgot password
        </Link>
      </div>
    </div>
  )
}

export default Login