const k8s = require('@kubernetes/client-node')
import { KubeConfig, CoreV1Api, AppsV1Api, V1Deployment, makeInformer, Informer, V1DeploymentStatus } from '@kubernetes/client-node'
import PubSub from 'pubsub-js'
import { IncomingMessage } from 'http'
import { EventEmitter }  from 'events'

const dumpYaml = k8s.dumpYaml // helper function
const loadYaml = k8s.loadYaml // helper function
const Yaml = require('yamljs')

const f = { hello: { foo: 'bar' } }
const b = Yaml.stringify(f)
console.log(b)

// Connects on k8s localhost
// TODO: Offer way to connect to any K8s endpoint
// const kc = new k8s.KubeConfig()
const kc = new KubeConfig()
kc.loadFromDefault()
// const k8sApi = kc.makeApiClient(k8s.CoreV1Api)


/**
 * A stateless API client for a Kubernetes cluster.
 */
export class K8Api {
    private static readonly NAMESPACE = 'default'//TODO: rename to 'virtuoso-container-service'
    private static readonly k8sCoreApi = kc.makeApiClient(CoreV1Api)
    private static readonly k8sAppsApi = kc.makeApiClient(AppsV1Api)

    // Outgoing event stream
    private static deploymentInformer: Informer<V1Deployment> | undefined

    // Standardized way of naming deployments (naming for debugging purposes)
    static deploymentName(deploymentId: string): string {
        return `deployment-${deploymentId}`
    }

    /**
     * Create a custom namespace for Virtusoso in the Kubernetes cluster.
     * Does nothing if the namespace already exists.
     */
    static async createNamespace(): Promise<void> {
        const namespace = {
            metadata: {
                name: this.NAMESPACE
            }
        }

        await this.k8sCoreApi
                .createNamespace(namespace)
                .catch((error: any) => {
                    const errorResponse = <IncomingMessage>error.response
                    const statusCode = errorResponse.statusCode
                    const statusMessage = errorResponse.statusMessage

                    console.error(`Error: ${statusCode} - ${statusMessage}`)
                })
    }

    /**
     * Get a list of containers inside pods running inside the namespace.
     * 
     * TODO: respond with custom Object type
     */
    static async getContainers(): Promise<any[]> {
        const response = await this.k8sCoreApi
                                .listNamespacedPod(this.NAMESPACE)
        const body = response.body
        const pods = body.items

        // Info to get: deploymentId, podId, containerId, imageName, name
        const containers = pods.flatMap(pod => {
            const containerStatuses = pod.status?.containerStatuses
            const labels = pod.metadata?.labels

            if (containerStatuses) {
                return containerStatuses.flatMap(containerStatus => {
                    return {
                        labels: labels,
                        containerId: containerStatus.containerID,
                        imageName: containerStatus.image,
                        imageId: containerStatus.imageID
                    }
                })
            }
        })

        return containers
    }

    /**
     * Given a deploymentId, return a list of containers in that
     * deployment inside pods running inside the namespace
     * 
     * @param deploymentId
     * @returns any[]
     */
    static async getDeploymentPods(deploymentId: string): Promise<any[]> {
        const deploymentName = 'nginx-deployment' // TODO: use unique identifier

        // const response = await this.k8sAppsApi.deployment

        return []
    }

    /**
     * Deploy a Network of Machines.
     * https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#create-21
     * 
     * Given a list of Machines to deploy as a Network, deploy the
     * machines as containers and return the metadata of those containers
     * and metadata about the deployment.
     * 
     * Does nothing if the deployment already exists.
     */
    static async createDeployment() {
        // TODO: place deployment identifier in the metadata of the deployment
        const requestData = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.17.6-alpine
        ports:
        - containerPort: 80`

        const deploymentConfig: V1Deployment = <V1Deployment>loadYaml(requestData)
        const response = await this.k8sAppsApi
                            .createNamespacedDeployment(
                                this.NAMESPACE,
                                deploymentConfig
                            )
                            .catch(error => {
                                const errorResponse = <IncomingMessage>error.response
                                const statusCode = errorResponse.statusCode
                                const statusMessage = errorResponse.statusMessage
        
                                if (statusCode === 409) {
                                    // Response 409 means that the deployment already exists, but this is ok
                                    console.error(`Warning: deployment already exists - ${statusCode}, ${statusMessage}`)
                                    return
                                }
        
                                console.error(`Error: Error deleting deployment ${statusCode}, ${statusMessage}`)
                            })

        // console.log(response)
    }

    /**
     * Given metadata about a specific container, modify the deployment to
     * update the configuration of that container or delete the container entirely.
     */
    static async modifyDeployment() {}

    /**
     * Given a DeploymentId, stop the containers in the deployment and
     * delete the deployment if it does exist.
     * 
     * https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#delete-24
     */
    static async deleteDeployment(deploymentId: string): Promise<Boolean> {
        const deploymentName = 'nginx-deployment' // unique identifier
        
        await this.k8sAppsApi
                    .deleteNamespacedDeployment(deploymentName, this.NAMESPACE)
                    .catch(error => {
                        const errorResponse = <IncomingMessage>error.response
                        const statusCode = errorResponse.statusCode
                        const statusMessage = errorResponse.statusMessage

                        if (statusCode === 404) {
                            // Response code of 404 means there was nothing to delete,
                            // but this is ok.
                            console.warn(`Warning: Cannot delete deployment because deployment doesn't exist ${deploymentName} - ${statusCode}, ${statusMessage}`)
                            return true
                        }

                        console.error(`Error: Error deleting deployment ${deploymentName} - ${statusCode}, ${statusMessage}`)

                        return false
                    })

        // Response code was 200 (the delete was successful)
        return true
    }

    /**
     * Get the status metadata of the given deploymentId
     * 
     * https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#read-status-35
     */
    static async getDeploymentStatus(deploymentId: string): Promise<V1DeploymentStatus | undefined> {
        const deploymentName = 'nginx-deployment' // unique identifier
        const response = await this.k8sAppsApi.readNamespacedDeploymentStatus(deploymentName, this.NAMESPACE)
        const responseBody = response.body

        return responseBody.status
    }

    /**
     * Internal pubsub: Subscribe to particular deployment events
     * in the Kubernetes cluster. Returns a unique subscriber token
     * that can be used to unsubscribe.
     * 
     * @param eventName
     * @returns string
     */
    public static subscribe(eventName: string, subscriberFunc: Function): string {
        // Start the watcher (does nothing if the watcher is already watching)
        K8Api.watch()
        // Subscribe and return the unique subscriber token
        return <string>PubSub.subscribe(eventName, subscriberFunc)
    }

    /**
     * Unsubscribe a subscriber for deployment events via its unique token.
     * 
     * @param token
     * @returns void
     */
    public static unsubscribe(token: string): void {
        PubSub.unsubscribe(token)
    }

    /**
     * Watch for changes to deployments the Kubernetes cluster.
     * Does nothing if the watcher is already watching.
     * 
     * Note: returns a stream of all create, update, and delete events.
     *       It's up to the caller to filter and decide how to use events.
     */
    private static watch(): void {
        if (K8Api.deploymentInformer != undefined) {
            // Don't attempt to setup more than one watcher
            return
        }

        const listDeployments = () => this.k8sAppsApi.listNamespacedDeployment(this.NAMESPACE)
        K8Api.deploymentInformer = makeInformer(kc, `/api/v1/namespaces/${this.NAMESPACE}/deployments`, listDeployments)

        K8Api.deploymentInformer.on('add', (event: V1Deployment) => {
            // eventName: addDeployment
            PubSub.publish('addDeployment', event)
        })

        K8Api.deploymentInformer.on('update', (event: V1Deployment) => {
            // eventName: updateDeployment
            PubSub.publish('updateDeployment', event)
        })

        K8Api.deploymentInformer.on('delete', (event: V1Deployment) => {
            // eventName: deleteDeployment
            PubSub.publish('deleteDeployment', event)
        })

        K8Api.deploymentInformer.start()
    }

    /**
     * Teardown the deployment watchers
     */
    private static stopWatch(): void {
        if (K8Api.deploymentInformer != undefined) {
            K8Api.deploymentInformer.off('add', () => {})
            K8Api.deploymentInformer.off('update', () => {})
            K8Api.deploymentInformer.off('delete', () => {})

            K8Api.deploymentInformer = undefined
        }
    }

    // TODO
    // https://github.com/kubernetes-client/javascript/blob/master/examples/typescript/exec/exec-example.ts
    static async execContainer(containerId: string, command: string) {}
}
