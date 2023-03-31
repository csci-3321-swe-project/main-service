import {describe, expect, test} from '@jest/globals'
import createServer from '../src/utilities/server'
import {sign} from '../src/utilities/tokens'
import client from '../src/utilities/client'
import {userInput, userPayload, emailQuery} from './testVariables'

 const request = require('supertest')
 const app = createServer()

 let token = ''
 beforeEach(async () => {
     token = sign({userId: "642486eb76ebc32a07efbde",})
 })

describe("Users GET", () => {
    const userArrayPayload = [userPayload]
    describe("Sending email that does exist",() => {
        it("Should return 200 and an array of users", async () => {
            const mockUserSearch = jest
                .spyOn(client.user, "findMany")
                // @ts-ignore
                .mockReturnValueOnce(userArrayPayload)
            const {statusCode, body} = await request(app)
                .get(`/users?${emailQuery}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(userArrayPayload)
            expect(mockUserSearch).toHaveBeenCalledWith({where: { email: "example@email.com" },})
        })
    })
    describe("Sending an email that doesn't exist", () => {
        it("Should return a 400", async () => {
            const mockUserSearch = jest
            .spyOn(client.user, "findMany")
            .mockRejectedValueOnce("Email does not exist")
            const {statusCode} = await request(app)
                .get("/users?email=wrongdotcom")
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(400)
            expect(mockUserSearch).not.toHaveBeenCalled()
        })
    })

})
describe("Users POST", () => {
    describe("Sends correct user inputs", ()=>{
        it("Should return 201 and the created user", async () => {
            const mockCreateUser = jest
                .spyOn(client.user, "create")
                // @ts-ignore
                .mockReturnValueOnce(userPayload)
            const {statusCode, body} = await request(app)
                .post("/users")
                .send(userInput)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(201)
            expect(body).toEqual(userPayload)
            expect(mockCreateUser).toHaveBeenCalledWith({data: {isMock: true,...userInput,}})
        })
    })
    describe("Sends incorrect user inputes", () => {
        it("Should return a 400", async () => {
            const mockCreateUser = jest
                .spyOn(client.user, "create")
                .mockRejectedValueOnce("Incorrect user values")
            const {statusCode} = await request(app)
                .post("/users")
                .send({something: "else"})
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(400)
            expect(mockCreateUser).not.toHaveBeenCalled()
        })
    })
})