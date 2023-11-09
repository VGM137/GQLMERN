import React from "react";
import Image from "./Image";
import { useNavigate, Link } from 'react-router-dom';

const PostCard = ({p, handelDelete = (f) => f, updatable=false, deletable=false}) => {
  let history = useNavigate()

  return (
    <div className='col-md-4 mb-2' key={p._id}>
      <div className='card'>
        <div className='card-body'>
          <div className='card-title'>
            <h4>{p.postedBy.username}</h4>
          </div>
          <Link to={`/post/${p._id}`} >
            <Image height={80} image={p.image}/>
          </Link>
          <p className='card-text'>{p.content}</p>
          <div className="d-flex justify-content-between">
            {updatable && <button className="btn btn-warning" onClick={() => history(`/post/update/${p._id}`)}>Update</button>}
            {deletable && <button className="btn btn-danger" onClick={() => handelDelete(p._id)} >Delete</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard