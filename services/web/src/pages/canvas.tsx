import React from "react";
import BaseLayout from "../components/BaseLayout";
import Application from "../components/canvas/application";
import BodyWidget from "../components/canvas/BodyWidget";

const Canvas = () => {
  const app = new Application();

  return (
    <BaseLayout>
      <BodyWidget app={app} />
    </BaseLayout>
  );
};
export default Canvas;
