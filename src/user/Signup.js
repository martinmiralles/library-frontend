import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth/index";

const Signup = () => {
  // Handles the state - changes as the input fields changes
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, success, error } = values;

  // this function will return another function
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault(); //prevents browser from reloading on button-click
    setValues({ ...values, error: false });
    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label htmlFor='' className='text-muted'>
          Name
        </label>
        <input
          onChange={handleChange("name")}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='' className='text-muted'>
          Email
        </label>
        <input
          onChange={handleChange("email")}
          type='email'
          className='form-control'
          value={email}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='' className='text-muted'>
          Password
        </label>
        <input
          onChange={handleChange("password")}
          type='password'
          className='form-control'
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>
        Submit
      </button>
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
      className='alert alert-info'
      style={{ display: success ? "" : "none" }}
    >
      New account has been created. Please <Link to='/signin'>sign in.</Link>
    </div>
  );

  return (
    <Layout
      title='Signup'
      description='Signin to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
      {/* Tests the state-changes in real-time */}
      {/* {JSON.stringify(values)} */}
    </Layout>
  );
};

export default Signup;
