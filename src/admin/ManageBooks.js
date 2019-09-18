import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/";
import { Link } from "react-router-dom";
import { getBooks, deleteBook } from "./apiAdmin";

const ManageBooks = () => {
  // State
  const [books, setBooks] = useState([]);

  const { user, token } = isAuthenticated();

  const loadBooks = () => {
    getBooks().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBooks(data);
      }
    });
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const destroy = bookId => {
    deleteBook(bookId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadBooks();
      }
    });
  };

  return (
    <Layout
      title='Manage Books'
      description='CRUD for Books'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>Total Books: {books.length}</h2>
          <hr />
          <ul className='list-group'>
            {books.map((book, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{book.name}</strong>

                <Link to={`/admin/book/update/${book._id}`}>
                  <span className='badge badge-warning badge-pill align-items-right'>
                    Update
                  </span>
                </Link>

                <button
                  onClick={() => destroy(book._id)}
                  className='badge badge-danger badge-pill'
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageBooks;
