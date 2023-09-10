import React, { useState } from "react";
import { getAuth, updatePassword, getASecureRandomPassword } from "firebase/auth";
import { toast } from "react-toastify";
import AuthForm from "../../components/forms/AuthForm";

const PasswordUpdate = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    const user = getAuth().currentUser;
    console.log(user)
    /* const newPassword = getASecureRandomPassword(); */
    
    updatePassword(user, password)
      .then(() => {
        setLoading(false)
        toast.success('Password updated')
        // Update successful.
      }).catch((error) => {
        console.log(error)
        setLoading(false)
        toast.error(error.message)
      });
  }

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Password update</h4>}

      <AuthForm 
        password={password} 
        setPassword={setPassword} 
        loading={loading} 
        handleSubmit={handleSubmit}
        showPasswordInput={true}
        hideEmailInput={true}
      />
    </div>
  )
}

export default PasswordUpdate;