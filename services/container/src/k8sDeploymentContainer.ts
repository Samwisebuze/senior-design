/**
 * Kubernetes Deployment Container definition
 * https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#creating-a-deployment
 */
export class DeploymentContainer {
    public readonly name: string
    public readonly image: string
    public readonly ports: number[]

    constructor(name: string, image: string, ports: number[]) {
        this.name = name
        this.image = image
        this.ports = ports
    }

    public toJSON() {
        return {
            name: this.name,
            image: this.image,
            ports: this.ports.map(port => {
                return { containerPort: port }
            })
        }
    }
}


export class DeploymentContainerPort {
    public readonly containerPort: number

    constructor(containerPort: number) {
        this.containerPort = containerPort
    }

    public toJSON() {
        return {
            containerPort: this.containerPort
        }
    }
}
