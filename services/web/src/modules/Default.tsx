import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Link } from "gatsby";
import StyledTest from "./StyledTest";

interface Props extends RouteComponentProps {}

const Default: React.FC<Props> = () => {
  return (
    <div>
      <Link to="/app/random-person">Random Person</Link>
      <StyledTest />
    </div>
  );
};

export default Default;
