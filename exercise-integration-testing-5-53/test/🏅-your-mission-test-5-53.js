// 🏅 Your mission is to create your first integration tests here 💜
// ✅ Whenever you see this icon, there's a TASK for you
// 💡 - This is an ADVICE symbol, it will appear nearby most tasks and help you in fulfilling the tasks
// Advanced: Unique name, jest-extended
// Delete a sensor, deletes all its events

const request = require("supertest");

const {
    initializeAPI
} = require("../sensors-api");
const nock = require("nock");

let expressApp;

beforeAll(() => {
    expressApp = initializeAPI();
});

beforeEach(() => {
    // 📗 Reading exercise: Why is this needed 👇? Read about npm/nock 
    nock("http://localhost").get("/notification").reply(200, {
        success: true,
    });
});

describe('Sensors test', () => {

    // ✅ TASK: Test that when a new event is posted to /event route, if category or temperature are not specified -> the API returns HTTP 400
    // 💡 TIP: Down below, there is an example event schema
    test('When category is not specified, should get http 400 error', async () => {
        //Arrange
        const eventToAdd = {
            temperature: 20,
            name: 'Thermostat-temperature', //This must be unique
            color: 'Green',
            weight: "80 gram",
            status: "active"
        };

        //Act
        const receivedResponse = await request(expressApp).post("/sensor-events").send(eventToAdd);
        // 💡 TIP: use any http client lib like Axios OR supertest
        // 💡 TIP: This is how it is done with Supertest -> await request(expressApp).post("/sensor-events").send(eventToAdd);

        //Assert
        expect(receivedResponse.status).toBe(400);
        // 💡 TIP: verify that status is 400
    });

    // ✅ TASK: Test that when a new event is posted to /sensor-events route, if category or temperature are not specified -> the event is NOT saved to the DB!
    // 💡 TIP: Testing the response is not enough, the adequate state (e.g. DB) should also satisfy the expectation

    // ✅ TASK: Test that when a new valid event is posted to /sensor-events route, we get back a valid response
    // 💡 TIP: Consider both the HTTP status and the body

    // ✅ TASK: Test that when a new valid event is posted to /sensor-events route, it's indeed retrievable from the DB
    // 💡 TIP: Whenever possible, use the public API for verification

    // ✅ TASK: Test that querying for /sensor-events route works when there is one single event
    // 💡 TIP: Ensure that exactly one was returned and that this is the right event
    // 💡 TIP: Try using as few assertions as possible, maybe even only one

    // ✅ TASK: Test that querying for /sensor-events route works when there are multiple events
    // 💡 TIP: Ensure that all the relevant events were returned

    // ✅ TASK: Test that querying for /sensor-events route and sorting by the field 'name', the results are indeed sorted
    // 💡 TIP: Each test should be independent and might run alone without others, don't count on data (events) from other tests

    // ✅ Learning TASK: Test that when a new valid event is posted to /sensor-events route, if the temperature exceeds 50 degree a notification is being sent
    // 💡 TIP: This was not covered in the course. To achieve this read about the library 'nock' which can verify that the /localhost/notification service was called

    // ✅ Ensure that the webserver is closed when all the tests are completed
    // 💡 TIP: Use the right test hook to call the API and instruct it to close

    // ✅ Spread your tests across multiple files, let the test runner invoke tests in multiple processes - Ensure all pass
    // 💡 TIP: You might face port collision where two APIs instances try to open the same port
    // 💡 TIP: Use the flag 'jest --maxWorkers=<num>'. Assign zero for max value of some specific number greater than 1
});