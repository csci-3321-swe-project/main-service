import {describe, expect} from '@jest/globals'
import createServer from '../src/utilities/server'
import {sign, parse} from '../src/utilities/tokens'
import client from '../src/utilities/client'
import {adminPayload, invalRoleUserPayload} from './testVariables'

 const request = require('supertest')
 const app = createServer()

 let token = ''
 beforeEach(async () => {
     token = sign({userId: "642486eb76ebc32a07efbde",})
     jest.resetAllMocks()
 })

describe("Testing account requests", () => {
    describe("Account GET", () => {
        describe("Sending request with valid token", () => {
            it("Should return a 200 and a user", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user,"findUnique")
                    // @ts-ignore
                    .mockReturnValue(adminPayload)
                const {statusCode, body} = await request(app)
                    .get("/account")
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(adminPayload)
                expect(mockAuthorization).toHaveBeenCalledWith({where: {id: parse(token).userId}})
            })
        })
        describe("Sending request with a token not tied to a user", () => {
            it("Should return a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user,"findUnique")
                    // @ts-ignore
                    .mockReturnValue(null)
                const {statusCode} = await request(app)
                    .get("/account")
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(401)
                expect(mockAuthorization).toHaveBeenCalledWith({where: {id: parse(token).userId}})
            })
        })
        describe("Returning user with incorrect roles", () => {
            it("Should return a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user,"findUnique")
                    // @ts-ignore
                    .mockReturnValue(invalRoleUserPayload)
                const {statusCode} = await request(app)
                    .get("/account")
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(401)
                expect(mockAuthorization).toHaveBeenCalledWith({where: {id: parse(token).userId}})
            })
        })
        describe("Sending with no header", () => {
            it("Should send a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user,"findUnique")
                    // @ts-ignore
                    .mockRejectedValueOnce(null) //findUnique returning a null because it's supposed to not find the value based on the token
                const {statusCode} = await request(app)
                    .get("/account")
                expect(statusCode).toBe(401)
                expect(mockAuthorization).not.toHaveBeenCalled()
            })
        })
        describe("Sending with incorrect header", () => {
            it("Should send a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user,"findUnique")
                    // @ts-ignore
                    .mockRejectedValueOnce(null)
                const {statusCode} = await request(app)
                    .get("/account")
                    .set('Header',"Hi")
                expect(statusCode).toBe(401)
                expect(mockAuthorization).not.toHaveBeenCalled()
            })
        })
        describe("Sending with incorrect identifier", () => {
            it("Should send a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user,"findUnique")
                    // @ts-ignore
                    .mockRejectedValueOnce("No header")
                const {statusCode} = await request(app)
                    .get("/account")
                    .set('Authorization',"Hi")
                expect(statusCode).toBe(401)
                expect(mockAuthorization).not.toHaveBeenCalled()
            })
        })
    })
})