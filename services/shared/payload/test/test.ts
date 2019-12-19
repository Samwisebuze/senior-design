import { assert } from 'chai'
import { Command, Event } from '../payload'
import { describe, it } from 'mocha'

describe('Command Test', () => {
    it('should be well tested', () => {
        const jsonPayload = { 'hello': 'world' }
        const testCommand = new Command('MyService', 'MyCommand', jsonPayload)
        
        assert.equal(testCommand.sender, 'MyService')
        assert.equal(testCommand.name, 'MyCommand')
        assert.deepEqual(testCommand.data, jsonPayload)
    })
})

describe('Event Test', () => {
    it('should be well tested', () => {
        const jsonPayload = { 'hello': 'world' }
        const testCommand = new Event('MyService', 'MyEvent', jsonPayload)
        
        assert.equal(testCommand.sender, 'MyService')
        assert.equal(testCommand.name, 'MyEvent')
        assert.deepEqual(testCommand.data, jsonPayload)
    })
})
