import React from "react";

const Image = ({image}) => {
  return (
    <img 
      src={image.url} 
      key={image.public_id} 
      alt={image.public_id} 
      height={100} 
      className="float-right" 
      loading="lazy"
    >
    </img>
  )
}

export default Image