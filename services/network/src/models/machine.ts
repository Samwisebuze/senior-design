const uuidv4 = require('uuid/v4')
import * as mongoose from 'mongoose'
import { JsonProperty, Serializable, deserialize, serialize } from 'typescript-json-serializer'


const mongoSchema = new mongoose.Schema({
    version: {
        type: Number,
        required: true
    },
    machineId: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    openPorts: [Number],
    adjacentMachines: [String],
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: Date
})

interface MachineDocument extends mongoose.Document {
    machineId: string,
    address: string,
    imageName: string,
    openPorts: Array<number>,
    adjacentMachines: Array<string>,
    createdAt: Date,
    updatedAt: Date
}

interface MachineModel extends mongoose.Model<MachineDocument> {
    getList(): Promise<MachineDocument[]>

    get(machineId: string): Promise<MachineDocument>

    add({
        address,
        imageName,
        openPorts
    }: {
        address: string
        imageName: string
        openPorts: Array<number>
    }): Promise<MachineDocument>

    edit({
        machineId,
        machineDoc
    }: {
        machineId: string
        machineDoc: MachineDocument
    }): Promise<MachineDocument>

    delete({
        machineId
    }: {
        machineId: string
    }): Promise<void>
}

class MachineClass extends mongoose.Model {
    public static async getList() {
        return this.find().sort({ createdAt: 1 })
    }

    public static async get(machineId) {
        if (!machineId) {
            throw new Error('Invalid Id')
        }
        return this.findOne({ machineId })
    }

    public static async add({ address, imageName, openPorts }) {
        if (!address) {
            throw new Error('Invalid Input')
        }
        if (!imageName) {
            throw new Error('Invalid Input')
        }
        if (!openPorts) {
            openPorts = new Array<number>()
        }

        const machineId = uuidv4()
        const adjacentMachines = new Array<string>()

        const machine = this.create({
            machineId,
            address,
            imageName,
            openPorts,
            adjacentMachines,
            createdAt: Date.now()
        })

        return machine
    }

    public static async edit({ machineId, machineDoc}) {
        if(!machineId || !machineDoc)
        {
            throw new Error('Invalid Input')
        }

        const updatedMachine = this.findOneAndUpdate(
            {machineId: machineId},
            { 
                imageName: machineDoc.imageName,
                address: machineDoc.address,
                openPorts: machineDoc.openPorts,
                adjacentMachines: machineDoc.adjacentMachines,
                updatedAt: Date.now()
            },
            { runValidators: true, new: true }
        )
    }

    public static async delete({machineId})
    {
        if (!machineId){
            throw new Error('Invalid Id')
        }

        await this.deleteOne({ machineId: machineId })
    }

}

mongoSchema.loadClass(MachineClass)

const Machine = mongoose.model<MachineDocument, MachineModel>('Machine', mongoSchema)

export default Machine
export { MachineDocument }

// /** 
//  * A configuration for a single machine in a computer network.
//  * Basically functions as a vertex in a graph.
//  */
// @Serializable()
// export class Machine {
//     @JsonProperty()
//     readonly version: number = 1 // simple sequential API versioning

//     @JsonProperty()
//     readonly machineId: string = uuidv4()

//     /**
//      * Unique software defined ip address
//      */
//     @JsonProperty()
//     address: string

//     /**
//      * Name of docker image. TODO: replace this with an OSImage type?
//      */
//     @JsonProperty()
//     imageName: string

//     /**
//      * List of ports to be opened
//      * TOOD: allow ranges of ports to be opened
//      */
//     @JsonProperty()
//     openPorts: number[]

//     /**
//      * Set of machines that are directly accessible from this machine
//      */
//     @JsonProperty({ onDeserialize: Machine.arrayToMap, onSerialize: Machine.mapToArray })
//     private adjacentMachines: Map<string, Machine>

//     constructor(address: string, imageName: string, openPorts: number[]) {
//         this.address = address
//         this.imageName = imageName
//         this.openPorts = openPorts
//         this.adjacentMachines = new Map<string, Machine>()
//     }

//     addAdjacentMachine(machine: Machine): void {
//         const machineId = machine.machineId
//         this.adjacentMachines.set(machineId, machine)
//     }

//     removeAdjacentMachine(machine: Machine): void {
//         const machineId = machine.machineId
//         this.removeAdjacentMachineById(machineId)
//     }

//     removeAdjacentMachineById(machineId: string): void {
//         this.adjacentMachines.delete(machineId)
//     }

//     /**
//      * @returns Array<Machine>
//      */
//     getAdjacentMachines(): Machine[] {
//         return Array.from(this.adjacentMachines.values())
//     }

//     /**
//      * Check if a link exists between this machine and
//      * another machines
//      * 
//      * @param otherMachine
//      * @returns Boolean
//      */
//     hasLink(otherMachine: Machine): Boolean {
//         const otherMachineId = otherMachine.machineId
//         return this.hasLinkById(otherMachineId)
//     }

//     /**
//      * Check if a link exists between this machine and
//      * another machines given
//      * 
//      * @param otherMachineId
//      * @returns Boolean
//      */
//     hasLinkById(otherMachineId: string): Boolean {
//         return this.adjacentMachines.has(otherMachineId)
//     }

//     /**
//      * Serialze a Machine to JSON
//      * Note: doesn't serialize circular links of machines
//      * 
//      * @returns Object
//      */
//     toJSON(): Object {
//         return Object(serialize(this))
//     }

//     /**
//      * Deserialize JSON to a Machine
//      * @param jsonData
//      * @returns Machine
//      */
//     static fromJSON(jsonData: Object): Machine {
//         return deserialize(jsonData, Machine)
//     }

//     /**
//      * Serialization helper: reduces the `adjacentMachines` Map down to
//      * a list of machine ids that are adjacent.
//      * Although this method loses detail in linked machines once deserialized,
//      * this method works when serialized from a Network of machines.
//      * A simple serialization of the `adjacentMachines` Map wouldn't work
//      * in this case because it can have an infinite number of circular links.
//      * 
//      * Therefore, always serialize a Network, not a Machine.
//      * This method return details are extraneous if you're just serializing
//      * a Network of Machines.
//      * TODO: think about simplifying this method down.
//      * 
//      * @param map
//      * @returns Array
//      */
//     private static mapToArray(map: Map<string, Machine>): string[] {
//         return Array
//             .from(map.entries())
//             .map(entry => {
//                 const [_, machine] = entry
//                 return machine.machineId
//             })
//     }

//     /**
//      * Deserialization helper: does almost nothing to `adjacentMachines`.
//      * In serialization/deserialization, the Network is responsible for
//      * re-linking machines together.
//      * 
//      * @param _ 
//      * @returns Map<string, Machine>
//      */
//     private static arrayToMap(_: string[]): Map<string, Machine> {
//         return new Map<string, Machine>()
//     }
// }