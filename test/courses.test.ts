import {describe, expect} from '@jest/globals'
import createServer from '../src/utilities/server'
import {sign} from '../src/utilities/tokens'
import client from "../src/utilities/client"
import {courseInput, coursePayload, invalidCourseInput, studentPayload, adminPayload, professorPayload, courseInfoPayload, courseId, courseDeletionTransactionPayload, courseSectionPayload, courseSectionInput, invalidCourseSectionInput, courseSectionInputWithInvalidTimeRange, sectionId, sectionDeletionTransactionPayload, courseSection, registrationPayload, registrationListPayload, userInput, userId, registrationDeletionBatch, invalidSectionRegistrationBatchPayload, courseQuery, parsedCourseQuery} from "./testVariables"
import { JS_EXT_TO_TREAT_AS_ESM } from 'ts-jest'

const request = require('supertest')
const app = createServer()

let token = ''
beforeEach(async () => {
    token = sign(userId)
    jest.resetAllMocks()
})

describe("Testing course requests", () => {
describe("Courses GET", () => {
    describe("Sending with admin authorization and valid query input", () => {
        it("Should return a 200 and the courses that match the query", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockCourses = jest
                .spyOn(client.course, "findMany")
                // @ts-ignore
                .mockReturnValue([coursePayload])
            const {statusCode, body} = await request(app)
                .get(`/courses?${courseQuery}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual([coursePayload])
            expect(mockCourses).toHaveBeenCalledWith({
                where: {
                    OR: parsedCourseQuery.q.map((q) => ({
                      OR: [
                        {
                          name: {
                            contains: q,
                            mode: "insensitive",
                          },
                        },
                        {
                          description: {
                            contains: q,
                            mode: "insensitive",
                          },
                        },
                      ],
                    })),
                    termId: parsedCourseQuery.termId,
                    department: parsedCourseQuery.dept,
                  },
            })
        })
    })
    describe("Sending with student authorization and valid query input", () => {
        it("Should return a 200 and the courses that match the query", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(studentPayload)
            const mockCourses = jest
                .spyOn(client.course, "findMany")
                // @ts-ignore
                .mockReturnValue([coursePayload])
            const {statusCode, body} = await request(app)
                .get(`/courses?${courseQuery}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual([coursePayload])
            expect(mockCourses).toHaveBeenCalledWith({
                where: {
                    OR: parsedCourseQuery.q.map((q) => ({
                      OR: [
                        {
                          name: {
                            contains: q,
                            mode: "insensitive",
                          },
                        },
                        {
                          description: {
                            contains: q,
                            mode: "insensitive",
                          },
                        },
                      ],
                    })),
                    termId: parsedCourseQuery.termId,
                    department: parsedCourseQuery.dept,
                  },
            })
        })
    })
    describe("Sending with professor authorization and valid query input", () => {
        it("Should return a 200 and the courses that match the query", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(professorPayload)
            const mockCourses = jest
                .spyOn(client.course, "findMany")
                // @ts-ignore
                .mockReturnValue([coursePayload])
            const {statusCode, body} = await request(app)
                .get(`/courses?${courseQuery}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual([coursePayload])
            expect(mockCourses).toHaveBeenCalledWith({
                where: {
                    OR: parsedCourseQuery.q.map((q) => ({
                      OR: [
                        {
                          name: {
                            contains: q,
                            mode: "insensitive",
                          },
                        },
                        {
                          description: {
                            contains: q,
                            mode: "insensitive",
                          },
                        },
                      ],
                    })),
                    termId: parsedCourseQuery.termId,
                    department: parsedCourseQuery.dept,
                  },
            })
        })
    })
    describe("Sending with admin authorization and valid query input", () => {
        it("Should return a 200 and the courses that match the query", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockCourses = jest
                .spyOn(client.course, "findMany")
                // @ts-ignore
                .mockReturnValue([coursePayload])
            const {statusCode} = await request(app)
                .get(`/courses?none`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(400)
            expect(mockCourses).not.toHaveBeenCalledWith()
        })
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
            expect(mockCourseCreation).toHaveBeenCalled()
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
                include: {
                    courseSections: {include: {instructors: true}},
                    term: true
                }
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
                include: {
                    courseSections: {include: {instructors: true}},
                    term: true
                }
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
                include: {
                    courseSections: {include: {instructors: true}},
                    term: true
                }
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
            expect(mockUpdateCourse).toHaveBeenCalled()
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
                .mockReturnValueOnce(courseDeletionTransactionPayload)
            const {statusCode, body} = await request(app)
                .delete(`/courses/${courseId.courseId}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(courseDeletionTransactionPayload)
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
                .mockReturnValueOnce(courseDeletionTransactionPayload)
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
            expect(mockSectionCreation).toHaveBeenCalled()
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
    describe("Sending with admin authorization and valid section id", () => {
        it("Should return a 200 and the section", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockSectionRetrieval = jest
                .spyOn(client.courseSection, "findUniqueOrThrow")
                // @ts-ignore
                .mockReturnValueOnce(courseSectionPayload)
            const {statusCode, body} = await request(app)
                .get(`/courses/${courseId.courseId}/sections/${sectionId.id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(courseSectionPayload)
            expect(mockSectionRetrieval).toHaveBeenCalled()
        })
    })
    describe("Sending without admin authorization and valid section id", () => {
        it("Should return a 401", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(studentPayload)
            const mockSectionRetrieval = jest
                .spyOn(client.courseSection, "findUniqueOrThrow")
                // @ts-ignore
                .mockReturnValueOnce(courseSectionPayload)
            const {statusCode} = await request(app)
                .get(`/courses/${courseId.courseId}/sections/${sectionId.id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(401)
            expect(mockSectionRetrieval).not.toHaveBeenCalled()
        })
    })
    describe("Sending with admin authorization and invalid section id", () => {
        it("Should return a 500", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockSectionRetrieval = jest
                .spyOn(client.courseSection, "findUniqueOrThrow")
                // @ts-ignore
                .mockRejectedValueOnce("Invalid Section Id")
            const {statusCode} = await request(app)
                .get(`/courses/${courseId.courseId}/sections/12345gdjg`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(500)
            expect(mockSectionRetrieval).toHaveBeenCalled()
        })
    })
})
describe("SectionId DELETE", () => {
    describe("Sending with admin authorization and valid section id", () => {
        it("Should return a 200 and a transaction", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockTransaction = jest
                .spyOn(client, "$transaction")
                // @ts-ignore
                .mockReturnValue(sectionDeletionTransactionPayload)
            const {statusCode, body} = await request(app)
                .delete(`/courses/${courseId.courseId}/sections/${sectionId.id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(sectionDeletionTransactionPayload)
            expect(mockTransaction).toHaveBeenCalled()
        })
    })
    describe("Sending without admin authorization and valid section id", () => {
        it("Should return a 401", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(studentPayload)
            const mockTransaction = jest
                .spyOn(client, "$transaction")
                // @ts-ignore
                .mockReturnValue(sectionDeletionTransactionPayload)
            const {statusCode} = await request(app)
                .delete(`/courses/${courseId.courseId}/sections/${sectionId.id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(401)
            expect(mockTransaction).not.toHaveBeenCalled()
        })
    })
    describe("Sending with admin authorization and invalid section id", () => {
        it("Should return a 500", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockTransaction = jest
                .spyOn(client, "$transaction")
                // @ts-ignore
                .mockRejectedValue("Invalid Section Id")
            const {statusCode} = await request(app)
                .delete(`/courses/${courseId.courseId}/sections/${sectionId.id}`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(500)
            expect(mockTransaction).toHaveBeenCalled()
        })
    })
})
describe("SectionId PUT", () => {
    describe("Sending with admin authorization, valid section id, and valid section input", () => {
        it("Should return a 200 and the updated section", async () =>{
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockSectionUpdate = jest
                .spyOn(client.courseSection, "update")
                // @ts-ignore
                .mockReturnValueOnce(courseSectionPayload)
            const {statusCode, body} = await request(app)
                .put(`/courses/${courseId.courseId}/sections/${sectionId.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(courseSectionInput)
            expect(statusCode).toBe(201)
            expect(body).toEqual(courseSectionPayload)
            expect(mockSectionUpdate).toHaveBeenCalled()
        })
    })
    describe("Sending without admin authorization, valid section id, and valid section input", () => {
        it("Should return a 401", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(studentPayload)
            const mockSectionUpdate = jest
                .spyOn(client.courseSection, "update")
                // @ts-ignore
                .mockReturnValueOnce(courseSectionPayload)
            const {statusCode} = await request(app)
                .put(`/courses/${courseId.courseId}/sections/${sectionId.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(courseSectionInput)
            expect(statusCode).toBe(401)
            expect(mockSectionUpdate).not.toHaveBeenCalled()
        })
    })
    describe("Sending with admin authorization, invalid section id, and valid section input", () =>{
        it("Should return a 500", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockSectionUpdate = jest
                .spyOn(client.courseSection, "update")
                // @ts-ignore
                .mockRejectedValueOnce("Invalid Section Id")
            const {statusCode} = await request(app)
                .put(`/courses/${courseId.courseId}/sections/123jgdfo`)
                .set('Authorization', `Bearer ${token}`)
                .send(courseSectionInput)
            expect(statusCode).toBe(500)
            expect(mockSectionUpdate).toHaveBeenCalled()
        })
    })
    describe("Sending with admin authorization, valid section id, and invalid section input", () => {
        it("Should return a 400", async () =>{
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockSectionUpdate = jest
                .spyOn(client.courseSection, "update")
                // @ts-ignore
                .mockRejectedValueOnce("Invalid Section Id")
            const {statusCode} = await request(app)
                .put(`/courses/${courseId.courseId}/sections/123jgdfo`)
                .set('Authorization', `Bearer ${token}`)
                .send(invalidCourseSectionInput)
            expect(statusCode).toBe(400)
            expect(mockSectionUpdate).not.toHaveBeenCalled()
        })
    })
    describe("Sending admin authorization, valid course section, and invalid time range in section input", () => {
        it("Should return a 400", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockSectionUpdate = jest
                .spyOn(client.courseSection, "update")
                // @ts-ignore
                .mockRejectedValueOnce("Invalid Section Id")
            const {statusCode} = await request(app)
                .put(`/courses/${courseId.courseId}/sections/${sectionId.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(courseSectionInputWithInvalidTimeRange)
            expect(statusCode).toBe(400)
            expect(mockSectionUpdate).not.toHaveBeenCalled()
        })
    })
})
describe("Registrations GET", () => {
    describe("Sending with admin authorization and valid section id", () => {
        it("Should return a 200 and an array of the enrolled students and an array of the waitlisted students", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockCourseSection = jest
                .spyOn(client.courseSection, "findUniqueOrThrow")
                // @ts-ignore
                .mockReturnValueOnce(courseSectionPayload)
            const mockRegistrations = jest
                .spyOn(client.registration, "findMany")
                // @ts-ignore
                .mockReturnValueOnce(registrationListPayload)
            const {statusCode, body} = await request(app)
                .get(`/courses/${courseId.courseId}/sections/${sectionId.id}/roster`)
                .set('Authorization',`Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual({
                students: [
                    {
                        courseSectionId: "4423",
                        id: "1234",
                        user: {
                            email: "example@email.com",
                            firstName: "Example",
                            id: "642486eb76ebc32a07efbde",
                            instructingIds: [],
                            instuctingIds: [],
                            isMock: true,
                            lastName: "User",
                            role: "STUDENT",
                            },
                        userId: "5678",
                    },
                ],
                waitlist: [
                    {
                        courseSectionId: "4423",
                        id: "1234",
                        user: {
                            email: "example@email.com",
                            firstName: "Example",
                            id: "642486eb76ebc32a07efbde",
                            instructingIds: [],
                            instuctingIds: [],
                            isMock: true,
                            lastName: "User",
                            role: "STUDENT",
                            },
                        userId: "5678",
                    },
                ]
            })
            expect(mockCourseSection).toHaveBeenCalledWith({where: sectionId})
            expect(mockRegistrations).toHaveBeenCalledWith({
                where: {courseSectionId: sectionId.id},
                include: {user: true},
                orderBy: [{priority: "desc"},{createdAt: "asc"}]
            })
        })
    })
    describe("Sending with student authorization and valid section id", () => {
        it("Should return a 200 and an array of the enrolled students and an array of the waitlisted students", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(studentPayload)
            const mockCourseSection = jest
                .spyOn(client.courseSection, "findUniqueOrThrow")
                // @ts-ignore
                .mockReturnValueOnce(courseSectionPayload)
            const mockRegistrations = jest
                .spyOn(client.registration, "findMany")
                // @ts-ignore
                .mockReturnValueOnce(registrationListPayload)
            const {statusCode, body} = await request(app)
                .get(`/courses/${courseId.courseId}/sections/${sectionId.id}/roster`)
                .set('Authorization',`Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual({
                students: [],
                waitlist: []
            })
            expect(mockCourseSection).toHaveBeenCalledWith({where: sectionId})
            expect(mockRegistrations).toHaveBeenCalledWith({
                where: {courseSectionId: sectionId.id},
                include: {user: true},
                orderBy: [{priority: "desc"},{createdAt: "asc"}]
            })
        })
    })
    describe("Sending with professor authorization and valid section id", () => {
        it("Should return a 200 and an array of the enrolled students and an array of the waitlisted students", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(professorPayload)
            const mockCourseSection = jest
                .spyOn(client.courseSection, "findUniqueOrThrow")
                // @ts-ignore
                .mockReturnValueOnce(courseSectionPayload)
            const mockRegistrations = jest
                .spyOn(client.registration, "findMany")
                // @ts-ignore
                .mockReturnValueOnce(registrationListPayload)
            const {statusCode, body} = await request(app)
                .get(`/courses/${courseId.courseId}/sections/${sectionId.id}/roster`)
                .set('Authorization',`Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual({
                students: [],
                waitlist: []
            })
            expect(mockCourseSection).toHaveBeenCalledWith({where: sectionId})
            expect(mockRegistrations).toHaveBeenCalledWith({
                where: {courseSectionId: sectionId.id},
                include: {user: true},
                orderBy: [{priority: "desc"},{createdAt: "asc"}]
            })
        })
    })
    describe("Sending with valid authentication and no course section exists", () => {
        it("Should return a 500", async () => {
            const mockAuthorization = jest
            .spyOn(client.user, "findUnique")
            // @ts-ignore
            .mockReturnValueOnce(adminPayload)
        const mockCourseSection = jest
            .spyOn(client.courseSection, "findUniqueOrThrow")
            // @ts-ignore
            .mockRejectedValueOnce("No course section exists")
        const mockRegistrations = jest
            .spyOn(client.registration, "findMany")
            // @ts-ignore
            .mockReturnValueOnce(registrationListPayload)
        const {statusCode} = await request(app)
            .get(`/courses/${courseId.courseId}/sections/${sectionId.id}/roster`)
            .set('Authorization',`Bearer ${token}`)
        expect(statusCode).toBe(500)
        expect(mockCourseSection).toHaveBeenCalledWith({where: sectionId})
        expect(mockRegistrations).not.toHaveBeenCalled()
        })
    })
    describe("Sending with valid authentication and no there are no registered students for the class", () => {
        it("Should return a 200 and empty registrations", async () => {
            const mockAuthorization = jest
            .spyOn(client.user, "findUnique")
            // @ts-ignore
            .mockReturnValueOnce(adminPayload)
        const mockCourseSection = jest
            .spyOn(client.courseSection, "findUniqueOrThrow")
            // @ts-ignore
            .mockReturnValueOnce(courseSectionPayload)
        const mockRegistrations = jest
            .spyOn(client.registration, "findMany")
            // @ts-ignore
            .mockReturnValueOnce([])
        const {statusCode, body} = await request(app)
            .get(`/courses/${courseId.courseId}/sections/${sectionId.id}/roster`)
            .set('Authorization',`Bearer ${token}`)
        expect(statusCode).toBe(200)
        expect(body).toEqual({
            students: [],
            waitlist: []
        })
        expect(mockCourseSection).toHaveBeenCalledWith({where: sectionId})
        expect(mockRegistrations).toHaveBeenCalled()
        })
    })
})
describe("Registrations POST", () => {
    describe("Sending with admin authorization and not registered for another section", () => {
        it("Should return a 201 and the new registration", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockSCDSR = jest
                .spyOn(client.registration, "findMany")
                // @ts-ignore
                .mockReturnValue([])
            const mockRegistrationCreation = jest
                .spyOn(client.registration, "create")
                // @ts-ignore
                .mockReturnValueOnce(registrationPayload)
            const {statusCode, body} = await request(app)
                .post(`/courses/${courseId.courseId}/sections/${sectionId.id}/registrations`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(201)
            expect(body).toEqual(registrationPayload)
            expect(mockRegistrationCreation).toHaveBeenCalled()
            expect(mockSCDSR).toHaveBeenCalled()
        })
    })
    describe("Sending with student authorization and not registered for another section", () => {
        it("Should return a 201 and the new registration", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(studentPayload)
            const mockSCDSR = jest
                .spyOn(client.registration, "findMany")
                // @ts-ignore
                .mockReturnValue([])
            const mockRegistrationCreation = jest
                .spyOn(client.registration, "create")
                // @ts-ignore
                .mockReturnValueOnce(registrationPayload)
            const {statusCode, body} = await request(app)
                .post(`/courses/${courseId.courseId}/sections/${sectionId.id}/registrations`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(201)
            expect(body).toEqual(registrationPayload)
            expect(mockRegistrationCreation).toHaveBeenCalled()
            expect(mockSCDSR).toHaveBeenCalled()
        })
    })
    describe("Sending with professor authorization and not registered for another section", () => {
        it("Should return a 201 and the new registration", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(professorPayload)
            const mockSCDSR = jest
                .spyOn(client.registration, "findMany")
                // @ts-ignore
                .mockReturnValue([])
            const mockRegistrationCreation = jest
                .spyOn(client.registration, "create")
                // @ts-ignore
                .mockReturnValueOnce(registrationPayload)
            const {statusCode, body} = await request(app)
                .post(`/courses/${courseId.courseId}/sections/${sectionId.id}/registrations`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(201)
            expect(body).toEqual(registrationPayload)
            expect(mockRegistrationCreation).toHaveBeenCalled()
            expect(mockSCDSR).toHaveBeenCalled()
        })
    })
})
describe("Registrations DELETE", () => {
    describe("Sending with admin authorization and valid section id", () => {
        it("Should return a 200 and the batch", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockRegistrationDeletion = jest
                .spyOn(client.registration, "deleteMany")
                // @ts-ignore
                .mockReturnValueOnce(registrationDeletionBatch)
            const {statusCode, body} = await request(app)
                .delete(`/courses/${courseId.courseId}/sections/${sectionId.id}/registrations`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(registrationDeletionBatch)
            expect(mockRegistrationDeletion).toHaveBeenCalledWith({
                where:{
                    courseSectionId: sectionId.id,
                    userId: userId.userId
                }
            })
        })
    })
    describe("Sending with student authorization and valid section id", () => {
        it("Should return a 200 and the batch", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(studentPayload)
            const mockRegistrationDeletion = jest
                .spyOn(client.registration, "deleteMany")
                // @ts-ignore
                .mockReturnValueOnce(registrationDeletionBatch)
            const {statusCode, body} = await request(app)
                .delete(`/courses/${courseId.courseId}/sections/${sectionId.id}/registrations`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(registrationDeletionBatch)
            expect(mockRegistrationDeletion).toHaveBeenCalledWith({
                where:{
                    courseSectionId: sectionId.id,
                    userId: userId.userId
                }
            })
        })
    })
    describe("Sending with professor authorization and valid section id", () => {
        it("Should return a 200 and the batch", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(professorPayload)
            const mockRegistrationDeletion = jest
                .spyOn(client.registration, "deleteMany")
                // @ts-ignore
                .mockReturnValueOnce(registrationDeletionBatch)
            const {statusCode, body} = await request(app)
                .delete(`/courses/${courseId.courseId}/sections/${sectionId.id}/registrations`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(registrationDeletionBatch)
            expect(mockRegistrationDeletion).toHaveBeenCalledWith({
                where:{
                    courseSectionId: sectionId.id,
                    userId: userId.userId
                }
            })
        })
    })
    describe("Sending with valid authorization and invalid section id", () => {
        it("Should return a 200 and a batch with 0", async () => {
            const mockAuthorization = jest
                .spyOn(client.user, "findUnique")
                // @ts-ignore
                .mockReturnValueOnce(adminPayload)
            const mockRegistrationDeletion = jest
                .spyOn(client.registration, "deleteMany")
                // @ts-ignore
                .mockReturnValueOnce(invalidSectionRegistrationBatchPayload)
            const {statusCode, body} = await request(app)
                .delete(`/courses/${courseId.courseId}/sections/${sectionId.id}/registrations`)
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(invalidSectionRegistrationBatchPayload)
            expect(mockRegistrationDeletion).toHaveBeenCalledWith({
                where:{
                    courseSectionId: sectionId.id,
                    userId: userId.userId
                }
            })
        })
    })
})
})