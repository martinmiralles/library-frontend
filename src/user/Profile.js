import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  //  state
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false
  });

  // destructuring
  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = userId => {
    // console.log(userId);
    read(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  // 1st the name is grabbed, and then the event
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = e => {
    e.preventDefault();
    //technically 3 parameters, since 'name', 'email', and 'password' will be an object
    update(match.params.userId, token, { name, email, password }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true
          });
        });
      }
    });
  };

  const redirectUser = success => {
    if (success) {
      return <Redirect to='/user/dashboard' />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          onChange={handleChange("name")}
          className='form-control'
          value={name}
        ></input>
      </div>

      <div className='form-group'>
        <label>Email</label>
        <input
          type='email'
          onChange={handleChange("email")}
          className='form-control'
          value={email}
        ></input>
      </div>

      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          onChange={handleChange("password")}
          className='form-control'
          value={password}
        ></input>
      </div>

      <button onClick={clickSubmit} className='btn btn-primary'>
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title='Profile'
      description='Update your profile'
      className='container-fluid'
    >
      <h2 className='mb-4'>Profile Update</h2>
      {/* {JSON.stringify(values)} */}
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
