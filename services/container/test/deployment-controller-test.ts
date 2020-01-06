import { assert } from 'chai'
import { describe, it } from 'mocha'
import { step } from 'mocha-steps'
import { createDeployment, shutdownDeployment } from '../src/deployment-controller'
import { Command } from 'shared-library-payload'

const networkId = 'network-uuid-here' // in reality, this would be a uuid

describe('ContainerService Test', () => {
    step('should create a new Network Deployment on Command', async function() {
        this.timeout(6000)

        const command = new Command(
            'DummyService',
            'CreateNetworkDeployment',
            { networkId: networkId }
        )
        const responseEvent = await createDeployment(command)

        assert.isOk(responseEvent)
        assert.equal(responseEvent.sender, 'ContainerService')
        assert.equal(responseEvent.name, 'DidCreateNetwork')
        assert.deepEqual(responseEvent.data, { networkId: networkId })
    })

    step('should update a Network Deployment on Command')

    step('should shutdown a Network Deployment on Command', async function() {
        this.timeout(6000)

        const command = new Command(
            'DummyService',
            'ShutdownNetworkDeployment',
            { networkId: networkId }
        )
        const responseEvent = await shutdownDeployment(command)

        assert.isOk(responseEvent)
        assert.equal(responseEvent.sender, 'ContainerService')
        assert.equal(responseEvent.name, 'DidShutdownNetwork')
        assert.deepEqual(responseEvent.data, { networkId: networkId })
    })
})
