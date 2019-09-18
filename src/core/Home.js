import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getBooks } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [booksByLoans, setBooksByLoans] = useState([]);
  const [error, setError] = useState(false);

  const loadBooksByLoans = () => {
    getBooks("loaned").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setBooksByLoans(data);
      }
    });
  };

  // runs when 1st loading and when changes are made
  useEffect(() => {
    loadBooksByLoans();
  }, []);

  return (
    <Layout
      title='Home Page'
      description='Node Library App'
      className='container-fluid'
    >
      <Search></Search>
      <h2 className='mb-4'>Popular Titles</h2>
      <div className='row'>
        {booksByLoans.map((book, i) => (
          <div key={i} className='col-4 mb-3'>
            <Card book={book} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
