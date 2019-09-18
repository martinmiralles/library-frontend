import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import {
  getBooks,
  getBraintreeClientToken,
  processLoan,
  createLoan
} from "./apiCore";
import { emptySavedItems } from "./itemHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Reserve = ({ books }) => {
  // State
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  ////////////////////
  // RESERVE BUTTON //
  ////////////////////

  const reserveBtn = () => {
    // processLoan(userId, token)
    //   .then(response => {
    //     // console.log(response);

    const createLoanData = {
      books: books
    };
    createLoan(userId, token, createLoanData);
    setData({ ...data, success: true });

    emptySavedItems(() => {
      console.log("Reservation successfully - emptying cart");
    });
    // })
    // .catch(error => console.log(error));
  };

  const showReserve = () => {
    return isAuthenticated() ? (
      <button onClick={reserveBtn} className='btn btn-success btn-block'>
        Reserve
      </button>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to reserve books</button>
      </Link>
    );
  };

  const showSuccess = success => (
    <div
      className='alert alert-info'
      style={{ display: success ? "" : "none" }}
    >
      Reservation successful! Please pick up your book(s) within 3 days.
    </div>
  );

  return (
    <div>
      <h2>Number of books:</h2>
      {showSuccess(data.success)}
      {showReserve()}
    </div>
  );
};

export default Reserve;
