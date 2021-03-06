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
    nock("http://localhost").get("/notification").reply(200, {
        success: true,
    }).persist();
});

describe("Order API #component", () => {
    describe("POST /event", () => {
        test("When a temperature is beyond 50, then expects a notification to be sent", async () => {
            //Arrange
            const highTemperatureEvent = {
                category: "kids-room",
                temperature: 70,
                longtitude: 80,
                latitude: 120,
                name: "Thermostat",
                weight: "80 gram",
                status: "active",
            };

            //Act
            await request(expressApp).post("/sensor-events").send(highTemperatureEvent);

            //Assert
            //expect(nockRecord.isDone()).toBe(true);
        });

        test("When sorting by name, then results are sorted properly", async () => {
            // Arrange
            const secondEvent = {
                category: "unique-category-for-sort",
                temperature: 70,
                name: "def-this-should-come-second",
                weight: "80 gram",
                status: "active",
            };
            const firstEvent = {
                category: "unique-category-for-sort",
                temperature: 70,
                name: "abc-this-should-come-first",
                weight: "80 gram",
                status: "active",
            };
            await request(expressApp).post("/sensor-events").send(secondEvent);
            await request(expressApp).post("/sensor-events").send(firstEvent);

            // Act
            const receivedResult = await request(expressApp).get("/sensor-events/unique-category-for-sort/name");

            // Assert
            expect(receivedResult.body).toMatchObject([firstEvent, secondEvent]);
        });
    });
});