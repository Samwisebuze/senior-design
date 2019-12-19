const uuidv1 = require('uuid/v4');

interface RabbitPayload {
    id: string,
    sender: string,
    type: string, // Event
    name: string, // Event name
    data: object
}

export class Event implements RabbitPayload  {
    id: string = uuidv1()
    sender: string
    type: string = 'Event'
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
    id: string = uuidv1()
    sender: string
    type: string = 'Command'
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
