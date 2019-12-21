const uuidv4 = require('uuid/v4');


/**
 * A configuration for a single machine in a computer network.
 * Basically functions as a vertex in a graph.
 */
export class Machine {
    readonly version: number = 1 // simple sequential API versioning
    readonly machineId: string = uuidv4()
    /**
     * Unique software defined ip address
     */
    address: string
    /**
     * Name of docker image. TODO: replace this with an OSImage type?
     */
    imageName: string
    /**
     * List of ports to be opened
     * TOOD: allow ranges of ports to be opened
     */
    openPorts: number[]
    /**
     * Set of machines that are directly accessible from this machine
     */
    private adjacentMachines: Set<Machine>

    constructor(address: string, imageName: string, openPorts: number[]) {
        this.address = address
        this.imageName = imageName
        this.openPorts = openPorts
        this.adjacentMachines = new Set<Machine>()
    }

    addAdjacentMachine(machine: Machine): void {
        this.adjacentMachines.add(machine)
    }

    removeAdjacentMachine(machine: Machine): void {
        this.adjacentMachines.delete(machine)
    }

    /**
     * @returns Set<Machine>
     */
    getAdjacentMachines(): Set<Machine> {
        return this.adjacentMachines
    }

    /**
     * Check if a link exists between this machine and
     * another machines
     * 
     * @param otherMachine
     * @returns Boolean
     */
    hasLink(otherMachine: Machine): Boolean {
        return this.adjacentMachines.has(otherMachine)
    }
}


/**
 * Overarching definition of a computer network: an organized
 * collection of machines in a graph.
 */
export class Network {
    readonly version: number = 1 // simple sequential API versioning
    readonly owner: string // TODO: replace this with a User type?
    /**
     * Unique identifier generated for the network
     */
    readonly networkId: string = uuidv4()
    networkName: string
    readonly createdAt: Date
    updatedAt: Date
    /**
     * Set of all machines in the network
     */
    private machines: Set<Machine>

    constructor(owner: string, networkName: string) {
        this.owner = owner
        this.networkName = networkName
        this.machines = new Set<Machine>()

        const now = new Date()
        this.createdAt = now
        this.updatedAt = now
    }

    /**
     * Retrieve all machines in the network
     */
    getAllMachines(): Machine[] {
        return Array.from(this.machines)
    }

    /**
     * Add a new machine to the network.
     * Does nothing if the machine already exists in the network.
     * 
     * @param machine
     */
    addMachine(machine: Machine): void {
        this.machines.add(machine)
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
        const adjacentMachines = Array.from(machine.getAdjacentMachines())

        this.machines.delete(machine)

        // Remove links between machine and other machines
        for (const adjacent of adjacentMachines) {
            // If the adjacent machine exists in the network,
            // remove `machine` as being adjacent to it
            if (this.machines.has(adjacent)) {
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
        if (!this.machines.has(firstMachine)) {
            this.addMachine(firstMachine)
        }
        if (!this.machines.has(secondMachine)) {
            this.addMachine(secondMachine)
        }

        firstMachine.addAdjacentMachine(secondMachine)
        secondMachine.addAdjacentMachine(firstMachine)

        this.updatedAt = new Date()
    }

    /**
     * Break the link between two machine, but keep both machines
     * in the network
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
     * Check if a link exists between two machines
     * 
     * @param firstMachine
     * @param secondMachine
     * @returns Boolean
     */
    hasLink(firstMachine: Machine, secondMachine: Machine): Boolean {
        return firstMachine.hasLink(secondMachine)
    }
}
