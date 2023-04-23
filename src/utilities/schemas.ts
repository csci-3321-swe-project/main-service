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