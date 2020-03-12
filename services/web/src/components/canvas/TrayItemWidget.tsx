import * as React from "react";
import styled from "styled-components";

const Tray = styled.div<{ color?: string }>`
  color: white;
  font-family: Helvetica, Arial;
  padding: 5px;
  margin: 0px 10px;
  border: solid 1px ${p => p.color || "red"};
  border-radius: 5px;
  margin-bottom: 2px;
  cursor: pointer;
`;

interface Props {
  model: any;
  color?: string;
  name: string;
}

const TrayItemWidget: React.FC<Props> = ({ color, model, name }) => {
  return (
    <Tray
      color={color}
      draggable
      onDragStart={event => {
        event.dataTransfer.setData("storm-diagram-node", JSON.stringify(model));
      }}
      className="tray-item"
    >
      {name}
    </Tray>
  );
};

export default TrayItemWidget;
