import React from "react";
import { Link } from "gatsby";

import { Router } from "@reach/router";
import RandomPerson from "../modules/RandomPerson";
import AppLayout from "../components/AppLayout";
import Default from "../modules/Default";

const App = () => {
  return (
    <AppLayout>
      <Link to="/">Go back to the homepage</Link>
      <h1>This is the app!</h1>
      <Router basepath="/app">
        <RandomPerson path="/random-person" />
        <Default path="/" />
      </Router>
    </AppLayout>
  );
};
export default App;
