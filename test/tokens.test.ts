import {describe, expect, test} from '@jest/globals'
import createServer from '../src/utilities/server'
import {sign, parse} from '../src/utilities/tokens'
import client from '../src/utilities/client'
import {userPayload,emailInput,nonMockUserPayload} from './testVariables'

 const request = require('supertest')
 const app = createServer()

 let token = ''
 beforeEach(async () => {
     token = sign({userId: "642486eb76ebc32a07efbde",})
 })

describe("Tokens POST", () => {
    describe("Sent valid email", () => {
        it("Should return 201 and token", async () => {
            const mockTokenCreation = jest
                .spyOn(client.user, "findUniqueOrThrow")
                // @ts-ignore
                .mockReturnValueOnce(userPayload)
            const {statusCode, text} = await request(app)
                .post("/tokens")
                .send(emailInput)
            expect(statusCode).toBe(201)
            expect(text).toEqual(token)
            // @ts-ignore
            expect(mockTokenCreation).toHaveBeenCalledWith({where: {email: emailInput.email}})
        })
    })
    describe("Sent invalid email", () => {
        it("Should return a 500", async () => {
            const mockTokenCreation = jest
                .spyOn(client.user, "findUniqueOrThrow")
                // @ts-ignore
                .mockRejectedValueOnce("Invalid email")
            const {statusCode } = await request(app)
                .post("/tokens")
                .send(emailInput)
            expect(statusCode).toBe(500)
            expect(mockTokenCreation).toHaveBeenCalled()
        })
    })
    describe("Found user is not a mock user", () => {
        it("Should return a 400", async () => {
            const mockTokenCreation = jest
                .spyOn(client.user, "findUniqueOrThrow")
                // @ts-ignore
                .mockReturnValueOnce(nonMockUserPayload)
            const {statusCode } = await request(app)
                .post("/tokens")
                .send(emailInput)
            expect(statusCode).toBe(400)
            expect(mockTokenCreation).toHaveBeenCalled()
        })
    })
})