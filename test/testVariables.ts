
export const userInput = {
    email: "example@email.com",
    firstName: "Example",
    lastName: "User",
    role: "ADMINISTRATOR",
}

export const adminPayload = {
    id:"642486eb76ebc32a07efbde",
    isMock: true,
    role: "ADMINISTRATOR",
    email: "example@email.com",
    firstName: "Example",
    lastName: "User",
    instructingIds: [],
}

export const studentPayload = {
    id:"642486eb76ebc32a07efbde",
    isMock: true,
    role: "STUDENT",
    email: "example@email.com",
    firstName: "Example",
    lastName: "User",
    instructingIds: [],
}

export const professorPayload = {
    id:"642486eb76ebc32a07efbde",
    isMock: true,
    role: "PROFESSOR",
    email: "example@email.com",
    firstName: "Example",
    lastName: "User",
    instructingIds: [],
}

export const nonMockUserPayload = {
    id:"642486eb76ebc32a07efbde",
    isMock: false,
    role: "ADMINISTRATOR",
    email: "example@email.com",
    firstName: "Example",
    lastName: "User",
    instructingIds: [],
}

export const invalRoleUserPayload = {
    id:"642486eb76ebc32a07efbde",
    isMock: true,
    role: "SUPERHERO",
    email: "example@email.com",
    firstName: "Example",
    lastName: "User",
    instructingIds: [],
}

export const courseInput = {
    name: "Software Engineering",
    term: "SPRING_2022",
    department: "COMPUTER_SCIENCE",
    code: 3321,
    description: "A great time",
}

export const coursePayload = {
    id: "64248ad776ebc32a873efdc0",
    name: "Software Engineering",
    term: "SPRING_2022",
    department: "COMPUTER_SCIENCE",
    code: 3321,
    description: "A great time",
}

export const courseId = {courseId: 3321}

export const sectionId = {id: "4423"}

export const courseSection = {
    sectionId,
    courseId,
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
    instructors: [
        professorPayload
    ]
}

export const courseInfoPayload = {
    coursePayload,
    courseSections: [
        courseSection
    ]
}

export const courseSectionInput = {
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

export const invalidCourseSectionInput = {
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
}

export const courseSectionInputWithInvalidTimeRange = {
    meetings: [
        {
            daysOfWeek: [
                "TUESDAY",
                "THURSDAY"
            ],
            startTime: "12:30:00",
            endTime: "11:30:00",
            location: "CSI-388"
        }
    ],
    instructorIds: ["641a06db480e1fb9a4cdaad1"],
}

export const courseSectionPayload = {
    courseSection,
    course: coursePayload
}

export const invalidCourseInput = {
    name: "Software Engineering",
    code: 3321,
}

export const emailInput = {
    email: "example@email.com"
}

export const registrationDeletionBatch = {count : 4}

export const courseSectionDeletionBatch = {count : 2}

export const courseDeletionTransactionPayload = [
    registrationDeletionBatch,
    courseSectionDeletionBatch,
    coursePayload,
]

export const sectionDeletionTransactionPayload = [
    registrationDeletionBatch,
    courseSectionDeletionBatch,
]

export const emailQuery = "email=example@email.com"

export const optionsPayload = {
    roles: [
        {
            name: "Student",
            value: "STUDENT"
        },
        {
            name: "Professor",
            value: "PROFESSOR"
        },
        {
            name: "Administrator",
            value: "ADMINISTRATOR"
        }
    ],
    departments: [
        {
            name: "Art History",
            value: "ART_HISTORY"
        },
        {
            name: "Biology",
            value: "BIOLOGY"
        },
        {
            name: "Chemistry",
            value: "CHEMISTRY"
        },
        {
            name: "Classical Studies",
            value: "CLASSICAL_STUDIES"
        },
        {
            name: "Communication",
            value: "COMMUNICATION"
        },
        {
            name: "Computer Science",
            value: "COMPUTER_SCIENCE"
        },
        {
            name: "Economics",
            value: "ECONOMICS"
        },
        {
            name: "Education",
            value: "EDUCATION"
        },
        {
            name: "Engineering Science",
            value: "ENGINEERING_SCIENCE"
        },
        {
            name: "English",
            value: "ENGLISH"
        },
        {
            name: "Geosciences",
            value: "GEOSCIENCES"
        },
        {
            name: "Health Care Administration",
            value: "HEALTH_CARE_ADMINISTRATION"
        },
        {
            name: "History",
            value: "HISTORY"
        },
        {
            name: "Mathmatics",
            value: "MATHMATICS"
        },
        {
            name: "Music",
            value: "MUSIC"
        },
        {
            name: "Phillosophy",
            value: "PHILLOSOPHY"
        }
    ],
    daysOfWeek: [
        {
            name: "Monday",
            value: "MONDAY"
        },
        {
            name: "Tuesday",
            value: "TUESDAY"
        },
        {
            name: "Wednesday",
            value: "WEDNESDAY"
        },
        {
            name: "Thursday",
            value: "THURSDAY"
        },
        {
            name: "Friday",
            value: "FRIDAY"
        },
        {
            name: "Saturday",
            value: "SATURDAY"
        },
        {
            name: "Sunday",
            value: "SUNDAY"
        }
    ],
    terms: [
        {
            name: "Spring 2021",
            value: "SPRING_2021"
        },
        {
            name: "Fall 2021",
            value: "FALL_2021"
        },
        {
            name: "Spring 2022",
            value: "SPRING_2022"
        },
        {
            name: "Fall 2022",
            value: "FALL_2022"
        },
        {
            name: "Spring 2023",
            value: "SPRING_2023"
        }
    ]
}