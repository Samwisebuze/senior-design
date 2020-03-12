import React from "react";
import { Link, navigate } from "gatsby";

import { Router } from "@reach/router";
import RandomPerson from "../modules/RandomPerson";
import AppLayout from "../components/AppLayout";
import Default from "../modules/Default";
import PrivateRoute from "../components/PrivateRoute";
import Application from "../components/canvas/application";
import BodyWidget from "../components/canvas/BodyWidget";

const App = () => {
  const app = new Application();

  return (
    <AppLayout>
      <BodyWidget app={app} />
    </AppLayout>
  );
};
export default App;
