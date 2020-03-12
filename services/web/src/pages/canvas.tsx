import React from "react";
import styled from "styled-components";
import CanvasLayout from "../components/CanvasLayout";

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  justify-content: center;
`;

const Canvas = () => {
  return (
    <CanvasLayout>
      <StyledDiv>hi</StyledDiv>
    </CanvasLayout>
  );
};
export default Canvas;
