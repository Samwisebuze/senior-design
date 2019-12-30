import { assert } from 'chai'
import { Machine } from '../index'
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

    it('should serialize a Machine to JSON', () => {
        const machine = new Machine('1.2.3.4', 'ubuntu', [22, 80])

        // show that the json object can be converted to a string and back
        const json = JSON.parse(JSON.stringify(machine.toJSON()))

        const deserializedMachine = Machine.fromJSON(json)

        assert.deepEqual(machine, deserializedMachine)
    })

    it('should serialize a Machine with a link to JSON', () => {
        const machine = new Machine('1.2.3.4', 'ubuntu', [22, 80])
        const secondMachine = new Machine('0.0.0.0', 'alpine', [443])

        machine.addAdjacentMachine(secondMachine)
        secondMachine.addAdjacentMachine(machine)

        // show that the json object can be converted to a string and back
        const json = JSON.parse(JSON.stringify(machine.toJSON()))

        const deserializedMachine = Machine.fromJSON(json)

        // the serializer doesn't support circular references of Machines
        // (that would produce JSON of infinite length), so we can test up to the first layer of links.
        assert.equal(machine.version, deserializedMachine.version)
        assert.equal(machine.machineId, deserializedMachine.machineId)
        assert.equal(machine.getAdjacentMachines().length, deserializedMachine.getAdjacentMachines().length)
    })
})
