import { assert } from 'chai'
import { Machine, Network } from '../network-configuration'
import { describe, it } from 'mocha'

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
