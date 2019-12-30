const uuidv4 = require('uuid/v4')
import { JsonProperty, Serializable, deserialize, serialize } from 'typescript-json-serializer'


/**
 * A configuration for a single machine in a computer network.
 * Basically functions as a vertex in a graph.
 */
@Serializable()
export class Machine {
    @JsonProperty()
    readonly version: number = 1 // simple sequential API versioning
    @JsonProperty()
    readonly machineId: string = uuidv4()
    /**
     * Unique software defined ip address
     */
    @JsonProperty()
    address: string
    /**
     * Name of docker image. TODO: replace this with an OSImage type?
     */
    @JsonProperty()
    imageName: string
    /**
     * List of ports to be opened
     * TOOD: allow ranges of ports to be opened
     */
    @JsonProperty()
    openPorts: number[]
    /**
     * Set of machines that are directly accessible from this machine
     */
    @JsonProperty({ onDeserialize: Machine.arrayToMap, onSerialize: Machine.mapToArray })
    private adjacentMachines: Map<string, Machine>

    constructor(address: string, imageName: string, openPorts: number[]) {
        this.address = address
        this.imageName = imageName
        this.openPorts = openPorts
        this.adjacentMachines = new Map<string, Machine>()
    }

    addAdjacentMachine(machine: Machine): void {
        const machineId = machine.machineId
        this.adjacentMachines.set(machineId, machine)
    }

    removeAdjacentMachine(machine: Machine): void {
        const machineId = machine.machineId
        this.removeAdjacentMachineById(machineId)
    }

    removeAdjacentMachineById(machineId: string): void {
        this.adjacentMachines.delete(machineId)
    }

    /**
     * @returns Array<Machine>
     */
    getAdjacentMachines(): Machine[] {
        return Array.from(this.adjacentMachines.values())
    }

    /**
     * Check if a link exists between this machine and
     * another machines
     * 
     * @param otherMachine
     * @returns Boolean
     */
    hasLink(otherMachine: Machine): Boolean {
        const otherMachineId = otherMachine.machineId
        return this.hasLinkById(otherMachineId)
    }

    /**
     * Check if a link exists between this machine and
     * another machines given
     * 
     * @param otherMachineId
     * @returns Boolean
     */
    hasLinkById(otherMachineId: string): Boolean {
        return this.adjacentMachines.has(otherMachineId)
    }

    /**
     * Serialze a Machine to JSON
     * Note: doesn't serialize circular links of machines
     * 
     * @returns Object
     */
    toJSON(): Object {
        return Object(serialize(this))
    }

    /**
     * Deserialize JSON to a Machine
     * @param jsonData
     * @returns Machine
     */
    static fromJSON(jsonData: Object): Machine {
        return deserialize(jsonData, Machine)
    }

    // Serialization helper
    private static mapToArray(map: Map<string, Machine>): Object[] {
        return Array
                .from(map.entries())
                .map(entry => {
                    const [_, machine] = entry
                    return Object.assign({}, machine)
                })
    }
    
    // Deserialization helper
    private static arrayToMap(array: Object[]): Map<string, Machine> {
        const result = new Map<string, Machine>()

        if (Object.keys(array).length == 0) {
            return result
        }

        for (const item of array) {
            const machine = Machine.fromJSON(item)
            result.set(machine.machineId, machine)
        }
    
        return result
    }
}
