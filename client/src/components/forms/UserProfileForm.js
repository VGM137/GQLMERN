import React from "react";

const UserProfileForm = ({handleSubmit, handleChange, username, name, email, about, loading}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input 
          className="form-control" 
          placeholder="Username" 
          type="text" 
          name="username" 
          value={username || ''} 
          onChange={handleChange} 
          disabled={loading}>
          </input>
      </div>
      <div className="form-group">
        <label>Name</label>
        <input 
          className="form-control" 
          placeholder="Name" 
          type="text" 
          name="name" 
          value={name || ''} 
          onChange={handleChange} 
          disabled={loading}>
          </input>
      </div>
      <div className="form-group">
        <label>E-mail</label>
        <input 
          className="form-control" 
          placeholder="Name" 
          type="email" 
          name="email" 
          value={email || ''} 
          onChange={handleChange} 
          disabled={loading}>
          </input>
      </div>
      <div className="form-group">
        <label>About</label>
        <textarea 
          className="form-control" 
          placeholder="About" 
          name="about" 
          value={about || ''} 
          onChange={handleChange} 
          disabled={loading}>
          </textarea>
      </div>

      <button className="btn btn-primary mt-3" type="submit" disabled={!email || loading}>Submit</button>
    </form>
  )
}

export default UserProfileForm