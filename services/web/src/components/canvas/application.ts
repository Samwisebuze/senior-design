import * as SRD from "@projectstorm/react-diagrams";

class Application {
  protected activeModel: SRD.DiagramModel;

  protected diagramEngine: SRD.DiagramEngine;

  constructor() {
    this.diagramEngine = SRD.default();
    this.newModel();
  }

  public newModel() {
    this.activeModel = new SRD.DiagramModel();
    this.diagramEngine.setModel(this.activeModel);

    // // create a default node
    // const node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    // const port = node1.addOutPort("Out");
    // node1.setPosition(100, 100);

    // // create another default node
    // const node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
    // const port2 = node2.addInPort("In");
    // node2.setPosition(400, 100);

    // // link the ports
    // const link1 = port.link(port2);

    // this.activeModel.addAll(node1, node2, link1);
  }

  public getActiveDiagram(): SRD.DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine;
  }
}

export default Application;
