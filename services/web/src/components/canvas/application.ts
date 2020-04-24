import * as SRD from "@projectstorm/react-diagrams";

class Application {
  protected activeModel: SRD.DiagramModel;

  protected diagramEngine: SRD.DiagramEngine;

  constructor(model?: string) {
    this.diagramEngine = SRD.default();

    // Create a new model
    this.activeModel = new SRD.DiagramModel();
    if (model) {
      this.activeModel.deserializeModel(JSON.parse(model), this.diagramEngine);
    }
    this.diagramEngine.setModel(this.activeModel);
  }

  public newModel() {
    this.activeModel = new SRD.DiagramModel();
    this.diagramEngine.setModel(this.activeModel);
  }

  public getActiveDiagram(): SRD.DiagramModel {
    return this.activeModel;
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine;
  }
}

export default Application;
