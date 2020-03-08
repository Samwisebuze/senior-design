import React from "react";
import { Link, navigate } from "gatsby";

import { Router } from "@reach/router";
import RandomPerson from "../modules/RandomPerson";
import AppLayout from "../components/AppLayout";
import Default from "../modules/Default";
import PrivateRoute from "../components/PrivateRoute";
import { isLoggedIn, logout } from "../util/auth";

const App = () => {
  return (
    <AppLayout>
      <Link to="/">Go To Homepage</Link>
      <h1>This is the app!</h1>
      <Router basepath="/app">
        <RandomPerson path="/random-person" />
        <PrivateRoute component={Default} path="/" />
      </Router>
    </AppLayout>
  );
};
export default App;
