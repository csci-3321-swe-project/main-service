
export const userInput = {
    email: "example@email.com",
    firstName: "Example",
    lastName: "User",
    role: "ADMINISTRATOR",
}

export const userPayload = {
    id:"642486eb76ebc32a07efbde",
    isMock: true,
    role: "ADMINISTRATOR",
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

export const emailInput = {
    email: "example@email.com"
}

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