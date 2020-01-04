import { assert } from 'chai'
import { describe, it } from 'mocha'
import { step } from 'mocha-steps'
import { K8Api } from '../src/k8s'
import { V1Deployment, V1DeploymentStatus } from '@kubernetes/client-node'


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
        K8Api.watch()

        // Wait for deployment status to become 'OK'
        K8Api.eventStream.on('addDeployment', (event: V1Deployment) => {
            const deploymentStatus = event.status
            if (deploymentStatus !== undefined && deploymentStatus.availableReplicas === 1) {
                // deployment is ready!
                K8Api.stopWatch()
                done()
            }
        })

        K8Api.eventStream.on('updateDeployment', (event: V1Deployment) => {
            const deploymentStatus = event.status
            if (deploymentStatus !== undefined && deploymentStatus.availableReplicas === 1) {
                // deployment is ready!
                K8Api.stopWatch()
                done()
            }
        })
    })

    it('should get status of a deployment', async () => {
        const status = await K8Api.getDeploymentStatus('nginx-deployment')

        assert.isTrue(status != undefined)
        assert.equal(status!.availableReplicas, 1)
    })

    // step('should return all containers in the namespace', async () => {
    //     const pods = await K8Api.getContainers()
    //     console.log(pods)
    //     assert.isArray(pods)
    // })

    //it('should return the containers in a deployment')

    //it('should update a deployment')

    // step('should delete a deployment', async () => {
    //     const deleted = await K8Api.deleteDeployment('nginx-deployment')
    //     assert.isTrue(deleted)
    // })

    // step('should watch for deployment to be fully deleted', function(done) {
    //     // In this test, wait for the Deployment to be fully deleted (all pods down)
    //     this.timeout(6000)
    //     // K8Api.watch()

    //     K8Api.eventStream.on('updateDeployment', (event: V1Deployment) => {
    //         // const deploymentStatus = event.status
    //         // if (deploymentStatus !== undefined && deploymentStatus.availableReplicas === 1) {
    //         //     // deployment is ready!
    //         //     done()
    //         // }
    //         console.log('deleted:', event)
    //         done()
    //     })
    // })
})
