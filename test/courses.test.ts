import {describe, expect} from '@jest/globals'
import createServer from '../src/utilities/server'
import {sign} from '../src/utilities/tokens'
import client from "../src/utilities/client"
import {courseInput, coursePayload, invalidCourseInput, studentPayload, adminPayload, professorPayload, courseInfoPayload, courseId, transactionPayload, courseSectionPayload, courseSectionInput, invalidCourseSectionInput, courseSectionInputWithInvalidTimeRange} from "./testVariables"

const request = require('supertest')
 const app = createServer()

 let token = ''
 beforeEach(async () => {
     token = sign({userId: "642486eb76ebc32a07efbde",})
     jest.resetAllMocks()
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
        describe("Sending with no authorization", () =>{
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
         describe("Sending with invalid Course Id",() => {
            it("Should return a 500", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockCourseId = jest
                    .spyOn(client.course, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockRejectedValueOnce("Invalid Course Id")
                const {statusCode} = await request(app)
                    .get(`/courses/1234efr4034`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(500)
                expect(mockCourseId).toHaveBeenCalled()
            })
         })
    })
    describe("CourseId PUT", () => {
        describe("Sending with admin authorization, valid course Id, and valid course input", () => {
            it("Should return a 200 and a course", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockUpdateCourse = jest
                    .spyOn(client.course, "update")
                    // @ts-ignore
                    .mockReturnValueOnce(coursePayload)
                const {statusCode, body} = await request(app)
                    .put(`/courses/${courseId.courseId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(courseInput)
                expect(statusCode).toBe(200)
                expect(body).toEqual(coursePayload)
                expect(mockUpdateCourse).toHaveBeenCalledWith({
                    where: { id: `${courseId.courseId}` },
                    data: courseInput,
                })
            })
        })
        describe("Sending without admin authorization, valid course Id, and valid course input", () => {
            it("Should return a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockCourseId = jest
                    .spyOn(client.course, "update")
                    // @ts-ignore
                    .mockReturnValueOnce(coursePayload)
                const {statusCode} = await request(app)
                    .put(`/courses/${courseId.courseId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(courseInput)
                expect(statusCode).toBe(401)
                expect(mockCourseId).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization, valid course Id, and invalid course input", () => {
            it("Should return a 500", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockCourseId = jest
                    .spyOn(client.course, "update")
                    // @ts-ignore
                    .mockRejectedValueOnce("Invalid body")
                const {statusCode} = await request(app)
                    .put(`/courses/${courseId.courseId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(invalidCourseInput)
                expect(statusCode).toBe(500)
                expect(mockCourseId).toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization, invalid course Id, and valid course info", () => {
            it("Should return a 500", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockCourseId = jest
                    .spyOn(client.course, "update")
                    // @ts-ignore
                    .mockRejectedValueOnce("Invalid Course Id")
                const {statusCode} = await request(app)
                    .put(`/courses/1234eftin`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(invalidCourseInput)
                expect(statusCode).toBe(500)
                expect(mockCourseId).toHaveBeenCalled()
            })
        })
    })
    describe("CourseId DELETE", () => {
        describe("Sending with admin authorization and valid course Id", () => {
            it("Should return a 200 and a transaction", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTransaction = jest
                    .spyOn(client,"$transaction")
                    // @ts-ignore
                    .mockReturnValueOnce(transactionPayload)
                const {statusCode, body} = await request(app)
                    .delete(`/courses/${courseId.courseId}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(transactionPayload)
                expect(mockTransaction).toHaveBeenCalled()
            })
        })
        describe("Sending without admin authorization and valid course Id", () => {
            it("Should return a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockTransaction = jest
                    .spyOn(client,"$transaction")
                    // @ts-ignore
                    .mockReturnValueOnce(transactionPayload)
                const {statusCode} = await request(app)
                    .delete(`/courses/${courseId.courseId}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(401)
                expect(mockTransaction).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and invalid course Id", () => {
            it("Should return a 500", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTransaction = jest
                    .spyOn(client,"$transaction")
                    // @ts-ignore
                    .mockRejectedValueOnce("Invalid Course Id")
                const {statusCode} = await request(app)
                    .delete(`/courses/1234fjdnep`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(500)
                expect(mockTransaction).toHaveBeenCalled()
            })
        })
    })
    describe("Sections POST", () => {
        describe("Sending with admin authorization and valid section input", () => {
            it("Should return a 201 and the created section", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockSectionCreation = jest
                    .spyOn(client.courseSection, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(courseSectionPayload)
                const {statusCode, body} = await request(app)
                    .post(`/courses/${courseId.courseId}/sections`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(courseSectionInput)
                expect(statusCode).toBe(201)
                expect(body).toEqual(courseSectionPayload)
                expect(mockSectionCreation).toHaveBeenLastCalledWith({
                    data: {
                        courseId: `${courseId.courseId}`,
                        meetings: [
                            {
                                daysOfWeek: [
                                    "TUESDAY",
                                    "THURSDAY"
                                ],
                                startTime: "12:30:00",
                                endTime: "13:30:00",
                                location: "CSI-388"
                            }
                        ],
                        instructorIds: ["641a06db480e1fb9a4cdaad1"],
                    }
                })
            })
        })
        describe("Sending without admin authorization and valid section input", () => {
            it("Should return a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockSectionCreation = jest
                    .spyOn(client.courseSection, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(courseSectionPayload)
                const {statusCode} = await request(app)
                    .post(`/courses/${courseId.courseId}/sections`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(courseSectionInput)
                expect(statusCode).toBe(401)
                expect(mockSectionCreation).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and invalid section input", () => {
            it('Should return a 400', async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockSectionCreation = jest
                    .spyOn(client.courseSection, "create")
                    // @ts-ignore
                    .mockRejectedValueOnce("Invalid Course Info")
                const {statusCode} = await request(app)
                    .post(`/courses/${courseId.courseId}/sections`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(invalidCourseSectionInput)
                expect(statusCode).toBe(400)
                expect(mockSectionCreation).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and invalid time range in section input", () =>{
            it("Should return a 400", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockSectionCreation = jest
                    .spyOn(client.courseSection, "create")
                    // @ts-ignore
                    .mockRejectedValueOnce("Invalid Course Info")
                const {statusCode} = await request(app)
                    .post(`/courses/${courseId.courseId}/sections`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(courseSectionInputWithInvalidTimeRange)
                expect(statusCode).toBe(400)
                expect(mockSectionCreation).not.toHaveBeenCalled()
            })
        })
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