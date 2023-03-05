import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  // ALL: Retrieve course information given query and filters.
});

router.post("/", (req, res, next) => {
  // ADMIN: Create class
});

router.delete("/", (req, res, next) => {
  // ADMIN: Delete class. Waterfall delete all course sections, which should waterfall delete all registrations
});

router.get("/:courseId", (req, res, next) => {
  // ALL: Retrieve course information
});

router.put("/:courseId", (req, res, next) => {
  // ADMIN: Update course information
});

router.post("/:courseId/sections", (req, res, next) => {
  // ADMIN: Create new course section
});

router.get("/:courseId/sections/:sectionId", (req, res, next) => {
  // ALL: Get course section information
  // INSTRUCTOR/ADMIN: Also fetch associated registrations, parsing results
});

router.delete("/:courseId/sections/:sectionId", (req, res, next) => {
  // ADMIN: Delete course section
});

router.put("/:courseId/sections/:sectionId", (req, res, next) => {
  // ADMIN: Update section information
});

router.post(
  "/:courseId/sections/:sectionId/registrations",
  (req, res, next) => {
    // STUDENT: Register for course
  }
);

export default router;
