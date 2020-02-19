import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Link } from "gatsby";

interface Props extends RouteComponentProps {}

const Default: React.FC<Props> = () => {
  return <Link to="/app/random-person">Random Person</Link>;
};

export default Default;
