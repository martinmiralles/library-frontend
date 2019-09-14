import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth/index";

const Signin = () => {
  // Handles the state - changes as the input fields changes
  const [values, setValues] = useState({
    email: "test@gmail.com",
    password: "test123",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  // this function will return another function
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault(); //prevents browser from reloading on button-click
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
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

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  return (
    <Layout
      title='Signup'
      description='Signin to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showLoading()}
      {showError()}

      {signUpForm()}
      {/* Tests the state-changes in real-time */}
      {/* {JSON.stringify(values)} */}

      {redirectUser()}
    </Layout>
  );
};

export default Signin;
