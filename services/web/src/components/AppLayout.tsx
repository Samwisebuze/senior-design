/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";

import "./layout.css";

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <h1>App Layout!</h1>
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
