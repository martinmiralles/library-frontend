import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/";
import { Link } from "react-router-dom";
import {
  createCategory,
  createBook,
  getCategories,
  listLoans,
  getStatusValues,
  updateLoanStatus
} from "./apiAdmin";
import moment from "moment";

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  // deconstruction
  const { user, token } = isAuthenticated();

  const loadLoans = () => {
    listLoans(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoans(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadLoans();
    loadStatusValues();
  }, []);

  const showLoansLength = () => {
    if (loans.length > 0) {
      return (
        <h1 className='text-danger display-2'>Total loans: {loans.length}</h1>
      );
    } else {
      return <h1 className='text-danger'>No Loans to show</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );

  const handleStatusChange = (event, loanId) => {
    // request to the backend
    updateLoanStatus(user._id, token, loanId, event.target.value).then(data => {
      if (data.error) {
        console.log("Status Update Failed!");
      } else {
        loadLoans();
      }
    });
  };

  const showStatus = loan => (
    <div className='form-group'>
      <h3 className='mark mb-4'>
        Status: {loan.status}
        <select
          className='form-control'
          onChange={event => handleStatusChange(event, loan._id)}
        >
          <option>Update Status</option>
          {statusValues.map((status, index) => (
            <option key={index} values={status}>
              {status}
            </option>
          ))}
        </select>
      </h3>
    </div>
  );

  return (
    <Layout
      title='Loans'
      description={`Welcome ${user.name}, you can manage all the orders here.`}
    >
      <div className='row'>
        <div className='col-8 offset-md-2'>
          {showLoansLength()}
          {/* {JSON.stringify(loans)} */}

          {loans.map((loans, loansIndex) => {
            return (
              <div
                className='mt-5'
                key={loansIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className='mb-5'>
                  <span className='bg-primary'>Loan ID: {loans._id}</span>
                </h2>
                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(loans)}</li>
                  <li className='list-group-item'>
                    Rented by: {loans.user.name}
                  </li>
                  <li className='list-group-item'>
                    Loaned on: {moment(loans.createdAt).fromNow()}
                  </li>
                </ul>
                <h3 className='mt-4 mb-4 font-italic'>
                  Total books loaned: {loans.books.length}
                </h3>

                {loans.books.map((books, booksIndex) => (
                  <div
                    className='mb-4'
                    key={booksIndex}
                    style={{ padding: "20px", border: "1px solid indigo" }}
                  >
                    {showInput("Book Title", books.name)}
                    {showInput("Book ID", books._id)}
                    {showInput("Book Title", books.description)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Loans;
