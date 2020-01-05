import { Command, Event } from 'shared-library-payload'
import { K8Api } from './k8s'
import { DeploymentModel, IDeployment, IDeploymentMachine } from './model'
import * as mongoose from 'mongoose'
import { DeploymentContainer, DeploymentContainerPort } from './k8sDeploymentContainer'


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
export const createDeployment = async (command: Command): Promise<Event> => {
    // Pretend that a Command to create a new network just came in
    const commandContent = command.data
    // @ts-ignore
    const networkId = <string>commandContent.networkId

    // Connect to mongoose
    await mongoose.connect('mongodb://root:root@localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test' })

    // First, check if the deployment already exists
    const deploymentExists = await DeploymentModel.findOne({ networkId: networkId, removed: false }).exec()
    
    if (deploymentExists != null) {
        // Nothing to do
        return new Event('ContainerService', 'CreatedNetwork', { networkId })
    }

    // Carry out deployment
    // TODO: get real machine configuration from incoming command
    const deploymentConfig = new DeploymentContainer(
        'nginx', 'nginx:1.17.6-alpine', [new DeploymentContainerPort(80)]
    )
    const [deploymentId, _] = await K8Api.createDeployment([deploymentConfig])

    // Save deployment metadata for later usage
    const deploymentMetadata = new IDeployment()
    deploymentMetadata.deploymentId = deploymentId
    deploymentMetadata.networkId = networkId
    deploymentMetadata.ownerId = 'ownerid-here'
    deploymentMetadata.machines = []

    await DeploymentModel.create(deploymentMetadata)

    // Test, retrieve what we just inserted
    const result2 = await DeploymentModel.findOne({ deploymentId: deploymentId }).exec()
    console.log('found result:', result2)

    return new Event('ContainerService', 'CreatedNetwork', { networkId })
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
 * Given the Network ID, delete the Deployment and mark as removed in MongoDB. 
 */
export const shutdownDeployment = async (command: Command): Promise<Event> => {
    // Pretend that a Command to create a new network just came in
    const commandContent = command.data
    // @ts-ignore
    const networkId = <string>commandContent.networkId

    await mongoose.connect('mongodb://root:root@localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test' })

    // Given the networkId, get the corresponding deployment id
    const result = await DeploymentModel.findOne({ networkId: networkId, removed: false }).exec()
    console.log('found result:', result)

    if (!result) {
        return new Event('ContainerService', 'ShutdownNetworkError', { networkId })
    }

    const deploymentId = result?.deploymentId

    // K8s: Shutdown the network by it's deployment id
    const removed = await K8Api.deleteDeployment(deploymentId)

    if (removed) {
        // Mark as removed in MongoDB
        await DeploymentModel.findOneAndUpdate(result, { removed: true })
        return new Event('ContainerService', 'ShutdownNetwork', { networkId })
    }

    // Something went wrong
    return new Event('ContainerService', 'ShutdownNetworkError', { networkId })
}


/// TODO: create a way for users to access the machines in their networks
const accessNetwork = () => {}
