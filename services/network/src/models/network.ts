const uuidv4 = require('uuid/v4')
import { Machine } from './machine'
import { JsonProperty, Serializable, deserialize, serialize } from 'typescript-json-serializer'


/**
 * Overarching definition of a computer network: an organized
 * collection of machines in a graph.
 */
@Serializable()
export class Network {
    @JsonProperty()
    readonly version: number = 1 // simple sequential API versioning

    @JsonProperty()
    readonly owner: string // TODO: replace this with a User type?

    /**
     * Unique identifier generated for the network
     */
    @JsonProperty()
    readonly networkId: string = uuidv4()

    @JsonProperty()
    networkName: string

    @JsonProperty()
    readonly createdAt: Date

    @JsonProperty()
    updatedAt: Date

    /**
     * Set of all machines in the network
     */
    @JsonProperty({ onDeserialize: Network.arrayToMap, onSerialize: Network.mapToArray })
    private machines: Map<string, Machine>

    constructor(owner: string, networkName: string) {
        this.owner = owner
        this.networkName = networkName
        this.machines = new Map<string, Machine>()

        const now = new Date()
        this.createdAt = now
        this.updatedAt = now
    }

    /**
     * Retrieve all machines in the network
     */
    getAllMachines(): Machine[] {
        return Array.from(this.machines.values())
    }

    /**
     * Add a new machine to the network.
     * Does nothing if the machine already exists in the network.
     * 
     * @param machine
     */
    addMachine(machine: Machine): void {
        const machineId = machine.machineId
        this.machines.set(machineId, machine)
        this.updatedAt = new Date()
    }

    /**
     * Remove a machine from a network. Also removes the machine
     * as an adjacent machine from the necessary machines.
     * Does nothing if the machine doesn't exist in the network
     * 
     * @param machine 
     */
    removeMachine(machine: Machine): void {
        const adjacentMachines = machine.getAdjacentMachines()

        const machineId = machine.machineId
        this.machines.delete(machineId)

        // Remove links between machine and other machines
        for (const adjacent of adjacentMachines) {
            // If the adjacent machine exists in the network,
            // remove `machine` as being adjacent to it
            const adjacentMachineId = adjacent.machineId
            if (this.machines.has(adjacentMachineId)) {
                adjacent.removeAdjacentMachine(machine)
            }
        }

        this.updatedAt = new Date()
    }

    /**
     * Create a link between two existing machines in the network.
     * Links are created in both directions.
     * If a machine doesn't exist in the network, it is added.
     * 
     * @param firstMachine
     * @param secondMachine 
     */
    addLink(firstMachine: Machine, secondMachine: Machine): void {
        if (!this.machines.has(firstMachine.machineId)) {
            this.addMachine(firstMachine)
        }
        if (!this.machines.has(secondMachine.machineId)) {
            this.addMachine(secondMachine)
        }

        firstMachine.addAdjacentMachine(secondMachine)
        secondMachine.addAdjacentMachine(firstMachine)

        this.updatedAt = new Date()
    }

    /**
     * Create a link between two existing machines in the network.
     * Links are created in both directions.
     * If a machine's id is not already in the network, the link is
     * not created.
     * 
     * @param firstMachineId 
     * @param secondMachineId 
     */
    addLinkById(firstMachineId: string, secondMachineId: string): void {
        const firstMachine = this.machines.get(firstMachineId)
        const secondMachine = this.machines.get(secondMachineId)

        if (firstMachine == undefined || secondMachine == undefined) {
            return
        }

        // Both machines exist, so carry out the link
        this.addLink(firstMachine, secondMachine)
    }

    /**
     * Break the link between two machines given their objects,
     * but keep both machines in the network
     * 
     * @param firstMachine
     * @param secondMachine 
     */
    removeLink(firstMachine: Machine, secondMachine: Machine): void {
        firstMachine.removeAdjacentMachine(secondMachine)
        secondMachine.removeAdjacentMachine(firstMachine)
        this.updatedAt = new Date()
    }

    /**
     * Break the link between two machines given their ids,
     * but keep both machines in the network.
     * Does nothing if either machine doesn't exist.
     * 
     * @param firstMachineId
     * @param secondMachineId
     */
    removeLinkById(firstMachineId: string, secondMachineId: string): void {
        const firstMachine = this.machines.get(firstMachineId)
        const secondMachine = this.machines.get(secondMachineId)

        // Check if these machines exist
        if (firstMachine != undefined && secondMachine != undefined) {
            this.removeLink(firstMachine, secondMachine)
        }
    }

    /**
     * Check if a link exists between two machines
     * 
     * @param firstMachine
     * @param secondMachine
     * @returns Boolean
     */
    hasLink(firstMachine: Machine, secondMachine: Machine): Boolean {
        return firstMachine.hasLink(secondMachine)
    }

    /**
     * Check if a link exists between two machines.
     * If one of the machines doesn't exist, this method returns false.
     * 
     * @param firstMachineId
     * @param secondMachineId
     */
    hasLinkById(firstMachineId: string, secondMachineId: string): Boolean {
        const firstMachine = this.machines.get(firstMachineId)
        const secondMachine = this.machines.get(secondMachineId)

        // Check if these machines exist
        if (firstMachine != undefined && secondMachine != undefined) {
            return this.hasLink(firstMachine, secondMachine)
        }

        return false
    }

    toJSON(): Object {
        return Object(serialize(this))
    }

    static fromJSON(jsonData: Object): Network {
        // @ts-ignore
        const linkListData: Object[] | undefined = jsonData.machines.linkList
        const resultNetwork = deserialize(jsonData, Network)
        const originalUpdatedAt = resultNetwork.updatedAt

        // Final step: re-link machines in the Network as necessary
        if (linkListData !== undefined) {
            for (const link of linkListData) {
                // @ts-ignore
                const from: string = link.from
                // @ts-ignore
                const to: string = link.to

                resultNetwork.addLinkById(from, to)
            }
        }

        // Hacky but it works: Reset the updatedAt datetime to the original value
        // (`addLinkById` automatically updates this when called above)
        resultNetwork.updatedAt = originalUpdatedAt

        return resultNetwork
    }

    /**
     * Serialize a Network to a Buffer
     * 
     * @returns Buffer
     */
    toBuffer(): Buffer {
        return Buffer.from(JSON.stringify(this.toJSON()))
    }

    /**
     * Deserialize a Buffer to a Network instance
     * 
     * @param buffer
     * @returns Network
     */
    static fromBuffer(buffer: Buffer): Network {
        return this.fromJSON(JSON.parse(buffer.toString()))
    }

    /**
     * Serialization helper: Serializes all machines in the network to
     * a list of Machine objects and a list of links between machines
     * 
     * @param map
     * @returns Object
     */
    private static mapToArray(map: Map<string, Machine>): Object {
        // Generate a list of machines in the Network
        const machineList = Array
                .from(map.entries())
                .map(entry => {
                    const [_, machine] = entry
                    return Object.assign({}, machine.toJSON())
                })

        // Generate a list of links between machines in the Network
        // TODO: this generates twice the amount of data as needed. fix that.
        const linkList = Array
                .from(map.entries())
                .flatMap(entry => {
                    const [_, machine] = entry
                    return machine
                            .getAdjacentMachines()
                            .map(adjacentMachine => {
                                return {
                                    from: machine.machineId,
                                    to: adjacentMachine.machineId
                                }
                            })
                })

        return { machineList, linkList }
    }

    /**
     * Serialization helper: Serializes all machines in the network to
     * a list of Machine objects and a list of links between machines
     * 
     * @param input
     * @returns Map<string, Machine>
     */
    private static arrayToMap(input: Object): Map<string, Machine> {
        const result = new Map<string, Machine>()
        // @ts-ignore
        const machineList: Object[] = input.machineList

        if (Object.keys(machineList).length == 0) {
            return result
        }

        // Deserialize each machine in the network
        for (const item of machineList) {
            const machine = Machine.fromJSON(item)
            result.set(machine.machineId, machine)
        }

        // Note: Re-linking the machines in the Network is handled by `fromJSON`
        return result
    }
}