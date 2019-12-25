import { assert } from 'chai'
import { describe, it } from 'mocha'
import { K8Api } from '../src/k8s'


describe('Kubernetes API Test', () => {
    it('should be well tested', () => {
        assert.equal('foo', 'foo')
    })

    it('should create a new namespace')

    // it('should call create a new deployment', async () => {
    //     // console.log(await K8Api.getPods())

    //     await K8Api.createDeployment()
    // })

    // it('should get status of a deployment', async () => {
    //     await K8Api.getDeploymentStatus('nginx-deployment')
    // })

    it('should return all containers in the namespace', async () => {
        const pods = await K8Api.getContainers()
        console.log(pods)
        assert.isArray(pods)
    })

    it('should return the containers in a deployment')

    it('should watch for changes to deployments')

    it('should update a deployment')

    // it('should delete a deployment', async () => {
    //     const deleted = await K8Api.deleteDeployment('nginx-deployment')
    //     assert.isTrue(deleted)
    // })
})
