import { assert } from 'chai'
import { Event } from '../payload'
import { describe, it } from 'mocha'


describe('Event Test', () => {
    it('should be well tested', () => {
        const jsonPayload = { 'hello': 'world' }
        const testEvent = new Event('MyService', 'MyEvent', jsonPayload)
        
        assert.equal(testEvent.sender, 'MyService')
        assert.equal(testEvent.name, 'MyEvent')
        assert.deepEqual(testEvent.data, jsonPayload)
    })

    it('should serialize Event to JSON', () => {
        const jsonPayload = { 'hello': 'world' }
        const testEvent = new Event('MyService', 'MyEvent', jsonPayload)

        const json = testEvent.toJSON()
        const serializedTestEvent = Event.fromJSON(json)

        assert.deepEqual(testEvent, serializedTestEvent)
    })

    it('should serialize Event to Buffer', () => {
        const jsonPayload = { 'hello': 'world' }
        const testEvent = new Event('MyService', 'MyEvent', jsonPayload)

        const json = testEvent.toBuffer()
        const serializedTestEvent = Event.fromBuffer(json)

        assert.deepEqual(testEvent, serializedTestEvent)
    })
})
