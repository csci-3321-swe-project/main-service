import {describe, expect, test} from '@jest/globals'
import app from '../src/index'
import {prismaMock} from './singleton'
const request = require('supertest')
expect.extend({
    
})

describe("Route Tests", () => {
    describe("Account GET", async () => {
        test("Account works", async () => {
        const response = await request(app).get("/account");
        response.print()
        expect(response.body).toEqual("Hello")
        })
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

    })
    describe("Users GET", () => {

    })
    describe("Users POST", () => {
        // test('Should add a new user', async () => {
        //     const user = {
        //         id: "1234",
        //         isMock: true,
        //         role: JSON.parse("STUDENT"),
        //         email: "test@test.edu",
        //         firstName: "Test",
        //         lastName: "McTesterson",
        //         registrations: [],
        //         instructing: [],
        //         instructingIds: [],
        //     }
        //     // await expect(app.post("/users",user))
        // })
    })
})

