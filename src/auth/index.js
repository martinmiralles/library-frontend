import { API } from "../config";

export const signup = user => {
  // console.log(name, email, password);

  // Sends form to backend
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json"
    },
    // will convert Object from clickSubmit to a JSON string
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const signin = user => {
  // console.log(name, email, password);

  // Sends form to backend
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "applicaton/json/",
      "Content-Type": "application/json"
    },
    // will convert Object from clickSubmit to a JSON string
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => {
        console.log("signout", response);
      })
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
