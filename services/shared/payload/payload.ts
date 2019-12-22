const uuidv1 = require('uuid/v4');
import { JsonProperty, Serializable, deserialize, serialize } from 'typescript-json-serializer'


interface RabbitPayload {
    version: number, // sequentual numebering system for payload API version
    id: string,
    sender: string,
    type: string, // Event
    name: string, // Event name
    data: object
}

@Serializable()
export class Event implements RabbitPayload  {
    @JsonProperty()
    readonly version: number = 1 // sequentual numebering system

    @JsonProperty()
    readonly id: string = uuidv1()

    @JsonProperty()
    sender: string

    @JsonProperty()
    readonly type: string = 'Event'

    @JsonProperty()
    name: string

    @JsonProperty()
    data: object

    /**
     * @param sender name of the sender service
     * @param name name of the command
     * @param data JSON object
     */
    constructor(sender: string, name: string, data: object) {
        this.sender = sender
        this.name = name
        this.data = data
    }

    /**
     * Serialize an Event to a common JSON object
     *
     * @returns Object
     */
    toJSON(): Object {
        return Object(serialize(this))
    }

    /**
     * Deserialize a JSON Object to an Event instance
     * 
     * @param json
     * @returns Event
     */
    static fromJSON(json: Object): Event {
        return deserialize(json, Event)
    }

    /**
     * Serialize an Event to a Buffer
     * 
     * @returns Buffer
     */
    toBuffer(): Buffer {
        return Buffer.from(JSON.stringify(this.toJSON()))
    }

    /**
     * Deserialize a Buffer to an Event instance
     * 
     * @param buffer
     * @returns Event
     */
    static fromBuffer(buffer: Buffer): Event {
        return deserialize(JSON.parse(buffer.toString()), Event)
    }
}


@Serializable()
export class Command implements RabbitPayload  {
    @JsonProperty()
    readonly version: number = 1 // sequentual numebering system

    @JsonProperty()
    readonly id: string = uuidv1()

    @JsonProperty()
    sender: string
    
    @JsonProperty()
    readonly type: string = 'Command'
    
    @JsonProperty()
    name: string
    
    @JsonProperty()
    data: object

    /**
     * @param sender name of the sender service
     * @param name name of the command
     * @param data JSON object
     */
    constructor(sender: string, name: string, data: object) {
        this.sender = sender
        this.name = name
        this.data = data
    }

    /**
     * Serialize a Command to a common JSON object
     *
     * @returns Object
     */
    toJSON(): Object {
        return Object(serialize(this))
    }

    /**
     * Deserialize a JSON Object to a Command instance
     * 
     * @param json
     * @returns Command
     */
    static fromJSON(json: Object): Command {
        return deserialize(json, Command)
    }

    /**
     * Serialize a Command to a Buffer
     * 
     * @returns Buffer
     */
    toBuffer(): Buffer {
        return Buffer.from(JSON.stringify(this.toJSON()))
    }

    /**
     * Deserialize a Buffer to a Command instance
     * 
     * @param buffer
     * @returns Command
     */
    static fromBuffer(buffer: Buffer): Command {
        return deserialize(JSON.parse(buffer.toString()), Command)
    }
}
