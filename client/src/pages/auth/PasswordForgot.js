import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import AuthForm from "../../components/forms/AuthForm";

const PasswordForgot = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmail('')
        setLoading(false)
        toast.success(`Email is sent to ${email}`)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false)
        toast.error(`${errorMessage}`)
      });
  }

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Forgot password</h4>}

      <AuthForm 
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default PasswordForgot;