import {describe, expect} from '@jest/globals'
import createServer from '../src/utilities/server'
import {sign} from '../src/utilities/tokens'
import client from '../src/utilities/client'
import { adminPayload, currentTermPayload, invalidTermInput, professorPayload, studentPayload, termId, termInput, termInputWithInvalidDates, termPayload, updatedTermPayload, userId } from './testVariables'

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
        describe("Sending with student authorization", () => {
            it("Should return a 200 and the terms", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
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
        describe("Sending with professor authorization", () => {
            it("Should return a 200 and the terms", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(professorPayload)
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
        describe("Sending with admin authroization and there exists a current term", () => {
            it("Should return a 200 and the current term", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockCurrentTerm = jest
                    .spyOn(client.term, "findFirstOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(currentTermPayload)
                const {statusCode, body} = await request(app)
                    .get('/terms/current')
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(currentTermPayload)
                expect(mockCurrentTerm).toHaveBeenCalled()
            })
        })
        describe("Sending with student authroization and there exists a current term", () => {
            it("Should return a 200 and the current term", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockCurrentTerm = jest
                    .spyOn(client.term, "findFirstOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(currentTermPayload)
                const {statusCode, body} = await request(app)
                    .get('/terms/current')
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(currentTermPayload)
                expect(mockCurrentTerm).toHaveBeenCalled()
            })
        })
        describe("Sending with professor authroization and there exists a current term", () => {
            it("Should return a 200 and the current term", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(professorPayload)
                const mockCurrentTerm = jest
                    .spyOn(client.term, "findFirstOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(currentTermPayload)
                const {statusCode, body} = await request(app)
                    .get('/terms/current')
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(currentTermPayload)
                expect(mockCurrentTerm).toHaveBeenCalled()
            })
        })
        describe("Sending with valid authroization and a current term doesn't exist", () => {
            it("Should return a 500", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockCurrentTerm = jest
                    .spyOn(client.term, "findFirstOrThrow")
                    // @ts-ignore
                    .mockRejectedValueOnce("Current term does not exist")
                const {statusCode} = await request(app)
                    .get('/terms/current')
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(500)
                expect(mockCurrentTerm).toHaveBeenCalled()
            })
        })
    })
    describe("TermId GET", () => {
        describe("Sending with admin authorization and term exists with the id", () => {
            it("Should return a 200 and the term with the given id", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTermFromId = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const {statusCode, body} = await request(app)
                    .get(`/terms/${termId.id}`)
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(termPayload)
                expect(mockTermFromId).toHaveBeenCalledWith({
                    where: termId
                })
            })
        })
        describe("Sending with student authorization and term exists with the id", () => {
            it("Should return a 200 and the term with the given id", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockTermFromId = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const {statusCode, body} = await request(app)
                    .get(`/terms/${termId.id}`)
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(termPayload)
                expect(mockTermFromId).toHaveBeenCalledWith({
                    where: termId
                })
            })
        })
        describe("Sending with professor authorization and term exists with the id", () => {
            it("Should return a 200 and the term with the given id", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(professorPayload)
                const mockTermFromId = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const {statusCode, body} = await request(app)
                    .get(`/terms/${termId.id}`)
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(termPayload)
                expect(mockTermFromId).toHaveBeenCalledWith({
                    where: termId
                })
            })
        })
        describe("Sending with valid authorization and term with id does not exist", () => {
            it("Should return a 500", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTermFromId = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockRejectedValueOnce("Term with id not found")
                const {statusCode} = await request(app)
                    .get(`/terms/${termId.id}`)
                    .set('Authorization',`Bearer ${token}`)
                expect(statusCode).toBe(500)
                expect(mockTermFromId).toHaveBeenCalledWith({
                    where: termId
                })
            })
        })
    })
    describe("Term POST", () => {
        describe("Sending with admin authorization and a valid term input", () => {
            it("Should return a 201 and the created term", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockConflicts = jest  
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockTermCreation = jest
                    .spyOn(client.term, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const {statusCode, body} = await request(app)
                    .post("/terms")
                    .set('Authorization',`Bearer ${token}`)
                    .send(termInput)
                expect(statusCode).toBe(201)
                expect(body).toEqual(termPayload)
                expect(mockConflicts).toHaveBeenCalled()
                expect(mockTermCreation).toHaveBeenCalled()
            })
        })
        describe("Sending with non admin authorization", () => {
            it("Should return a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockConflicts = jest  
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockTermCreation = jest
                    .spyOn(client.term, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const {statusCode} = await request(app)
                    .post("/terms")
                    .set('Authorization',`Bearer ${token}`)
                    .send(termInput)
                expect(statusCode).toBe(401)
                expect(mockConflicts).not.toHaveBeenCalled()
                expect(mockTermCreation).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization, valid term input, but there exists a conflict", () => {
            it("Should return a 400", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockConflicts = jest  
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([termPayload])
                const mockTermCreation = jest
                    .spyOn(client.term, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const {statusCode} = await request(app)
                    .post("/terms")
                    .set('Authorization',`Bearer ${token}`)
                    .send(termInput)
                expect(statusCode).toBe(400)
                expect(mockConflicts).toHaveBeenCalled()
                expect(mockTermCreation).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and term input with an end date before the start date", () => {
            it("Should return a 400", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockConflicts = jest  
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockTermCreation = jest
                    .spyOn(client.term, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const {statusCode} = await request(app)
                    .post("/terms")
                    .set('Authorization',`Bearer ${token}`)
                    .send(termInputWithInvalidDates)
                expect(statusCode).toBe(400)
                expect(mockConflicts).not.toHaveBeenCalled()
                expect(mockTermCreation).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and invalid term input", () => {
            it("Should return a 400", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockConflicts = jest  
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockTermCreation = jest
                    .spyOn(client.term, "create")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const {statusCode} = await request(app)
                    .post("/terms")
                    .set('Authorization',`Bearer ${token}`)
                    .send(invalidTermInput)
                expect(statusCode).toBe(400)
                expect(mockConflicts).not.toHaveBeenCalled()
                expect(mockTermCreation).not.toHaveBeenCalled()
            })
        })
    })
    describe("TermId PUT", () => {
        describe("Sending with admin authorization and valid term input", () => {
            it("Should return a 200 and the updated term", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTerm = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const mockConflicts = jest
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockUpdate = jest
                    .spyOn(client.term, "update")
                    // @ts-ignore
                    .mockReturnValue(updatedTermPayload)
                const {statusCode, body} = await request(app)
                    .put(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(termInput)
                expect(statusCode).toBe(200)
                expect(body).toEqual(updatedTermPayload)
                expect(mockTerm).toHaveBeenCalledWith({
                    where: termId
                })
                expect(mockConflicts).toHaveBeenCalled()
                expect(mockUpdate).toHaveBeenCalled()
            })
        })
        describe("Sending with non admin authorization and valid term input", () => {
            it("Should return a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockTerm = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const mockConflicts = jest
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockUpdate = jest
                    .spyOn(client.term, "update")
                    // @ts-ignore
                    .mockReturnValue(updatedTermPayload)
                const {statusCode} = await request(app)
                    .put(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(termInput)
                expect(statusCode).toBe(401)
                expect(mockTerm).not.toHaveBeenCalled()
                expect(mockConflicts).not.toHaveBeenCalled()
                expect(mockUpdate).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and invalid term input", () => {
            it("Should return a 400", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTerm = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const mockConflicts = jest
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockUpdate = jest
                    .spyOn(client.term, "update")
                    // @ts-ignore
                    .mockReturnValue(updatedTermPayload)
                const {statusCode} = await request(app)
                    .put(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(invalidTermInput)
                expect(statusCode).toBe(400)
                expect(mockTerm).not.toHaveBeenCalled()
                expect(mockConflicts).not.toHaveBeenCalled()
                expect(mockUpdate).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization, valid term input, but there exists a conflict", () => {
            it("Should return a 400", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTerm = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const mockConflicts = jest
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([termPayload])
                const mockUpdate = jest
                    .spyOn(client.term, "update")
                    // @ts-ignore
                    .mockReturnValue(updatedTermPayload)
                const {statusCode} = await request(app)
                    .put(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(termInput)
                expect(statusCode).toBe(400)
                expect(mockTerm).toHaveBeenCalledWith({
                    where: termId
                })
                expect(mockConflicts).toHaveBeenCalled()
                expect(mockUpdate).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and term input with an end date before the start date", () => {
            it("Should return a 400", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTerm = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockReturnValueOnce(termPayload)
                const mockConflicts = jest
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockUpdate = jest
                    .spyOn(client.term, "update")
                    // @ts-ignore
                    .mockReturnValue(updatedTermPayload)
                const {statusCode} = await request(app)
                    .put(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(termInputWithInvalidDates)
                expect(statusCode).toBe(400)
                expect(mockTerm).toHaveBeenCalledWith({
                    where: termId
                })
                expect(mockConflicts).not.toHaveBeenCalled()
                expect(mockUpdate).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and term doesn't exist", () => {
            it("Should return a 500", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTerm = jest
                    .spyOn(client.term, "findUniqueOrThrow")
                    // @ts-ignore
                    .mockRejectedValueOnce("Term does not exist")
                const mockConflicts = jest
                    .spyOn(client.term, "findMany")
                    // @ts-ignore
                    .mockReturnValueOnce([])
                const mockUpdate = jest
                    .spyOn(client.term, "update")
                    // @ts-ignore
                    .mockReturnValue(updatedTermPayload)
                const {statusCode} = await request(app)
                    .put(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(termInputWithInvalidDates)
                expect(statusCode).toBe(500)
                expect(mockTerm).toHaveBeenCalledWith({
                    where: termId
                })
                expect(mockConflicts).not.toHaveBeenCalled()
                expect(mockUpdate).not.toHaveBeenCalled()
            })
        })
    })
    describe("Term DELETE", () => {
        describe("Sending with admin authorization and the term exists", () => {
            it("Should return a 200 and the deleted term", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTermDeletion = jest
                    .spyOn(client.term, "delete")
                    // @ts-ignore
                    .mockReturnValue(termPayload)
                const {statusCode, body} = await request(app)
                    .delete(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(200)
                expect(body).toEqual(termPayload)
                expect(mockTermDeletion).toHaveBeenCalledWith({
                    where: termId
                })
            })
        })
        describe("Sending with non admin authorization and the term exists", () => {
            it("Should return a 401", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(studentPayload)
                const mockTermDeletion = jest
                    .spyOn(client.term, "delete")
                    // @ts-ignore
                    .mockReturnValue(termPayload)
                const {statusCode} = await request(app)
                    .delete(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(401)
                expect(mockTermDeletion).not.toHaveBeenCalled()
            })
        })
        describe("Sending with admin authorization and the term does not exist", () => {
            it("Should return a 500", async () => {
                const mockAuthorization = jest
                    .spyOn(client.user, "findUnique")
                    // @ts-ignore
                    .mockReturnValueOnce(adminPayload)
                const mockTermDeletion = jest
                    .spyOn(client.term, "delete")
                    // @ts-ignore
                    .mockRejectedValue("Term does not exist")
                const {statusCode} = await request(app)
                    .delete(`/terms/${termId.id}`)
                    .set('Authorization', `Bearer ${token}`)
                expect(statusCode).toBe(500)
                expect(mockTermDeletion).toHaveBeenCalledWith({
                    where: termId
                })
            })
        })
    })
})