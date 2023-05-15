import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, updatePassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { AuthContext } from "../../context/authContext";

const CompleteRegistration = () => {

  const { dispatch } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const auth = getAuth();
  let history = useNavigate()

  useEffect(() => {
      setEmail(window.localStorage.getItem('emailForSignIn') ? window.localStorage.getItem('emailForSignIn') : '' )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(!email || !password){
      toast.error('Email and password is required')
      return
    }
    
    try{
      if(isSignInWithEmailLink(auth, window.location.href)){
        let result = await signInWithEmailLink(auth, email, window.location.href)
        console.log(result)
        if(result.user.emailVerified){
          window.localStorage.removeItem('emailForSignIn')

          let user = auth.currentUser
          await updatePassword(user, password)

          const idTokenResult = await user.getIdTokenResult()
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: { emal: user.email, token: idTokenResult.token }
          })

          toast.success(`User email ${user.email} succesfully verified`)

          history('/')
        }
      }
    }catch(error){
      console.log('Register compete error', error.message)
      setLoading(false)
      toast.error(error.message)
    }
  }

  return(
    <div className="container">
      <div className="row p-3">
        {loading ? <h4 className="text-danger">Loading...</h4> : <h4 className="">Complete registration</h4>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="m-1">Email address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control col-3 col-m-3 m-0" 
              placeholder="Enter email" 
              disabled />
          </div>
          <div className="form-group">
            <label className="m-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control col-3 col-m-3 m-0" 
              placeholder="Enter password" 
              disabled={loading} />
          </div>
          <button className='btn btn-primary col-3 mt-5' disabled={!email || loading} >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CompleteRegistration

/* eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ3FsbWVybjEzNyIsImF1ZCI6ImdxbG1lcm4xMzciLCJhdXRoX3RpbWUiOjE2ODM3OTE0NzQsInVzZXJfaWQiOiJmeXZieDZKcXlSZmgzTVlQZUw3QVE1djBVMXUxIiwic3ViIjoiZnl2Yng2SnF5UmZoM01ZUGVMN0FRNXYwVTF1MSIsImlhdCI6MTY4Mzc5MTQ3NCwiZXhwIjoxNjgzNzk1MDc0LCJlbWFpbCI6InZpY3Rvcmdlc3RhbHR1bmdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidmljdG9yZ2VzdGFsdHVuZ0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.CpXnh4QKVR-6id4R49tTS6G5IokHbTHmdwhwc1cf6ptSjsrcHX6ZSN4wQpEninxR4vbVccfdUwZ3PFj1wK35Iat5_cu3roqqE34MON_taa8bAr3hSWsLl2NkjBeuvHVjRFINB-fyc7wGVL5cyYfUmqdlw0CPTPiNOfSeGFx4pfbB39HILULP-EUQiGykPtVZG5lxpI0n1V-yRiNdHPa2hZgbL1t7OZvMwAhCUCKzoug8C5D2m4mReMgqrVevmiUIWQ7pZZSQKQ9Jwf90UYTzhI8FJfUwW4kdVJ0ioirn5vOFDAOs5wRVDzKjD0lLNAH9AsXRtlJXaeFZgIOidc_ONA */