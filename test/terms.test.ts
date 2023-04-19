import {describe, expect} from '@jest/globals'
import createServer from '../src/utilities/server'
import {sign} from '../src/utilities/tokens'
import client from '../src/utilities/client'
import { adminPayload, termPayload, userId } from './testVariables'

const request = require('supertest')
const app = createServer()

let token = ''
beforeEach(async () => {
    token = sign(userId)
    jest.resetAllMocks()
})

describe("Testing term requests", () => {
    describe("Terms GET", () => {
        describe("Sending with admin authorization", () => {
            it("Should return a 200 and the terms", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTerms = jest
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValue(termPayload)
                const {statusCode, body} = await request(app)
                    .get('/terms')
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(termPayload)
                expect(mockTerms).toHaveBeenCalledWith({
                    orderBy: { startTime: "desc"},
                })
            })
        })
    })
    describe("Current term GET", () => {
        
    })
    describe("TermId GET", () => {
        
    })
    describe("TermId DELETE", () => {
        
    })
})