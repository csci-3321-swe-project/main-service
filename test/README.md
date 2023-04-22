# Testing

This service has automated unit testing suites made to test the requests made to the app server.

## Prerequisites
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Github Actions](https://github.com/en/actions)
- [App Server Instanse](#creating-a-server-instance)

## Creating a Test Suite
A test suite can be created by making a new file in the `test` folder labeled `[filename].test.ts`.

## Creating a server instance
Each testing suite needs to make an instance of the app server.
This instance can be created by including the following line at the beginnig of the suite: 
```ts
    const app = createServer()
```

## Using Jest to Mock Requests
This service uses Jest to mock return values from the database. This is done by calling `jest` and using the `spyOn` function to get the request you want to mock. After doing this, use either `mockReturnValueOnce` or `mockRejectedValueOnce` depending on if youre testing the expected value or the rejected value from the request.
>Because defined variables have type match errors, it is recommended to use `@ts-ignore` before `mockReturnValueOnce` and `mockRejectedValueOnce`.
After each test, the mocks need to be cleared, this can be accomplished by including:
```ts
beforeEach(async () => {
    jest.resetAllMocks()
})
```
### Example
```ts
const mockAuthorization = jest
    .spyOn(client.user,"findUnique")
    // @ts-ignore
    .mockReturnValue(adminPayload)
```

## Making App Server Requests Using Supertest
This service uses Supertest to make requests to the instance of the server. This is done using `request` from supertest. This must be defined in the beginning of the suite using:
```ts
const request = require('supertest')
```
If the request has the authorize function, you must use the `set` method with the header title `Authorize` and info as `Bearer ${token}` where `token` is defined in the `beforeEach` as:
```ts
token = sign({userId: string()})
```
If the request requires an input, add a `send` method to the request with its parameters as the object input for the request.
### Example
```ts
const {statusCode, body} = await request(app)
    .post("/terms")
    .set('Authorization',`Bearer ${token}`)
    .send(termInput)
```

## Creating a Test
Write a `describe` block with the request you are testing:
```ts
describe("Account GET", () => {})
```
>This `describe` block should have multiple tests within it.

Add another `describe` block with a description of the parameters and conditions you are using when making the request:
```ts
describe("Account GET", () => {
    describe("Sending request with valid token", () => {})
})
```
Write an `it` block that describes what the return values of request with those parameters and conditions:
```ts
describe("Account GET", () => {
    describe("Sending request with valid token", () => {
        it("Should return a 200 and a user", async () => {})
    })
})
```
>The `it` block should be asyncronous because of the [requests](#making-app-server-requests-using-supertest).

Write the testing code within this `it` block using `expect` functions to test the return values of the request and the mocked database requests:
```ts
describe("Account GET", () => {
    describe("Sending request with valid token", () => {
        it("Should return a 200 and a user", async () => {
            const mockAuthorization = jest
                .spyOn(client.user,"findUnique")
                // @ts-ignore
                .mockReturnValue(adminPayload)
            const {statusCode, body} = await request(app)
                .get("/account")
                .set('Authorization', `Bearer ${token}`)
            expect(statusCode).toBe(200)
            expect(body).toEqual(adminPayload)
            expect(mockAuthorization).toHaveBeenCalledWith({where: {id: parse(token).userId}})
        })
    })
})
```

## Running the Tests
Run `npm test` in the command line to run all of your test suites. You can add arguments to the command using `--` after the command and before the argument with a space in between both. These arguments and info can be found on [Jest](https://jestjs.io/docs/cli).

## Using Github Actions to Automate
This service uses [Github Actions](https://docs.github.com/en/actions) to automate its tests. To update the automated actions performed, update the `node.js.yml` in the `github\workflows` folder. The traits needed for testing purposes are as following:
- `on` which is used to decide what Github actions will trigger tests.
- `runs-on` which decides what operating systems to run the tests on.
- `node-version` which decides which versions of `nodejs` to run the tests on.
- `env` which decides the environment to run the tests on.
- `steps` which holds the differents steps to take when running the tests which include running the tests themselves.