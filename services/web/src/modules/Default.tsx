import React from "react";
import { RouteComponentProps } from "@reach/router";
import Application from "../components/canvas/application";
import BodyWidget from "../components/canvas/BodyWidget";

interface Props extends RouteComponentProps {}

const Default: React.FC<Props> = () => {
  let app: Application;

  const diagramModel = window.localStorage.getItem("diagramModel");
  if (diagramModel) {
    console.log(diagramModel);
    app = new Application(diagramModel);
  } else {
    app = new Application();
  }

  return <BodyWidget app={app} />;
};

export default Default;
