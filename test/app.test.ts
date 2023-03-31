import {describe, expect, test} from '@jest/globals'
import createServer from '../src/utilities/server'
import {prismaMock} from './singleton'
import {sign} from '../src/utilities/tokens'
import { ClientRequest } from 'http'
import client from '../src/utilities/client'
import { Prisma } from '@prisma/client'
const request = require('supertest')

const app = createServer()

let token = ''
beforeEach(() => {
    
})
beforeAll(async () => {
    token = sign({userId: "642486eb76ebc32a07efbde",})
})
afterAll( () => {
    
})

describe("Testing Requests", () => {
    describe("Account GET", () => {

    })
    describe("Courses GET", () => {

    })
    describe("Courses POST", () => {

    })
    describe("CourseId GET", () => {

    })
    describe("CourseId PUT", () => {

    })
    describe("CourseId DELETE", () => {

    })
    describe("Sections POST", () => {

    })
    describe("SectionId GET", () => {

    })
    describe("SectionId DELETE", () => {

    })
    describe("SectionId PUT", () => {

    })
    describe("Registrations GET", () => {

    })
    describe("Registrations POST", () => {

    })
    describe("Registrations DELETE", () => {

    })
    describe("Options GET", () => {

    })
    describe("Tokens POST", () => {
        const input = {
            email: "example@email.com"
        }
        const userPayload = {
            id:"642486eb76ebc32a07efbde",
            isMock: true,
            role: "ADMINISTRATOR",
            email: "example@email.com",
            firstName: "Example",
            lastName: "User",
            instructingIds: [],
        }
        describe("Sent valid email", () => {
            it("Should return 201 and token", async () => {
                const mockTokenCreation = jest
                    .spyOn(client.user, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload)
                const {statusCode, text} = await request(app)
                    .post("/tokens")
                    .send(input)
                expect(statusCode).toBe(201)
                expect(text).toEqual(token)
                // @ts-ignore
                expect(mockTokenCreation).toHaveBeenCalledWith({where: {email: input.email}})
            })
        })
    })
    describe("Users GET", () => {
        const userPayload = [ 
            {
                id:"642486eb76ebc32a07efbde",
                isMock: true,
                role: "ADMINISTRATOR",
                email: "example@email.com",
                firstName: "Example",
                lastName: "User",
                instructingIds: [],
            }
        ]
        const query = "email=example@email.com"
        describe("Sending email that does exist",() => {
            it("Should return 200 and an array of users", async () => {
                const mockUserSearch = jest
                    .spyOn(client.user, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload)
                const {statusCode, body} = await request(app)
                    .get(`/users?${query}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(userPayload)
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
        const userInput = {
            email: "example@email.com",
            firstName: "Example",
            lastName: "User",
            role: "ADMINISTRATOR",
        }
        const userPayload = {
            id:"642486eb76ebc32a07efbde",
            isMock: true,
            role: "ADMINISTRATOR",
            email: "example@email.com",
            firstName: "Example",
            lastName: "User",
            instructingIds: [],
        }
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
})
