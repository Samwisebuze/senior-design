const uuidv1 = require('uuid/v4');

interface RabbitPayload {
    version: number, // sequentual numebering system for payload API version
    id: string,
    sender: string,
    type: string, // Event
    name: string, // Event name
    data: object
}

export class Event implements RabbitPayload  {
    readonly version: number = 1 // sequentual numebering system
    readonly id: string = uuidv1()
    sender: string
    readonly type: string = 'Event'
    name: string
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
}

export class Command implements RabbitPayload  {
    readonly version: number = 1 // sequentual numebering system
    readonly id: string = uuidv1()
    sender: string
    readonly type: string = 'Command'
    name: string
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
}
