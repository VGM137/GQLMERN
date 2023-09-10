import React from "react";

const AuthForm = ({email = '', password = '', loading, setEmail = (f) => f, setPassword, handleSubmit, showPasswordInput = false, hideEmailInput = false }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      {!hideEmailInput &&
        <>
          <label>Email address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="form-control" 
            placeholder="Enter email" 
            disabled={loading} />
        </>
      }
      {showPasswordInput &&
        <>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="form-control" 
            placeholder="Enter email" 
            disabled={loading} />
        </>
      }
    </div>
    <button className='btn btn-primary col-3 mt-5' disabled={loading} >Submit</button>
  </form>
)

export default AuthForm