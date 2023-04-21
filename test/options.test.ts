import {describe, expect, test} from '@jest/globals'
import createServer from '../src/utilities/server'
import {optionsPayload} from './testVariables'

 const request = require('supertest')
 const app = createServer()

describe("Options GET", () => {
    describe("Getting options", () => {
        it("Should return a body of all options", async () => {
            const {statusCode, body} = await request(app)
                .get("/options")
            expect(statusCode).toBe(200)
            expect(body).toEqual(optionsPayload)
        })
    })
})