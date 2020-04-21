import * as React from "react";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";
import { useReducer } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TrayWidget from "./TrayWidget";
import Application from "./application";
import TrayItemWidget from "./TrayItemWidget";
import Canvas from "./Canvas";

const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Header = styled.div`
  display: flex;
  background: rgb(30, 30, 30);
  flex-grow: 0;
  flex-shrink: 0;
  color: white;
  font-family: Helvetica, Arial, sans-serif;
  padding: 10px;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Layer = styled.div`
  position: relative;
  flex-grow: 1;
`;

const StyledFab = styled(Fab)`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

interface Props {
  app: Application;
}

const BodyWidget: React.FC<Props> = ({ app }) => {
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  // ["Host", "Server", "Router", "Switch", "Firewall"]
  return (
    <Body>
      <Content>
        <TrayWidget>
          <TrayItemWidget
            model={{ type: "out" }}
            name="Host"
            color="rgb(0,192,255)"
          />
          <TrayItemWidget
            model={{ type: "both" }}
            name="Router"
            color="rgb(192,0,255)"
          />
          <TrayItemWidget
            model={{ type: "both" }}
            name="Switch"
            color="rgb(255,192,0)"
          />
        </TrayWidget>
        <Layer
          onDrop={event => {
            const data = JSON.parse(
              event.dataTransfer.getData("storm-diagram-node")
            );
            const nodesCount = Object.keys(
              app
                .getDiagramEngine()
                .getModel()
                .getNodes()
            ).length;

            let node: DefaultNodeModel | null = null;
            if (data.model.type === "in") {
              node = new DefaultNodeModel(data.name, data.color);
              node.addInPort("In");
            } else if (data.model.type === "out") {
              node = new DefaultNodeModel(data.name, data.color);
              node.addOutPort("Out");
            } else {
              node = new DefaultNodeModel(data.name, data.color);
              node.addInPort("In");
              node.addOutPort("Out");
            }
            const point = app.getDiagramEngine().getRelativeMousePoint(event);
            node.setPosition(point);
            app
              .getDiagramEngine()
              .getModel()
              .addNode(node);

            // This is needed to refresh the diagram after dropping anode
            forceUpdate();
          }}
          onDragOver={event => {
            event.preventDefault();
          }}
        >
          <Canvas engine={app.getDiagramEngine()} />
        </Layer>
        <StyledFab color="primary" variant="extended">
          <AddIcon style={{ "margin-right": "4px" }} />
          Create Network
        </StyledFab>
      </Content>
    </Body>
  );
};

// href="http://localhost:8888?hostname=660fd7b1403f4987"

export default BodyWidget;
