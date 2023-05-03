//OnpenApi Schemas

//USERS

/**
 * @openapi
 * components:
 *  schemas:
 *      userCreationInfo:
 *          type: object
 *          required:
 *              - email
 *              - firstName
 *              - lastName
 *              - role
 *          properties:
 *              email:
 *                  type: email
 *                  default: janeDoe@email.com
 *              firstName:
 *                  type: string
 *                  defualt: Jane
 *              lastName:
 *                  type: string
 *                  default: Doe
 *              role:
 *                  type: string
 *                  enum:
 *                      - "ADMINISTRATION"
 *                      - "STUDENT"
 *                      - "PROFESSOR"
 *                  defualt: "ADMINISTRATION"
 *                  
 *              
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          properties:
 *              id:
 *                  type: String
 *                  default: "642486eb76ebc32a07efbde"
 *              isMock:
 *                  type: Boolean
 *                  default: true
 *              role:
 *                  type: String
 *                  enum:
 *                      - "ADMINISTRATION"
 *                      - "STUDENT"
 *                      - "PROFESSOR"
 *                  default: "ADMINISTRATION"
 *              email:
 *                  type: String
 *                  default: "janeDoe@email.com"
 *              firstName:
 *                  type: String
 *                  default: "Jane"
 *              lastName:
 *                  type: String
 *                  default: "Doe"
 *              registations:
 *                  type: Registrations[]
 *                  default: []
 *              instructing:
 *                  type: CourseSection[]
 *                  default: []
 *              instructingIds:
 *                  type: String[]
 *                  default: []
 *              coursesCreated:
 *                  type: Course[]
 *                  default: []
 *              coursesUpdated:
 *                  type: Course[]
 *                  default: []
 *              updateIds:
 *                  type: String[]
 *                  default: []
 *              secCreated:
 *                  type: CourseSection[]
 *                  default: []
 *              secUpdated:
 *                  type: CourseSection[]
 *                  default: []
 *              secUpdatedIds:
 *                  type: String[]
 *                  default: []
 *              usersReged:
 *                  type: Registratin[]
 *                  default: []
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      userArray:
 *          type: User[]
 *          default: [  
 *                      {       
 *                          id: "642486eb76ebc32a07efbde",
 *                          isMock: true,
 *                          role: "ADMINISTRATION",
 *                          email: "janeDoe@email.com",
 *                          firstName: "Jane",
 *                          lastName: "Doe",
 *                          registations: [],
 *                          instructing: [],
 *                          instructingIds: [],
 *                          coursesCreated: [],
 *                          coursesUpdated: [],
 *                          updateIds: [],
 *                          secCreated: [],
 *                          secUpdated: [],
 *                          secUpdatedIds: [],
 *                          usersReged: [],
 *                      },
 *                      {       
 *                          id: "6476gjnfwrt4sdvthgdsbgf",
 *                          isMock: true,
 *                          role: "STUDENT",
 *                          email: "janeDoe@email.com",
 *                          firstName: "Jane",
 *                          lastName: "Doe",
 *                          registations: [],
 *                          instructing: [],
 *                          instructingIds: [],
 *                          coursesCreated: [],
 *                          coursesUpdated: [],
 *                          updateIds: [],
 *                          secCreated: [],
 *                          secUpdated: [],
 *                          secUpdatedIds: [],
 *                          usersReged: [],
 *                      }                    
 *                   ]
 */

//OPTIONS

/**
 * @openapi
 * components:
 *  schemas:
 *      options:
 *          type: object
 *          properties:
 *              seasons:
 *                  type: Option[]
 *                  default: [
 *                              {
 *                                  name: "Fall",
 *                                  value: "FALL"
 *                              },
 *                              {
 *                                  name: "Spring",
 *                                  value: "SPRING"
 *                              }
 *                           ]
 *              roles:
 *                  type: Option[]
 *                  default: [
 *                              {
 *                                  name: "Student",
 *                                  value: "STUDENT"
 *                              },
 *                              {
 *                                  name: "Professor",
 *                                  value: "PROFESSOR"
 *                              },
 *                              {
 *                                  name: "Administrator",
 *                                  value: "ADMINISTRATOR"
 *                              }
 *                           ]
 *              departments:
 *                  type: Option[]
 *                  default: [
 *                              {
 *                                  name: "Art History",
 *                                  value: "ART_HISTORY"
 *                              },
 *                              {
 *                                  name: "Biology",
 *                                  value: "BIOLOGY"
 *                              },
 *                              {
 *                                  name: "Chemistry",
 *                                  value: "CHEMISTRY"
 *                              },
 *                              {
 *                                  name: "Classical Studies",
 *                                  value: "CLASSICAL_STUDIES"
 *                              },
 *                              {
 *                                  name: "Communication",
 *                                  value: "COMMUNICATION"
 *                              },
 *                              {
 *                                  name: "Computer Science",
 *                                  value: "COMPUTER_SCIENCE"
 *                              },
 *                              {
 *                                  name: "Economics",
 *                                  value: "ECONOMICS"
 *                              },
 *                              {
 *                                  name: "Education",
 *                                  value: "EDUCATION"
 *                              },
 *                              {
 *                                  name: "Engineering Science",
 *                                  value: "ENGINEERING_SCIENCE"
 *                              },
 *                              {
 *                                  name: "English",
 *                                  value: "ENGLISH"
 *                              },
 *                              {
 *                                  name: "Geosciences",
 *                                  value: "GEOSCIENCES"
 *                              },
 *                              {
 *                                  name: "Health Care Administration",
 *                                  value: "HEALTH_CARE_ADMINISTRATION"
 *                              },
 *                              {
 *                                  name: "History",
 *                                  value: "HISTORY"
 *                              },
 *                              {
 *                                  name: "Mathmatics",
 *                                  value: "MATHMATICS"
 *                              },
 *                              {
 *                                  name: "Music",
 *                                  value: "MUSIC"
 *                              },
 *                              {
 *                                  name: "Phillosophy",
 *                                  value: "PHILLOSOPHY"
 *                              }
 *                           ]
 *              daysOfWeek:
 *                  type: Option[]
 *                  default: [
 *                              {
 *                                  name: "Monday",
 *                                  value: "MONDAY"
 *                              },
 *                              {
 *                                  name: "Tuesday",
 *                                  value: "TUESDAY"   
 *                              },
 *                              {
 *                                  name: "Wednesday",
 *                                  value: "WEDNESDAY"
 *                              },
 *                              {
 *                                  name: "Thursday",
 *                                  value: "THURSDAY"
 *                              },
 *                              {
 *                                  name: "Friday",
 *                                  value: "FRIDAY"
 *                              },
 *                              {
 *                                  name: "Saturday",  
 *                                  value: "SATURDAY"
 *                              },
 *                              {
 *                                  name: "Sunday",
 *                                  value: "SUNDAY"
 *                              }
 *                           ]
 */

//EMAIL

/**
 * @openapi
 * components:
 *  schemas:
 *      emailInfo:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: email
 *                default: janeDoe@email.com
 */

//TOKENS

/**
 * @openapi
 * components:
 *  schemas:
 *      token:
 *          type: string
 *          default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0ODZlYjc2ZWJjMzJhMDdlZmJkZSIsImlhdCI6MTY4MjIyMjgwOH0.gR0K4jFfAjKQ_jyphlSf3U7LPhxsIoKJlaGvyP7wDUI
 */

//TERMS

/**
 * @openapi
 * components:
 *  schemas:
 *      termCreationInfo:
 *          type: object
 *          required:
 *              - season
 *              - year:
 *              - startTime
 *              - endTime
 *          properties:
 *              season:
 *                  type: Season
 *                  enum:
 *                      - "FALL"
 *                      - "SPRING"
 *                  default: "FALL"
 *              year:
 *                  type: Int
 *                  default: 2023
 *              startTime:
 *                  type: DateTime
 *                  default: 2023-08-17T00:00:00.000+00:00
 *              endTime:
 *                  type: DateTime
 *                  default: 2023-12-17T00:00:00.000+00:00 
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      term:
 *          type: object
 *          properties:
 *              id: 
 *                  type: String
 *                  default: "pb3456tyu7801we56bop69x"
 *              season:
 *                  type: Season
 *                  default: "FALL"
 *              year:
 *                  type: Int
 *                  default: 2023
 *              startTime:
 *                  type: DateTime
 *                  default: 2023-08-17T00:00:00.000+00:00
 *              endTime:
 *                  type: DateTime
 *                  default: 2023-12-17T00:00:00.000+00:00
 *              course:
 *                  type: Course[]
 *                  default: []
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      termArray:
 *          type: Term[]
 *          default: [
 *                      {
 *                          id: "pb3456tyu7801we56bop69x",
 *                          season: "FALL",
 *                          year: 2023,
 *                          startTime: 2023-08-17T00:00:00.000+00:00,
 *                          endTime: 2023-12-17T00:00:00.000+00:00,
 *                          course: []
 *                      },
 *                      {
 *                          id: "gsni35y7sfdh7igdn4kn7i2",
 *                          season: "SPRING",
 *                          year: 2024,
 *                          startTime: 2024-01-17T00:00:00.000+00:00,
 *                          endTime: 2024-05-17T00:00:00.000+00:00,
 *                          course: []
 *                      },
 * 
 *                   ]
 */

//COURSES

/**
 * @openapi
 * components:
 *  schemas:
 *      courseCreationInfo:
 *          type: object
 *          required:
 *              - name
 *              - termId
 *              - department
 *              - code
 *              - description
 *          properties:
 *              name:
 *                  type: String
 *                  default: "Software Engineering"
 *              termId:
 *                  type: String
 *                  default: "64248ad776ebc32a873efdc0"
 *              department:
 *                  type: Department
 *                  default: "COMPUTER_SCIENCE"
 *              code:
 *                  type: Int
 *                  default: 3321
 *              description:
 *                  type: String
 *                  default: "A course on learning how to develop and maintain a service."
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      course:
 *          type: object
 *          properties:
 *              id:
 *                  type: String
 *                  default: "64248ad776ebc32a873efdc0"
 *              name:
 *                  type: String
 *                  default: "Software Engineering"
 *              term:
 *                  type: Term
 *                  default: {
 *                              id: "pb3456tyu7801we56bop69x",
 *                              season: "FALL",
 *                              year: 2023,
 *                              startTime: 2023-08-17T00:00:00.000+00:00,
 *                              endTime: 2023-12-17T00:00:00.000+00:00,
 *                              course: []
 *                           }
 *              termId:
 *                  type: String
 *                  default: "pb3456tyu7801we56bop69x"
 *              department:
 *                  type: Department
 *                  default: "COMPUTER_SCIENCE"
 *              code:
 *                  type: Int
 *                  default: 3321
 *              description:
 *                  type: String
 *                  default: "A course on learning how to develop and maintain a service."
 *              courseSections:
 *                  type: CourseSection[]
 *                  default: []
 *              createdBy:
 *                  type: User
 *                  default: {
 *                              id: "642486eb76ebc32a07efbde",
 *                              isMock: true,
 *                              role: "ADMINISTRATION",
 *                              email: "janeDoe@email.com",
 *                              firstName: "Jane",
 *                              lastName: "Doe",
 *                              registations: [],
 *                              instructing: [],
 *                              instructingIds: [],
 *                              coursesCreated: [],
 *                              coursesUpdated: [],
 *                              updateIds: [],
 *                              secCreated: [],
 *                              secUpdated: [],
 *                              secUpdatedIds: [],
 *                              usersReged: []
 *                           }
 *              createdById:
 *                  type: String
 *                  default: "642486eb76ebc32a07efbde"
 *              createdOn:
 *                  type: String
 *                  default: 'Sun Apr 23 2023 19:24:52 GMT-0500 (Central Daylight Time)'
 *              updatedByUsers:
 *                  type: User[]
 *                  default: []
 *              updatedByIds:
 *                  type: String[]
 *                  default: []
 *              updatedOnTimes:
 *                  type: String[]
 *                  default: []
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      courseList:
 *          type: Course[]
 *          default: [
 *                      {
 *                          id: "64248ad776ebc32a873efdc0",
 *                          name: "Software Engineering",
 *                          term: {
 *                                  id: "pb3456tyu7801we56bop69x",
 *                                  season: "FALL",
 *                                  year: 2023,
 *                                  startTime: 2023-08-17T00:00:00.000+00:00,
 *                                  endTime: 2023-12-17T00:00:00.000+00:00,
 *                                  course: []
 *                                },
 *                          termId: "pb3456tyu7801we56bop69x",
 *                          department: "COMPUTER_SCIENCE",
 *                          code: 3321,
 *                          description: "A course on learning how to develop and maintain a service.",
 *                          courseSections: [],
 *                          createdBy: {
 *                                          id: "642486eb76ebc32a07efbde",
 *                                          isMock: true,
 *                                          role: "ADMINISTRATION",
 *                                          email: "janeDoe@email.com",
 *                                          firstName: "Jane",
 *                                          lastName: "Doe",
 *                                          registations: [],
 *                                          instructing: [],
 *                                          instructingIds: [],
 *                                          coursesCreated: [],
 *                                          coursesUpdated: [],
 *                                          updateIds: [],
 *                                          secCreated: [],
 *                                          secUpdated: [],
 *                                          secUpdatedIds: [],
 *                                          usersReged: []
 *                                     },
 *                          createdById: "642486eb76ebc32a07efbde",
 *                          createdOn: 'Sun Apr 23 2023 19:24:52 GMT-0500 (Central Daylight Time)',
 *                          updatedByUsers: [],
 *                          updatedByIds: [],
 *                          updatedOnTimes: []
 *                      }
 *                   ]
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      courseDeletionTransaction:
 *          type: Transaction[]
 *          default: [
 *                      {count: 4},
 *                      {count: 2},
 *                      {
 *                          id: "64248ad776ebc32a873efdc0",
 *                          name: "Software Engineering",
 *                          term: {
 *                                  id: "pb3456tyu7801we56bop69x",
 *                                  season: "FALL",
 *                                  year: 2023,
 *                                  startTime: 2023-08-17T00:00:00.000+00:00,
 *                                  endTime: 2023-12-17T00:00:00.000+00:00,
 *                                  course: []
 *                                },
 *                          termId: "pb3456tyu7801we56bop69x",
 *                          department: "COMPUTER_SCIENCE",
 *                          code: 3321,
 *                          description: "A course on learning how to develop and maintain a service.",
 *                          courseSections: [],
 *                          createdBy: {
 *                                          id: "642486eb76ebc32a07efbde",
 *                                          isMock: true,
 *                                          role: "ADMINISTRATION",
 *                                          email: "janeDoe@email.com",
 *                                          firstName: "Jane",
 *                                          lastName: "Doe",
 *                                          registations: [],
 *                                          instructing: [],
 *                                          instructingIds: [],
 *                                          coursesCreated: [],
 *                                          coursesUpdated: [],
 *                                          updateIds: [],
 *                                          secCreated: [],
 *                                          secUpdated: [],
 *                                          secUpdatedIds: [],
 *                                          usersReged: []
 *                                     },
 *                          createdById: "642486eb76ebc32a07efbde",
 *                          createdOn: 'Sun Apr 23 2023 19:24:52 GMT-0500 (Central Daylight Time)',
 *                          updatedByUsers: [],
 *                          updatedByIds: [],
 *                          updatedOnTimes: []
 *                      }
 *                   ]
 *          
 */

//SECTIONS

/**
 * @openapi
 * components:
 *  schemas:
 *      sectionCreationInfo:
 *          type: object
 *          required:
 *              - instructorIds
 *              - capacity
 *              - meetings
 *          properties:
 *              instructorIds:
 *                  type: String[]
 *                  default: ["641a06db480e1fb9a4cdaad1"]
 *              capacity:
 *                  type: Int
 *                  default: 22
 *              meetings:
 *                  type: Meeting[]
 *                  default: [
 *                              {
 *                                  daysOfWeek: ["TUESDAY","THURSDAY"],
 *                                  startTime: "12:30:00",
 *                                  endTime: "13:30:00",
 *                                  location: "CSI-388"
 *                              }
 *                           ]
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      section:
 *          type: object
 *          properties:
 *              id:
 *                  type: String
 *                  default: "4423"
 *              course:
 *                  type: Course
 *                  default: {
 *                              id: "64248ad776ebc32a873efdc0",
 *                              name: "Software Engineering",
 *                              term: {
 *                                      id: "pb3456tyu7801we56bop69x",
 *                                      season: "FALL",
 *                                      year: 2023,
 *                                      startTime: 2023-08-17T00:00:00.000+00:00,
 *                                      endTime: 2023-12-17T00:00:00.000+00:00,
 *                                      course: []
 *                                    },
 *                              termId: "pb3456tyu7801we56bop69x",
 *                              department: "COMPUTER_SCIENCE",
 *                              code: 3321,
 *                              description: "A course on learning how to develop and maintain a service.",
 *                              courseSections: [],
 *                              createdBy: {
 *                                              id: "642486eb76ebc32a07efbde",
 *                                              isMock: true,
 *                                              role: "ADMINISTRATION",
 *                                              email: "janeDoe@email.com",
 *                                              firstName: "Jane",
 *                                              lastName: "Doe",
 *                                              registations: [],
 *                                              instructing: [],
 *                                              instructingIds: [],
 *                                              coursesCreated: [],
 *                                              coursesUpdated: [],
 *                                              updateIds: [],
 *                                              secCreated: [],
 *                                              secUpdated: [],
 *                                              secUpdatedIds: [],
 *                                              usersReged: []
 *                                         },
 *                              createdById: "642486eb76ebc32a07efbde",
 *                              createdOn: 'Sun Apr 23 2023 19:24:52 GMT-0500 (Central Daylight Time)',
 *                              updatedByUsers: [],
 *                              updatedByIds: [],
 *                              updatedOnTimes: []
 *                           }
 *              courseId:
 *                  type: String
 *                  default: "64248ad776ebc32a873efdc0"
 *              meetings:
 *                  type: meeting[]
 *                  default: [
 *                              {
 *                                  daysOfWeek: ["TUESDAY","THURSDAY"],
 *                                  startTime: "12:30:00",
 *                                  endTime: "13:30:00",
 *                                  location: "CSI-388"
 *                              }
 *                           ]
 *              instructors:
 *                  type: User[]
 *                  default: [
 *                              {
 *                                  id: "641a06db480e1fb9a4cdaad1",
 *                                  isMock: true,
 *                                  role: "PROFESSOR",
 *                                  email: "johnDoe@email.com",
 *                                  firstName: "John",
 *                                  lastName: "Doe",
 *                                  registations: [],
 *                                  instructing: [],
 *                                  instructingIds: [],
 *                                  coursesCreated: [],
 *                                  coursesUpdated: [],
 *                                  updateIds: [],
 *                                  secCreated: [],
 *                                  secUpdated: [],
 *                                  secUpdatedIds: [],
 *                                  usersReged: []
 *                              }
 *                           ]
 *              instructorIds: 
 *                  type: String[]
 *                  default: ["641a06db480e1fb9a4cdaad1"]
 *              registrations: 
 *                  type: Registration[]
 *                  default: []
 *              capacity:
 *                  type: Int
 *                  default: 22
 *              sectionCreatedBy:
 *                  type: User
 *                  default: {
 *                              id: "642486eb76ebc32a07efbde",
 *                              isMock: true,
 *                              role: "ADMINISTRATION",
 *                              email: "janeDoe@email.com",
 *                              firstName: "Jane",
 *                              lastName: "Doe",
 *                              registations: [],
 *                              instructing: [],
 *                              instructingIds: [],
 *                              coursesCreated: [],
 *                              coursesUpdated: [],
 *                              updateIds: [],
 *                              secCreated: [],
 *                              secUpdated: [],
 *                              secUpdatedIds: [],
 *                              usersReged: []
 *                           }
 *              sectionCreatedById:
 *                  type: String
 *                  default: "642486eb76ebc32a07efbde"
 *              sectionCreatedOn:
 *                  type: String
 *                  default: 'Sun Apr 23 2023 20:00:00 GMT-0500 (Central Daylight Time)'
 *              sectionUpdatedByUsers:
 *                  type: User[]
 *                  default: []
 *              sectionUpdatedByIds:
 *                  type: String[]
 *                  default: []
 *              sectionUpdatedOnTimes:
 *                  type: String[]
 *                  default: []
 *                  
 *                  
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      sectionDeletionTransaction:
 *          type: Transaction[]
 *          default: [
 *                      {count: 4},
 *                      {count: 2}
 *                   ]
 *          
 */

//REGISTRATION

/**
 * @openapi
 * components:
 *  schemas:
 *      registration:
 *          type: object
 *          properties:
 *              id:
 *                  type: String
 *                  default: "n35ing450jw05gi42tg"
 *              user:
 *                  type: User
 *                  default: {
 *                              id: "5gni5gb340jj35nibn3",
 *                              isMock: true,
 *                              role: "STUDENT",
 *                              email: "joshDoe@email.com",
 *                              firstName: "Josh",
 *                              lastName: "Doe",
 *                              registations: [],
 *                              instructing: [],
 *                              instructingIds: [],
 *                              coursesCreated: [],
 *                              coursesUpdated: [],
 *                              updateIds: [],
 *                              secCreated: [],
 *                              secUpdated: [],
 *                              secUpdatedIds: [],
 *                              usersReged: []
 *                           }
 *              userId:
 *                  type: String
 *                  default: "5gni5gb340jj35nibn3"
 *              courseSection:
 *                  type: CourseSection
 *                  default: {
 *                              id: "4423",
 *                              course: {
 *                                          id: "64248ad776ebc32a873efdc0",
 *                                          name: "Software Engineering",
 *                                          term: {
 *                                                  id: "pb3456tyu7801we56bop69x",
 *                                                  season: "FALL",
 *                                                  year: 2023,
 *                                                  startTime: 2023-08-17T00:00:00.000+00:00,
 *                                                  endTime: 2023-12-17T00:00:00.000+00:00,
 *                                                  course: []
 *                                          },
 *                                          termId: "pb3456tyu7801we56bop69x",
 *                                          department: "COMPUTER_SCIENCE",
 *                                          code: 3321,
 *                                          description: "A course on learning how to develop and maintain a service.",
 *                                          courseSections: [],
 *                                          createdBy: {
 *                                                          id: "642486eb76ebc32a07efbde",
 *                                                          isMock: true,
 *                                                          role: "ADMINISTRATION",
 *                                                          email: "janeDoe@email.com",
 *                                                          firstName: "Jane",
 *                                                          lastName: "Doe",
 *                                                          registations: [],
 *                                                          instructing: [],
 *                                                          instructingIds: [],
 *                                                          coursesCreated: [],
 *                                                          coursesUpdated: [],
 *                                                          updateIds: [],
 *                                                          secCreated: [],
 *                                                          secUpdated: [],
 *                                                          secUpdatedIds: [],
 *                                                          usersReged: []
 *                                                     },
 *                                          createdById: "642486eb76ebc32a07efbde",
 *                                          createdOn: 'Sun Apr 23 2023 19:24:52 GMT-0500 (Central Daylight Time)',
 *                                          updatedByUsers: [],
 *                                          updatedByIds: [],
 *                                          updatedOnTimes: []
 *                                     },
 *                              courseId: "64248ad776ebc32a873efdc0",
 *                              meetings: [
 *                                          {
 *                                              daysOfWeek: ["TUESDAY","THURSDAY"],
 *                                              startTime: "12:30:00",
 *                                              endTime: "13:30:00",
 *                                              location: "CSI-388"
 *                                          }
 *                                        ],
 *                              instructors: [
 *                                              {
 *                                                  id: "641a06db480e1fb9a4cdaad1",
 *                                                  isMock: true,
 *                                                  role: "PROFESSOR",
 *                                                  email: "johnDoe@email.com",
 *                                                  firstName: "John",
 *                                                  lastName: "Doe",
 *                                                  registations: [],
 *                                                  instructing: [],
 *                                                  instructingIds: [],
 *                                                  coursesCreated: [],
 *                                                  coursesUpdated: [],
 *                                                  updateIds: [],
 *                                                  secCreated: [],
 *                                                  secUpdated: [],
 *                                                  secUpdatedIds: [],
 *                                                  usersReged: []
 *                                              }
 *                                           ],
 *                              instructorIds: ["641a06db480e1fb9a4cdaad1"],
 *                              registrations: [],
 *                              capacity: 22,
 *                              sectionCreatedBy: {
 *                                                  id: "642486eb76ebc32a07efbde",
 *                                                  isMock: true,
 *                                                  role: "ADMINISTRATION",
 *                                                  email: "janeDoe@email.com",
 *                                                  firstName: "Jane",
 *                                                  lastName: "Doe",
 *                                                  registations: [],
 *                                                  instructing: [],
 *                                                  instructingIds: [],
 *                                                  coursesCreated: [],
 *                                                  coursesUpdated: [],
 *                                                  updateIds: [],
 *                                                  secCreated: [],
 *                                                  secUpdated: [],
 *                                                  secUpdatedIds: [],
 *                                                  usersReged: []
 *                                                },
 *                              sectionCreatedById: "642486eb76ebc32a07efbde",
 *                              sectionCreatedOn: 'Sun Apr 23 2023 20:00:00 GMT-0500 (Central Daylight Time)',
 *                              sectionUpdatedByUsers: [],
 *                              sectionUpdatedByIds: [],
 *                              sectionUpdatedOnTimes: []
 *                           }
 *              createdAt:
 *                  type: DateTime
 *                  default: 2023-08-17T00:00:00.000+00:00
 *              priority:
 *                  type: Boolean
 *                  default: false
 *              registeredBy:
 *                  type: User
 *                  default: {
 *                              id: "642486eb76ebc32a07efbde",
 *                              isMock: true,
 *                              role: "ADMINISTRATION",
 *                              email: "janeDoe@email.com",
 *                              firstName: "Jane",
 *                              lastName: "Doe",
 *                              registations: [],
 *                              instructing: [],
 *                              instructingIds: [],
 *                              coursesCreated: [],
 *                              coursesUpdated: [],
 *                              updateIds: [],
 *                              secCreated: [],
 *                              secUpdated: [],
 *                              secUpdatedIds: [],
 *                              usersReged: []
 *                           }
 *              registeredById:
 *                  type: String
 *                  default: "642486eb76ebc32a07efbde"
 *              registeredOn:
 *                  type: String
 *                  default: 'Sun Apr 24 2023 20:00:00 GMT-0500 (Central Daylight Time)'
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      registrationList:
 *          type: Registration[]
 *          default: [
 *                      {
 *                          id: "n35ing450jw05gi42tg",
 *                          user: {
 *                              id: "5gni5gb340jj35nibn3",
 *                              isMock: true,
 *                              role: "STUDENT",
 *                              email: "joshDoe@email.com",
 *                              firstName: "Josh",
 *                              lastName: "Doe",
 *                              registations: [],
 *                              instructing: [],
 *                              instructingIds: [],
 *                              coursesCreated: [],
 *                              coursesUpdated: [],
 *                              updateIds: [],
 *                              secCreated: [],
 *                              secUpdated: [],
 *                              secUpdatedIds: [],
 *                              usersReged: []
 *                           },
 *                          userId: "5gni5gb340jj35nibn3",
 *                          courseSection: {
 *                              id: "4423",
 *                              course: {
 *                                          id: "64248ad776ebc32a873efdc0",
 *                                          name: "Software Engineering",
 *                                          term: {
 *                                                  id: "pb3456tyu7801we56bop69x",
 *                                                  season: "FALL",
 *                                                  year: 2023,
 *                                                  startTime: 2023-08-17T00:00:00.000+00:00,
 *                                                  endTime: 2023-12-17T00:00:00.000+00:00,
 *                                                  course: []
 *                                          },
 *                                          termId: "pb3456tyu7801we56bop69x",
 *                                          department: "COMPUTER_SCIENCE",
 *                                          code: 3321,
 *                                          description: "A course on learning how to develop and maintain a service.",
 *                                          courseSections: [],
 *                                          createdBy: {
 *                                                          id: "642486eb76ebc32a07efbde",
 *                                                          isMock: true,
 *                                                          role: "ADMINISTRATION",
 *                                                          email: "janeDoe@email.com",
 *                                                          firstName: "Jane",
 *                                                          lastName: "Doe",
 *                                                          registations: [],
 *                                                          instructing: [],
 *                                                          instructingIds: [],
 *                                                          coursesCreated: [],
 *                                                          coursesUpdated: [],
 *                                                          updateIds: [],
 *                                                          secCreated: [],
 *                                                          secUpdated: [],
 *                                                          secUpdatedIds: [],
 *                                                          usersReged: []
 *                                                     },
 *                                          createdById: "642486eb76ebc32a07efbde",
 *                                          createdOn: 'Sun Apr 23 2023 19:24:52 GMT-0500 (Central Daylight Time)',
 *                                          updatedByUsers: [],
 *                                          updatedByIds: [],
 *                                          updatedOnTimes: []
 *                                     },
 *                              courseId: "64248ad776ebc32a873efdc0",
 *                              meetings: [
 *                                          {
 *                                              daysOfWeek: ["TUESDAY","THURSDAY"],
 *                                              startTime: "12:30:00",
 *                                              endTime: "13:30:00",
 *                                              location: "CSI-388"
 *                                          }
 *                                        ],
 *                              instructors: [
 *                                              {
 *                                                  id: "641a06db480e1fb9a4cdaad1",
 *                                                  isMock: true,
 *                                                  role: "PROFESSOR",
 *                                                  email: "johnDoe@email.com",
 *                                                  firstName: "John",
 *                                                  lastName: "Doe",
 *                                                  registations: [],
 *                                                  instructing: [],
 *                                                  instructingIds: [],
 *                                                  coursesCreated: [],
 *                                                  coursesUpdated: [],
 *                                                  updateIds: [],
 *                                                  secCreated: [],
 *                                                  secUpdated: [],
 *                                                  secUpdatedIds: [],
 *                                                  usersReged: []
 *                                              }
 *                                           ],
 *                              instructorIds: ["641a06db480e1fb9a4cdaad1"],
 *                              registrations: [],
 *                              capacity: 22,
 *                              sectionCreatedBy: {
 *                                                  id: "642486eb76ebc32a07efbde",
 *                                                  isMock: true,
 *                                                  role: "ADMINISTRATION",
 *                                                  email: "janeDoe@email.com",
 *                                                  firstName: "Jane",
 *                                                  lastName: "Doe",
 *                                                  registations: [],
 *                                                  instructing: [],
 *                                                  instructingIds: [],
 *                                                  coursesCreated: [],
 *                                                  coursesUpdated: [],
 *                                                  updateIds: [],
 *                                                  secCreated: [],
 *                                                  secUpdated: [],
 *                                                  secUpdatedIds: [],
 *                                                  usersReged: []
 *                                                },
 *                              sectionCreatedById: "642486eb76ebc32a07efbde",
 *                              sectionCreatedOn: 'Sun Apr 23 2023 20:00:00 GMT-0500 (Central Daylight Time)',
 *                              sectionUpdatedByUsers: [],
 *                              sectionUpdatedByIds: [],
 *                              sectionUpdatedOnTimes: []
 *                           },
 *                          createdAt: 2023-08-17T00:00:00.000+00:00,
 *                          priority: false,
 *                          registeredBy: {
 *                              id: "642486eb76ebc32a07efbde",
 *                              isMock: true,
 *                              role: "ADMINISTRATION",
 *                              email: "janeDoe@email.com",
 *                              firstName: "Jane",
 *                              lastName: "Doe",
 *                              registations: [],
 *                              instructing: [],
 *                              instructingIds: [],
 *                              coursesCreated: [],
 *                              coursesUpdated: [],
 *                              updateIds: [],
 *                              secCreated: [],
 *                              secUpdated: [],
 *                              secUpdatedIds: [],
 *                              usersReged: []
 *                           },
 *                          registeredById: "642486eb76ebc32a07efbde",
 *                          registeredOn: 'Sun Apr 24 2023 20:00:00 GMT-0500 (Central Daylight Time)'
 *                      }
 *                   ]
 */

//ROSTER

/**
 * @openapi
 * components:
 *  schemas:
 *      roster:
 *          type: object
 *          properties:
 *              students:
 *                  type: (Registration & User)[]
 *                  default: []
 *              waitlist:
 *                  type: (Registration & User)[]
 *                  default: []
 */

