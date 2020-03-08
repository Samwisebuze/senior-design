import React from "react";
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";

const BaseLayout: React.FC = ({ children }) => {
  return (
    <div>
      <CssBaseline />
      {children}
    </div>
  );
};

export default BaseLayout;
