import { assert } from 'chai'
import { Machine, Network } from '../network-configuration'
import { describe, it } from 'mocha'

describe('Machine', () => {
    it('should be well tested', () => {
        const machine = new Machine('1.2.3.4', 'ubuntu', [22, 80])

        assert.equal(machine.address, '1.2.3.4')
        assert.equal(machine.imageName, 'ubuntu')
        assert.deepEqual(machine.openPorts, [22, 80])
        assert.equal(machine.getAdjacentMachines().size, 0)
    })

    it('should add adjacent machines', () => {
        const firstMachine = new Machine('1.2.3.4', 'ubuntu', [22, 80])
        const secondMachine = new Machine('1.1.1.1', 'debian', [])

        firstMachine.addAdjacentMachine(secondMachine)

        assert.isTrue(firstMachine.hasLink(secondMachine))
        assert.equal(firstMachine.getAdjacentMachines().size, 1)
        assert.isFalse(secondMachine.hasLink(firstMachine))
        assert.equal(secondMachine.getAdjacentMachines().size, 0)
    })

    it('should add adjacent machines in both directions', () => {
        const firstMachine = new Machine('1.2.3.4', 'ubuntu', [22, 80])
        const secondMachine = new Machine('1.1.1.1', 'debian', [])

        firstMachine.addAdjacentMachine(secondMachine)
        secondMachine.addAdjacentMachine(firstMachine)

        assert.isTrue(firstMachine.hasLink(secondMachine))
        assert.equal(firstMachine.getAdjacentMachines().size, 1)
        assert.isTrue(secondMachine.hasLink(firstMachine))
        assert.equal(secondMachine.getAdjacentMachines().size, 1)
    })
})

describe('Network', () => {
    it('should be well tested', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        assert.equal(network.owner, 'cool-owner')
        assert.equal(network.networkName, 'really-cool-network')
        assert.equal(network.getAllMachines().length, 0)
    })

    it('should add a new machine', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        const machine = new Machine('1.2.3.4', 'ubuntu', [8080])
        network.addMachine(machine)

        assert.equal(network.getAllMachines().length, 1)
    })

    it('should remove a machine', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        const machine = new Machine('1.2.3.4', 'ubuntu', [8080])
        network.addMachine(machine)
        network.removeMachine(machine)

        assert.equal(network.getAllMachines().length, 0)
    })

    it('should link two machines', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        const machineOne = new Machine('1.2.3.4', 'ubuntu', [8080])
        const machineTwo = new Machine('1.1.1.1', 'alpine', [22, 80])
        network.addLink(machineOne, machineTwo) // adds both and links

        assert.equal(network.getAllMachines().length, 2)
        assert.isTrue(network.hasLink(machineOne, machineTwo))
        assert.isTrue(network.hasLink(machineTwo, machineOne))
    })
})
