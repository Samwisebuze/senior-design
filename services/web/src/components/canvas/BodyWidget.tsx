import * as React from "react";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";
import { useReducer } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
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

const StyledButton = styled(Button)`
  bottom: 16px;
  left: 16px;
  position: absolute;
`;

const StyledButton2 = styled(Button)`
  bottom: 64px;
  left: 16px;
  position: absolute;
`;

interface Props {
  app: Application;
}

interface Machine {
  id: string;
  type: string;
  connectedSwitches: string[];
  connectedRouters: string[];
  image?: string;
}

const BodyWidget: React.FC<Props> = ({ app }) => {
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  const handleCreateNetwork = async () => {
    const model = app.getDiagramEngine().getModel();
    const nodes = model.getNodes();

    // Initialize all machines
    const machines = nodes.map(node => {
      const { id, name } = node.getOptions();
      const type = name.toLowerCase();

      const connectedSwitches: string[] = [];
      const connectedRouters: string[] = [];

      let machine: Machine = {
        id: id || "",
        type,
        connectedSwitches,
        connectedRouters,
      };

      if (type === "host") {
        machine = { image: "virtuoso", ...machine };
      }

      return machine;
    });

    // Add all connected routers and switches to each machine
    const links = model.getLinks();
    links.forEach(link => {
      const sourcePort = link.getSourcePort();
      const targetPort = link.getTargetPort();

      // Make sure the link connects two nodes
      if (!sourcePort || !targetPort) {
        return;
      }

      const sOpts = sourcePort.getParent().getOptions();
      const tOpts = targetPort.getParent().getOptions();

      if (sOpts.name.toLowerCase() === "switch") {
        const idex = machines.findIndex(machine => machine.id === tOpts.id);
        machines[idex].connectedSwitches.push(sOpts.id);
      }

      if (sOpts.name.toLowerCase() === "router") {
        const idex = machines.findIndex(machine => machine.id === tOpts.id);
        machines[idex].connectedRouters.push(sOpts.id);
      }

      if (tOpts.name.toLowerCase() === "switch") {
        const idex = machines.findIndex(machine => machine.id === sOpts.id);
        machines[idex].connectedSwitches.push(tOpts.id);
      }

      if (tOpts.name.toLowerCase() === "router") {
        const idex = machines.findIndex(machine => machine.id === sOpts.id);
        machines[idex].connectedRouters.push(tOpts.id);
      }
    });

    console.log(machines);

    const body = JSON.stringify({
      networkId: 3,
      machines,
    });

    const response = await fetch("http://localhost:5000/api/create-network", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body,
    });

    console.log("response", response);
    if (!response.ok) {
      console.log(
        "Network creation Failed. Response came back with code other than 200"
      );
      return;
    }

    window.localStorage.setItem(
      "diagramModel",
      JSON.stringify(model.serialize())
    );
  };

  const handleDeleteNetwork = async () => {
    const body = JSON.stringify({
      networkId: 3,
    });

    const response = await fetch("http://localhost:5000/api/delete-network", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body,
    });

    console.log("response", response);
    if (!response.ok) {
      console.log(
        "Network Deletion Failed. Response came back with code other than 200"
      );
      return;
    }

    window.localStorage.removeItem("diagramModel");
    app.newModel();
    forceUpdate();
  };

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
          <StyledButton2
            variant="contained"
            color="secondary"
            href="http://localhost:8888?hostname=1e7ca3482f5344be"
          >
            Inspect Node
          </StyledButton2>
          <StyledButton
            variant="contained"
            color="default"
            onClick={handleDeleteNetwork}
          >
            Delete Network
          </StyledButton>
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
        <StyledFab
          color="primary"
          variant="extended"
          onClick={handleCreateNetwork}
        >
          <AddIcon style={{ marginRight: "4px" }} />
          Create Network
        </StyledFab>
      </Content>
    </Body>
  );
};

export default BodyWidget;
