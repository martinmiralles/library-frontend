import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  // Destructuring, so we don't have to type 'data.categories, data.category, etc.'
  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  //   a higher-order function - a function that returns a function
  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} books`;
    }

    if (searched && results.length < 1) {
      return `No books found`;
    }
  };

  const searchedBooks = (results = []) => {
    return (
      <div>
        <h2 className='mt-4 mb-4'>{searchMessage(searched, results)}</h2>
        <div className='row'>
          {results.map((book, i) => (
            <Card key={i} book={book} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    //using parenthesis because it's only one element here
    <form onSubmit={searchSubmit}>
      <span className='input-group-text'>
        <div className='input-group input-group-lg'>
          <div className='input-group-prepend'>
            <select className='btn mr-2' onChange={handleChange("category")}>
              <option value='All'>All Categories</option>
              {categories.map((category, i) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type='search'
            className='form-control'
            onChange={handleChange("search")}
            placeholder='Search by Name'
          />
        </div>
        <div className='btn input-group-append' style={{ border: "none" }}>
          <button className='input-group-text'>Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className='row'>
      <div className='container mb-3'>{searchForm()}</div>
      {/* {JSON.stringify(results)} */}
      <div className='container-fluid mb-3'>{searchedBooks(results)}</div>
    </div>
  );
};

export default Search;
