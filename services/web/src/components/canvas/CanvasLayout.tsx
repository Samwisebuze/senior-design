import React from "react";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
  }
  body {
    width: 100%;
    height: 100%;
  }
  #gatsby-focus-wrapper, #___gatsby {
    width: 100%;
    height: 100%;
  }
`;

const CanvasLayout: React.FC = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </>
  );
};

export default CanvasLayout;
