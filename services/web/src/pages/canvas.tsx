import React from "react";
import CanvasLayout from "../components/canvas/CanvasLayout";
import Application from "../components/canvas/application";
import BodyWidget from "../components/canvas/BodyWidget";

const Canvas = () => {
  const app = new Application();

  return (
    <CanvasLayout>
      <BodyWidget app={app} />
    </CanvasLayout>
  );
};
export default Canvas;
