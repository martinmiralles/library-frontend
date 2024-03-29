import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className='book-img'>
    <img
      src={`${API}/${url}/image/${item._id}`}
      alt={item.name}
      className='mb-3'
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
  </div>
);

export default ShowImage;
