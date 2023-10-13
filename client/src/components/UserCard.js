import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const UserCard = ({user, complete=false}) => {
  const {username, images, about} = user

  return (
    <div className={`user-card me-2 card text-center ${complete ? 'col-12' : 'col-3'}` }>
      <div className="card-body">
        <div className='user-card__image' >
          <Image image={images[0]}/>
        </div>
        <Link to={`/user/${username}`}>
          <h4 className="text-primary">@{username}</h4>
        </Link>
        <hr/>
        <small>{about}</small>
      </div>
    </div>

  )
}

export default UserCard