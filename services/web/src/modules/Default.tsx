import React from "react";
import { RouteComponentProps } from "@reach/router";
import Application from "../components/canvas/application";
import BodyWidget from "../components/canvas/BodyWidget";

interface Props extends RouteComponentProps {}

const Default: React.FC<Props> = () => {
  // TODO: Find a way to pass app in as a prop and store app in local storage or something
  const app = new Application();

  console.log("Render");
  return <BodyWidget app={app} />;
};

export default Default;
