import { assert } from 'chai'
import { describe, it } from 'mocha'
import { step } from 'mocha-steps'
import { K8Api } from '../src/k8s'
import { V1Deployment } from '@kubernetes/client-node'


/**
 * Perform a smoke test of interacting with the k8s API
 */
describe('Kubernetes API Test', () => {
    before(async () => {
        // Ensure that the deployment doesn't exist before proceding
        await K8Api.deleteDeployment('nginx-deployment')
    })

    step('should call create a new deployment', async () => {
        await K8Api.createDeployment()
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

    it('should get status of a deployment', async () => {
        const status = await K8Api.getDeploymentStatus('nginx-deployment')

        assert.isTrue(status != undefined)
        assert.equal(status!.availableReplicas, 1)
    })

    step('should return all containers in the namespace', async () => {
        const pods = await K8Api.getContainers()
        assert.isArray(pods)
    })

    it('should return the containers in a deployment')

    it('should update a deployment')

    step('should delete a deployment and watch for deployment to be deleted', async function(done) {
        this.timeout(6000)

        const deleted = await K8Api.deleteDeployment('nginx-deployment')
        assert.isTrue(deleted)

        // Watch for 'deleteDeployment' event
        const subscriberToken = K8Api.subscribe('deleteDeployment', (_: string, data: V1Deployment) => {
            K8Api.unsubscribe(subscriberToken)
            done()
        })
    })
})
