import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getBooks, read, listRelated } from "./apiCore";
import Card from "./Card";

const Book = props => {
  const [book, setBook] = useState({});
  const [relatedBook, setRelatedBook] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleBook = bookId => {
    read(bookId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setBook(data);
        // Then we can fetch related books
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedBook(data);
            console.log(setRelatedBook(data));
          }
        });
      }
    });
  };

  useEffect(() => {
    const bookId = props.match.params.bookId;
    loadSingleBook(bookId);
  }, [props]);

  return (
    <Layout
      title={book && book.name}
      description={
        book && book.description && book.description.substring(0, 100)
      }
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-8'>
          {book && book.description && (
            <Card book={book} showViewBookButton={false} />
          )}
        </div>
        <div className='col-4'>
          <h4>Related Books</h4>
          {relatedBook.map((book, i) => (
            <div className='mb-3'>
              <Card key={i} book={book} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Book;
