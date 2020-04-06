import * as React from "react";
import styled from "styled-components";

export const Tray = styled.div`
  min-width: 200px;
  background: rgb(25, 25, 25);
  flex-grow: 0;
  flex-shrink: 0;
`;

const TrayWidget: React.FC = ({ children }) => {
  return <Tray>{children}</Tray>;
};

export default TrayWidget;
