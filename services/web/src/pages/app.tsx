import React from "react";

import { Router } from "@reach/router";
import AppLayout from "../components/AppLayout";
import Default from "../modules/Default";
import PrivateRoute from "../components/PrivateRoute";

const App = () => {
  return (
    <AppLayout>
      <Router style={{ height: "100%", width: "100%" }} basepath="/app">
        <PrivateRoute component={Default} path="/" />
      </Router>
    </AppLayout>
  );
};
export default App;
