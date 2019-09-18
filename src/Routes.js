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
import Browse from "./core/Browse";
import Book from "./core/Book";
import SavedItems from "./core/SavedItems";
import Loans from "./admin/Loans";
import Profile from "./user/Profile";
import ManageBooks from "./admin/ManageBooks";
import UpdateBook from "./admin/UpdateBook";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/browse' exact component={Browse} />
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
        <Route path='/book/:bookId' exact component={Book} />
        <Route path='/savedItems' exact component={SavedItems} />
        <AdminRoute path='/admin/loans' exact component={Loans}></AdminRoute>
        <PrivateRoute
          path='/profile/:userId'
          exact
          component={Profile}
        ></PrivateRoute>
        <AdminRoute
          path='/admin/books'
          exact
          component={ManageBooks}
        ></AdminRoute>
        <AdminRoute
          path='/admin/book/update/:bookId'
          exact
          component={UpdateBook}
        ></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
