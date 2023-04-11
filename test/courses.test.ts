import {describe, expect} from '@jest/globals'
import createServer from '../src/utilities/server'
import {sign} from '../src/utilities/tokens'
import client from "../src/utilities/client"
import {courseInput, coursePayload, invalidCourseInput, studentPayload, adminPayload, professorPayload, courseInfoPayload, courseId} from "./testVariables"

const request = require('supertest')
 const app = createServer()

 let token = ''
 beforeEach(async () => {
     token = sign({userId: "642486eb76ebc32a07efbde",})
 })

describe("Testing course requests", () => {
    describe("Courses GET", () => {
        test("mock test", () => {
            expect(true).toBe(true)
        })
    })
    describe("Courses POST", () => {
        describe("Sending with administrator authorization and course", () => {
            it("Should return a 201 and the created course", async () => {
                const mockCourseCreation = jest
                    .spyOn(client.course, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(coursePayload)
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const {statusCode, body} = await request(app)
                    .post("/courses")
                    .send(courseInput)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(201)
                expect(body).toEqual(coursePayload)
                expect(mockCourseCreation).toHaveBeenLastCalledWith({data: courseInput})
                expect(mockAuthorization).toHaveBeenCalled()
            })
        })
        describe("Sending with administrator authorization but invalid course", () => {
            it("Should return a 400", async () => {
                const mockCourseCreation = jest
                    .spyOn(client.course, "create")
                    // @ts-ignore
                    .mockRejectedValueOnce("Invalid input")
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const {statusCode} = await request(app)
                    .post("/courses")
                    .send(invalidCourseInput)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(400)
                expect(mockCourseCreation).not.toHaveBeenCalled()
                expect(mockAuthorization).toHaveBeenCalled()
            })
        })
        describe("Sending non administrator authorization", () => {
            it("Should return a 401", async () => {
                const mockCourseCreation = jest
                    .spyOn(client.course, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(coursePayload)
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const {statusCode} = await request(app)
                    .post("/courses")
                    .send(invalidCourseInput)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(401)
                expect(mockAuthorization).toHaveBeenCalled()
                expect(mockCourseCreation).not.toHaveBeenCalled()
            })
        })
    })
    describe("CourseId GET", () => {
        describe("Sending with administration authorization", () =>{
            it("Should return a 200 and the course and a existing courseId", async ()=>{
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockCourseId = jest
                    .spyOn(client.course, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(courseInfoPayload)
                const {statusCode, body} = await request(app)
                    .get(`/courses/${courseId.courseId}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(courseInfoPayload)
                expect(mockCourseId).toHaveBeenLastCalledWith({
                    where: {id: `${courseId.courseId}`},
                    include: {courseSections: {include: {instructors: true}}}
                })
            })
        })
        describe("Sending with student authorization", () =>{
            it("Should return a 200 and the course and a existing courseId", async ()=>{
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockCourseId = jest
                    .spyOn(client.course, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(courseInfoPayload)
                const {statusCode, body} = await request(app)
                    .get(`/courses/${courseId.courseId}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(courseInfoPayload)
                expect(mockCourseId).toHaveBeenLastCalledWith({
                    where: {id: `${courseId.courseId}`},
                    include: {courseSections: {include: {instructors: true}}}
                })
            })
        })
        describe("Sending with professor authorization", () =>{
            it("Should return a 200 and the course and a existing courseId", async ()=>{
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(professorPayload)
                const mockCourseId = jest
                    .spyOn(client.course, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(courseInfoPayload)
                const {statusCode, body} = await request(app)
                    .get(`/courses/${courseId.courseId}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(courseInfoPayload)
                expect(mockCourseId).toHaveBeenLastCalledWith({
                    where: {id: `${courseId.courseId}`},
                    include: {courseSections: {include: {instructors: true}}}
                })
            })
        })
        describe("Sending no authorization", () =>{
            it("Should return a 401", async ()=>{
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockCourseId = jest
                    .spyOn(client.course, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(courseInfoPayload)
                const {statusCode} = await request(app)
                    .get(`/courses/${courseId.courseId}`)
                expect(statusCode).toBe(401)
                expect(mockCourseId).not.toHaveBeenCalled()
            })
         })
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
})