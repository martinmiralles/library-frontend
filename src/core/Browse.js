import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredBooks } from "./apiCore";
import Checkbox from "./Checkbox";

const Browse = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  // Loads categories and sets form data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = newFilters => {
    //console.log(newFilters);
    getFilteredBooks(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    //console.log(newFilters);
    getFilteredBooks(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn-btn-warning mb-5'>
          Load More
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log(filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  return (
    <Layout
      title='Browse Books Page'
      description='Browse Books'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-4'>
          <h4>Filter by Category</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            ></Checkbox>
          </ul>
        </div>
        <div className='col-8'>
          <h2 className='mb-4'>Books</h2>
          <div className='row'>
            {filteredResults.map((book, i) => (
              <div key={i} className='col-4 mb-3'>
                <Card book={book} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
