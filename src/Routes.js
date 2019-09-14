import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/userDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/adminDashboard";
import AddCategory from "./admin/AddCategory";
import AddBook from "./admin/AddBook";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
        <PrivateRoute
          path='/user/dashboard'
          exact
          component={Dashboard}
        ></PrivateRoute>
        <AdminRoute
          path='/admin/dashboard'
          exact
          component={AdminDashboard}
        ></AdminRoute>
        <AdminRoute
          path='/create/category'
          exact
          component={AddCategory}
        ></AdminRoute>
        <AdminRoute path='/create/book' exact component={AddBook}></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
