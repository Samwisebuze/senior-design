import { Command, Event } from 'shared-library-payload'
import { K8Api } from './k8s'
import { DeploymentModel } from './model'

export class TestClass {
    foobar: string

    constructor(foobar: string) {
        this.foobar = foobar
        const foo = new Command('foobar', 'barfoo', {})
        console.log(foo)
    }
}


/**
 * Definition of the "desired state" of a Network deployment.
 * 
 * TODO: create mongoose hooks to store deployment information (container ids for machineIds, etc.)
 */
class Deployment {
    // metadata
    networkId: string = 'uuid' // unique key given to deployment by Network
    deploymentName: string = 'mydeployment'
    ownerId: string = 'uuid-here'

    // configuration
    replicas: number = 1 // we only need 1 of each machine
    machines: Object[] // List of Machines

    constructor(machines: Object[]) {
        this.machines = machines
    }
}


/**
 * Deploy the given Network if it doesn't already exist.
 * Save the Deployment for the Network in MongoDB.
 * 
 * Given a network configuration to create via Command,
 * check if that network already exists (by name).
 * If not, create the network via the K8s API
 * and return a success message.
 * 
 * If the networkId already exists as a active Deployment in
 * Kubernetes, this action does nothing.
 * 
 * Uses K8s Deployments under the hood do configure and deploy pods
 * and replace pods if they go down.
 */
export const createDeployment = (command: Command): Event => {
    // Pretend that a Command to create a new network just came in
    const commandContent = command.data

    // Assert that we can access the k8s API before continueing

    // TODO: cast commandContent to Network type
    // @ts-ignore
    // k8sApi.listNamespacedPod(NAMESPACE).then((res) => {
    //     console.log(res.body)
    // })

    return new Event('ContainerService', 'CreatedNetwork', {})
}


/**
 * Update the given Network's Deployment. Save configuration updates
 * in MongoDB.
 */
const updateNetwork = () => {
    // Find the Deployment configuration in MongoDB for the Network
    // If the Deployment configuration doesn't exist, then the Deployment 

    return
}


/**
 * Given the Network, delete the Deployment and delete in MongoDB. 
 */
const shutdownNetwork = () => {
    return
}

const deleteNetwork = () => {
    return
}

/// TODO: create a way for users to access the machines in their networks
const accessNetwork = () => {}

// console.log(foo)
