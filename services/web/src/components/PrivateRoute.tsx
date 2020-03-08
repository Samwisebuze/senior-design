import React from "react";
import { navigate } from "gatsby";
import { RouteComponentProps } from "@reach/router";
import { isLoggedIn, isBrowser } from "../util/auth";

interface Props extends RouteComponentProps {
  component: React.FC;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  location,
  ...rest
}) => {
  if (
    isBrowser() &&
    !isLoggedIn() &&
    location &&
    location.pathname !== `/login`
  ) {
    navigate("/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
