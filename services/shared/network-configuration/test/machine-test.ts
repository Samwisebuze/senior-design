import { assert } from 'chai'
import { Machine } from '../network-configuration'
import { describe, it } from 'mocha'

describe('Machine', () => {
    it('should be well tested', () => {
        const machine = new Machine('1.2.3.4', 'ubuntu', [22, 80])

        assert.equal(machine.address, '1.2.3.4')
        assert.equal(machine.imageName, 'ubuntu')
        assert.deepEqual(machine.openPorts, [22, 80])
        assert.equal(machine.getAdjacentMachines().length, 0)
    })

    it('should add adjacent machines', () => {
        const firstMachine = new Machine('1.2.3.4', 'ubuntu', [22, 80])
        const secondMachine = new Machine('1.1.1.1', 'debian', [])

        firstMachine.addAdjacentMachine(secondMachine)

        assert.isTrue(firstMachine.hasLink(secondMachine))
        assert.equal(firstMachine.getAdjacentMachines().length, 1)
        assert.isFalse(secondMachine.hasLink(firstMachine))
        assert.equal(secondMachine.getAdjacentMachines().length, 0)
    })

    it('should add adjacent machines in both directions', () => {
        const firstMachine = new Machine('1.2.3.4', 'ubuntu', [22, 80])
        const secondMachine = new Machine('1.1.1.1', 'debian', [])

        firstMachine.addAdjacentMachine(secondMachine)
        secondMachine.addAdjacentMachine(firstMachine)

        assert.isTrue(firstMachine.hasLink(secondMachine))
        assert.equal(firstMachine.getAdjacentMachines().length, 1)
        assert.isTrue(secondMachine.hasLink(firstMachine))
        assert.equal(secondMachine.getAdjacentMachines().length, 1)
    })
})
