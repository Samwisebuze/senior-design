import { assert } from 'chai'
import { Command } from '../payload'
import { describe, it } from 'mocha'


describe('Command Test', () => {
    it('should be well tested', () => {
        const jsonPayload = { 'hello': 'world' }
        const testCommand = new Command('MyService', 'MyCommand', jsonPayload)
        
        assert.equal(testCommand.sender, 'MyService')
        assert.equal(testCommand.name, 'MyCommand')
        assert.deepEqual(testCommand.data, jsonPayload)
    })

    it('should serialize Event to JSON', () => {
        const jsonPayload = { 'hello': 'world' }
        const testCommand = new Command('MyService', 'MyEvent', jsonPayload)

        const json = testCommand.toJSON()
        const serializedTestEvent = Command.fromJSON(json)

        assert.deepEqual(testCommand, serializedTestEvent)
    })

    it('should serialize Event to Buffer', () => {
        const jsonPayload = { 'hello': 'world' }
        const testEvent = new Command('MyService', 'MyEvent', jsonPayload)

        const json = testEvent.toBuffer()
        const serializedTestEvent = Command.fromBuffer(json)

        assert.deepEqual(testEvent, serializedTestEvent)
    })
})
