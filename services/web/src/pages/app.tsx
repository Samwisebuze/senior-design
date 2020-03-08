import React from "react";
import { Link, navigate } from "gatsby";

import { Router } from "@reach/router";
import RandomPerson from "../modules/RandomPerson";
import AppLayout from "../components/AppLayout";
import Default from "../modules/Default";
import Login from "../modules/Login";
import PrivateRoute from "../components/PrivateRoute";
import { isLoggedIn, logout } from "../util/auth";

const App = () => {
  return (
    <AppLayout>
      <Link to="/">Go To Homepage</Link>
      <br />
      {isLoggedIn() ? (
        <a
          href="/"
          onClick={event => {
            event.preventDefault();
            logout(() => navigate(`/app/login`));
          }}
        >
          Logout
        </a>
      ) : null}
      <h1>This is the app!</h1>
      <Router basepath="/app">
        <Login path="/login" />
        <RandomPerson path="/random-person" />
        <PrivateRoute component={Default} path="/" />
      </Router>
    </AppLayout>
  );
};
export default App;
