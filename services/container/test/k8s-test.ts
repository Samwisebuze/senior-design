import { assert } from 'chai'
import { describe, it } from 'mocha'
import { step } from 'mocha-steps'
import { K8Api } from '../src/k8s'
import { DeploymentContainer } from '../src/k8sDeploymentContainer'
import { V1Deployment } from '@kubernetes/client-node'


let deploymentId = ''

/**
 * Perform a smoke test of interacting with the k8s API
 */
describe('Kubernetes API Test', () => {
    step('should call create a new deployment', async () => {
        const containerConfigs = [
            new DeploymentContainer(
                'nginx', 'nginx:1.17.6-alpine', [80]
            )
        ]

        const [id, k8sId] = await K8Api.createDeployment(containerConfigs)
        deploymentId = id
        console.info(`[Info] id: ${deploymentId}, k8s id: ${k8sId}`)

        assert.isOk(deploymentId)
        assert.isOk(k8sId)
    })

    step('should watch for deployment to be ok', function(done) {
        // In this test, wait for the Deployment to be stable
        // (all pods up and running), then, move on to the next test
        this.timeout(6000)

        // Wait for deployment status to become 'OK'
        const subscriberToken = K8Api.subscribe('updateDeployment', (_: string, data: V1Deployment) => {
            const deploymentStatus = data.status

            if (deploymentStatus !== undefined && deploymentStatus.availableReplicas === 1) {
                // deployment is ready!
                K8Api.unsubscribe(subscriberToken)
                done()
            }
        })
    })

    step('should get status of a deployment', async function() {
        this.timeout(7000)
        await sleep(3000) // ????
        const status = await K8Api.getDeploymentStatus(deploymentId)

        assert.isTrue(status != undefined)
        assert.equal(status!.availableReplicas, 1)
    })

    step('should return all containers in the namespace', async () => {
        const containers = await K8Api.getContainers()
        assert.isArray(containers)
    })

    step('should return the containers in a deployment', async () => {
        const containers = await K8Api.getDeploymentContainers(deploymentId)

        assert.isArray(containers)
        assert.equal(containers.length, 1)
    })

    step('should update a deployment')

    step('should delete a deployment and watch for deployment to be deleted', async function(done) {
        this.timeout(6000)

        const deleted = await K8Api.deleteDeployment(deploymentId)
        assert.isTrue(deleted)

        // Watch for 'deleteDeployment' event
        const subscriberToken = K8Api.subscribe('deleteDeployment', (_: string, data: V1Deployment) => {
            K8Api.unsubscribe(subscriberToken)
            done()
        })
    })
})

function sleep(ms: number): any {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
