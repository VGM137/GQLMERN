import React from "react";

const AuthForm = ({email, password = '', loading, setEmail, setPassword, handleSubmit, showPasswordInput = false}) => (
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
    <button className='btn btn-primary col-3 mt-5' disabled={!email || loading} >Submit</button>
  </form>
)

export default AuthForm