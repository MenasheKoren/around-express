const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  it("should show a response from the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
