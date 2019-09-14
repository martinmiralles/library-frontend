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
