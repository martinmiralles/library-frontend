import { API } from "../config";
import queryString from "query-string";

export const getBooks = sortBy => {
  return fetch(`${API}/books?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getFilteredBooks = (skip, limit, filters = {}) => {
  const data = {
    skip,
    limit,
    filters
  };

  // Sends form to backend
  return fetch(`${API}/books/by/search`, {
    method: "POST",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json"
    },
    // will convert Object from clickSubmit to a JSON string
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const list = params => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return fetch(`${API}/books/search?${query}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const read = bookId => {
  return fetch(`${API}/book/${bookId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const listRelated = bookId => {
  return fetch(`${API}/books/related/${bookId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const processLoan = (userId, token) => {
  return fetch(`${API}/braintree/loan/${userId}`, {
    method: "POST",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const createLoan = (userId, token, createLoanData) => {
  return fetch(`${API}/loan/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ loan: createLoanData })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
