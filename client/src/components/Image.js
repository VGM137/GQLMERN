import React from "react";

const Image = ({image, height = 100}) => {
  return (
    <img 
      src={image.url} 
      key={image.public_id} 
      alt={image.public_id} 
      height={height} 
      className="float-right" 
      loading="lazy"
    >
    </img>
  )
}

export default Image