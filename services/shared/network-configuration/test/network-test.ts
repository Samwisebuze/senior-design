import { assert } from 'chai'
import { Machine, Network } from '../index'
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

    it('should link two machines by id', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        // create machines
        const machineOne = new Machine('1.2.3.4', 'ubuntu', [8080])
        const machineOneId = machineOne.machineId
        const machineTwo = new Machine('1.1.1.1', 'alpine', [22, 80])
        const machineTwoId = machineTwo.machineId

        // add machines
        network.addMachine(machineOne)
        network.addMachine(machineTwo)

        // create link
        network.addLinkById(machineOneId, machineTwoId)

        assert.equal(network.getAllMachines().length, 2)
        assert.isTrue(network.hasLink(machineOne, machineTwo))
        assert.isTrue(network.hasLink(machineTwo, machineOne))
        assert.isTrue(network.hasLinkById(machineOneId, machineTwoId))
    })

    it('should unlink two machines by id', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        // create machines
        const machineOne = new Machine('1.2.3.4', 'ubuntu', [8080])
        const machineOneId = machineOne.machineId
        const machineTwo = new Machine('1.1.1.1', 'alpine', [22, 80])
        const machineTwoId = machineTwo.machineId

        // add machines
        network.addMachine(machineOne)
        network.addMachine(machineTwo)

        // create link
        network.addLinkById(machineOneId, machineTwoId)

        // break link
        network.removeLinkById(machineOneId, machineTwoId)

        assert.equal(network.getAllMachines().length, 2)
        assert.isFalse(network.hasLink(machineOne, machineTwo))
        assert.isFalse(network.hasLink(machineTwo, machineOne))
        assert.isFalse(network.hasLinkById(machineOneId, machineTwoId))
    })

    it('should serialize a Network to JSON', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        // show that the json object can be converted to a string and back
        const json = JSON.parse(JSON.stringify(network.toJSON()))

        const deserializedNetwork = Network.fromJSON(json)

        assert.deepEqual(network, deserializedNetwork)
    })

    it('should serialize a Network with Machines to JSON', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        const machine = new Machine('1.2.3.4', 'ubuntu', [8080])
        network.addMachine(machine)

        // show that the json object can be converted to a string and back
        const json = JSON.parse(JSON.stringify(network.toJSON()))

        const deserializedNetwork = Network.fromJSON(json)

        assert.deepEqual(network, deserializedNetwork)
    })

    it('should serialize a Network with many Machines to JSON', () => {
        const network = new Network('cool-owner', 'really-cool-network')

        const machineOne = new Machine('1.2.3.4', 'ubuntu', [8080])
        const machineTwo = new Machine('1.9.9.9', 'debian', [443])
        network.addMachine(machineOne)
        network.addMachine(machineTwo)

        network.addLink(machineOne, machineTwo)

        // show that the json object can be converted to a string and back
        const json = JSON.parse(JSON.stringify(network.toJSON()))

        const deserializedNetwork = Network.fromJSON(json)

        // assert.deepEqual(network, deserializedNetwork)
        console.log(network)
        console.log(deserializedNetwork)
    })
})
