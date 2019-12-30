import { assert } from 'chai'
import { describe, it } from 'mocha'
import { step } from 'mocha-steps'
import { K8Api } from '../src/k8s'


/**
 * Perform a smoke test of interacting with the k8s API
 */
describe('Kubernetes API Test', () => {
    step('should call create a new deployment', async () => {
        // console.log(await K8Api.getPods())
        await K8Api.createDeployment()
    })

    // it('should get status of a deployment', async () => {
    //     await K8Api.getDeploymentStatus('nginx-deployment')
    // })

    step('should watch for deployment status updates', () => {
        // In this test, wait for the Deployment to be stable (all pods up and running),
        // then, move on to the next test
    })

    // step('should return all containers in the namespace', async () => {
    //     const pods = await K8Api.getContainers()
    //     console.log(pods)
    //     assert.isArray(pods)
    // })

    step('should return the containers in a deployment')

    it('should update a deployment')

    // step('should delete a deployment', async () => {
    //     const deleted = await K8Api.deleteDeployment('nginx-deployment')
    //     assert.isTrue(deleted)
    // })
})
