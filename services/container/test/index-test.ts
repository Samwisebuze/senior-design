import { assert } from 'chai'
import { describe, it, Test } from 'mocha'
import { createDeployment, shutdownDeployment } from '../src/index'
import { Command } from 'shared-library-payload'

const networkId = 'dummy-network-id' // in reality, this would be a uuid

describe('ContainerService Test', () => {
    it('should create a new Network Deployment on Command', async () => {
        const command = new Command(
            'DummyService',
            'CreateNetworkDeployment',
            { networkId: networkId }
        )
        const response = await createDeployment(command)

        assert.isOk(response)
    })

    it('should shutdown a Network Deployment on Command', async () => {
        const command = new Command(
            'DummyService',
            'ShutdownNetworkDeployment',
            { networkId: networkId }
        )
        const response = await shutdownDeployment(command)

        assert.isOk(response)
    })
})
