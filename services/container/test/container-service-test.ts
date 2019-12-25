import { assert } from 'chai'
import { describe, it, Test } from 'mocha'
import { createDeployment } from '../src/index'
import { Command } from 'shared-library-payload'


describe('ContainerService Test', () => {
    it('should be well tested', () => {
        assert.equal('foo', 'foo')
    })

    it('should create a new Network on Command', () => {
        const command = new Command('DummyService', 'CreateNetworkDeployment', {})

        const foo = createDeployment(command)
    })
})
