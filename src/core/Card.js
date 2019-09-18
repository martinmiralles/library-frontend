import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, removeItem } from "./itemHelpers";

const Card = ({
  book,
  showViewBookButton = true,
  showSaveItemButton = true,
  showRemoveItemButton = false
}) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = showViewBookButton => {
    return (
      showViewBookButton && (
        <Link to={`/book/${book._id}`} className='mr-2'>
          <button className='btn btn-outline-primary mt-2 mr-2 mb-2'>
            View Book
          </button>
        </Link>
      )
    );
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to='/savedItems' />;
    }
  };

  const saveItem = () => {
    addItem(book, () => {
      setRedirect(true);
    });
  };

  const showSaveItem = () => {
    return (
      showSaveItemButton && (
        <button
          onClick={saveItem}
          className='btn btn-outline-warning mt-2 mb-2'
        >
          Save Item
        </button>
      )
    );
  };

  const showRemoveButton = showRemoveItemButton => {
    return (
      showRemoveItemButton && (
        <button
          onClick={() => removeItem(book._id)}
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Remove Book
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>Available</span>
    ) : (
      <span className='badge badge-primary badge-pill'>Unavailable</span>
    );
  };

  return (
    <div className='card'>
      <div className='card-header name'>{book.name}</div>
      <div className='card-body'>
        {shouldRedirect(redirect)}
        <ShowImage item={book} url='book' />
        <p className='lead mt-2'>{book.description.substring(0, 100)}</p>
        <p className='black-10'>${book.price}</p>
        <p className='black-9'>
          Category: {book.category && book.category.name}
        </p>
        <p className='black-8'>Add on {moment(book.createdAt).fromNow()}</p>

        {showStock(book.quantity)}
        <br></br>

        {showViewButton(showViewBookButton)}

        {showSaveItem(showSaveItemButton)}

        {showRemoveButton(showRemoveItemButton)}
      </div>
    </div>
  );
};

export default Card;
