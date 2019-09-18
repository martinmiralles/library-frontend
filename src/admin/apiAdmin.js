import { API } from "../config";

export const createCategory = (userId, token, category) => {
  // console.log(name, email, password);

  // Sends form to backend
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    // will convert Object from clickSubmit to a JSON string
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const createBook = (userId, token, book) => {
  // console.log(name, email, password);

  // Sends form to backend
  return fetch(`${API}/book/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "applicaton/json/",
      Authorization: `Bearer ${token}`
    },
    // will convert Object from clickSubmit to a JSON string
    body: book
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
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

export const listLoans = (userId, token) => {
  return fetch(`${API}/loan/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "applicaton/json/",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/loan/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "applicaton/json/",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updateLoanStatus = (userId, token, loanId, status) => {
  return fetch(`${API}/loan/${loanId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status, loanId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// To perform CRUD on Books

// To GET ALL Books
export const getBooks = () => {
  return fetch(`${API}/books?limit=100`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// To DELETE a SINGLE Book
export const deleteBook = (bookId, userId, token) => {
  return fetch(`${API}/book/${bookId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    } //No need to send anything in the body for DELETE requests
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// To GET a SINGLE Book
export const getBook = bookId => {
  return fetch(`${API}/book/${bookId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// To UPDATE a SINGLE Book
export const updateBook = (bookId, userId, token, book) => {
  return fetch(`${API}/book/${bookId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "applicaton/json/",
      Authorization: `Bearer ${token}`
    },
    body: book
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
