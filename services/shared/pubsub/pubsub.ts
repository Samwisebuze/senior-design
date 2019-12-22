const ampq = require('ampq-ts')


interface rabbitSubscriber {
    connection: object, // connection to ampq-broker
    exchange: object // connection to message queue
}

export class Subscriber implements rabbitSubscriber  {
    readonly connection: object = null

    readonly exchange: object = null

    /**
     * @param connection address of ampq-broker
     * @param exchange name of the exchange queue
     */
    constructor(connection: string, exchange: string) {
        this.connection = new ampq.Connection(connection)
        this.exchange = this.connection.declareExchange(exchange) 
    }
}


