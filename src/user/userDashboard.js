import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getLoanHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
  // State
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role }
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getLoanHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/savedItems'>
              Saved Items
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>
            {role == 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  const loanHistory = history => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Book Rental History</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.books.map((books, i) => {
                    return (
                      <div key={i}>
                        <h6>Book Title: {books.name}</h6>
                        <h6>Book Info: {books.description}</h6>
                        <h6>Book Status: {h.status}</h6>
                        <h6>
                          Loaned date: {moment(books.createdAt).fromNow()}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {/* {JSON.stringify(history)} */}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`Welcome ${name}!`}
      className='container'
    >
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {loanHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
