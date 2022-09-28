const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

const mockWorkShift = {
  workerId: "633279d2907d62960301be50",
  shiftId: "633241a28ca148fc678287f6",
  startTime: "2022-09-29T16:00:00.000+00:00",
  endTime: "2022-09-29T24:00:00.000+00:00",
};

const mockWorkShift2 = {
  workerId: "632efe0ec585195f481d293a",
  shiftId: "633241998ca148fc678287f3",
  startTime: "2022-09-25T15:00:00.000+00:00",
  endTime: "2022-09-25T24:00:00.000+00:00",
};
const mockWorkShift3 = {
  workerId: "632f0162562bd67546312393",
  shiftId: "633241848ca148fc678287f0",
  startTime: "2022-09-25T08:00:00.000+00:00",
  endTime: "2022-09-25T16:00:00.000+00:00",
};
describe("Shift Should be created successfully", () => {
  it("A Shift can be assigned to a worker", async () => {
    const res = await request(app)
      .post("/api/v1/worker_shift/633279d2907d62960301be50")
      .send(mockWorkShift);
    expect(res._body.message).to.equal("Shift assigned successful");
    expect(res.status).to.equal(200);
  });
});
describe("Shift Should be eight hours interval", () => {
  it("A Shift Must be eight (8) hours interval]", async () => {
    const res = await request(app)
      .post("/api/v1/worker_shift/632efe0ec585195f481d293a")
      .send(mockWorkShift2);
    expect(res._body.message).to.equal(
      "Shift Duration must be eight hours interval"
    );
  });
});
describe("A worker never has two shifts on the same day ", () => {
  it("A Worker can only do one shift within twenty four (24) hours", async () => {
    const res = await request(app)
      .post("/api/v1/worker_shift/633279d2907d62960301be50")
      .send(mockWorkShift);
    expect(res._body.message).to.equal("Worker has a shift already");
    expect(res.status).to.equal(400);
  });
});
describe("Shift Should be with in a day", () => {
  it("A Shift Date and Time must be in the future", async () => {
    const res = await request(app)
      .post("/api/v1/worker_shift/633241848ca148fc678287f0")
      .send(mockWorkShift3);
    expect(res._body.message).to.equal("Date and Time must be in the future");
    expect(res.status).to.equal(400);
  });
});
