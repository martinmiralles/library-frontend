import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/";
import { Link } from "react-router-dom";
import { createCategory, createBook, getCategories } from "./apiAdmin";

const AddBook = () => {
  //State
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    image: "",
    loading: false,
    error: "",
    createdBook: "",
    redirectToProfile: false,
    formData: ""
  });

  // State values being destructured
  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    loading,
    error,
    createdBook,
    redirectToProfile,
    formData
  } = values;

  // Loads categories and sets form data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  // runs when component mounts and whenever value changes
  useEffect(() => {
    init();
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  //Destructuring
  const { user, token } = isAuthenticated();

  // when clicked, will use createBook method to make a new Book
  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createBook(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: "false",
          createBook: data.name
        });
      }
    });
  };

  // The actual form
  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Image</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange("photo")}
            type='file'
            name='image'
            accept='image/*'
          />
        </label>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange("name")}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange("description")}
          className='form-control'
          value={description}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange("price")}
          type='number'
          className='form-control'
          value={price}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select onChange={handleChange("category")} className='form-control'>
          <option>Please Select</option>

          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>

      <button className='btn-outline-primary'>Create Book</button>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-danger'
      style={{ display: createdBook ? "" : "none" }}
    >
      <h2>{`${createdBook}`} has been created </h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loassding...</h2>
      </div>
    );

  return (
    <Layout
      title='Add a New Book'
      description={`Welcome ${user.name}, ready to add a new book?`}
    >
      <div className='row'>
        <div className='col-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddBook;
