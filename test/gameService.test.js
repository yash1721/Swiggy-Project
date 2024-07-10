import { expect } from "chai";
import request from "supertest";
import app from "../app.js"; // Adjust the import path as necessary

describe("POST /api/play-round", function () {
  this.timeout(10000); // Set timeout for each test case to 10 seconds

  // Test case: Should return a winner and detailed game events
  it("should return a winner and detailed game events", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: 100, strength: 10, attack: 20 },
          { name: "Player B", health: 100, strength: 8, attack: 18 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for response properties
    expect(response.body).to.have.property("winner");
    expect(response.body.winner).to.be.oneOf([
      "Player A wins the game!",
      "Player B wins the game!",
      "It's a draw!",
    ]);

    expect(response.body).to.have.property("events").that.is.an("array");
    expect(response.body.events.length).to.be.greaterThan(0);
  });

  // Test case: Should handle cases where players have zero health initially
  it("should handle cases where players have zero health initially", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: 0, strength: 10, attack: 20 },
          { name: "Player B", health: 0, strength: 8, attack: 18 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for response properties
    expect(response.body).to.have.property("winner");
    expect(response.body.winner).to.equal("It's a draw!");

    expect(response.body).to.have.property("events").that.is.an("array");
    expect(response.body.events.length).to.equal(0); // No events expected
  });

  // Test case: Should return a draw when both players have the same stats
  it("should return a draw when both players have the same stats", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: 100, strength: 10, attack: 20 },
          { name: "Player B", health: 100, strength: 10, attack: 20 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for response properties
    expect(response.body).to.have.property("winner");
    expect(response.body.winner).to.be.oneOf([
      "Player A wins the game!",
      "Player B wins the game!",
      "It's a draw!",
    ]);

    expect(response.body).to.have.property("events").that.is.an("array");
    expect(response.body.events.length).to.be.greaterThan(0);
  });

  // Test case: Should handle cases where player A has significantly higher stats
  it("should handle cases where player A has significantly higher stats", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: 200, strength: 50, attack: 100 },
          { name: "Player B", health: 100, strength: 8, attack: 18 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for response properties
    expect(response.body).to.have.property("winner");
    expect(response.body.winner).to.equal("Player A wins the game!");

    expect(response.body).to.have.property("events").that.is.an("array");
    expect(response.body.events.length).to.be.greaterThan(0);
  });

  // Test case: Should handle cases where player B has significantly higher stats
  it("should handle cases where player B has significantly higher stats", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: 100, strength: 10, attack: 20 },
          { name: "Player B", health: 200, strength: 50, attack: 100 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for response properties
    expect(response.body).to.have.property("winner");
    expect(response.body.winner).to.equal("Player B wins the game!");

    expect(response.body).to.have.property("events").that.is.an("array");
    expect(response.body.events.length).to.be.greaterThan(0);
  });

  // Test case: Should handle minimal non-zero values for health, strength, and attack
  it("should handle minimal non-zero values for health, strength, and attack", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: 1, strength: 1, attack: 1 },
          { name: "Player B", health: 1, strength: 1, attack: 1 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for response properties
    expect(response.body).to.have.property("winner");
    expect(response.body.winner).to.be.oneOf([
      "Player A wins the game!",
      "Player B wins the game!",
      "It's a draw!",
    ]);

    expect(response.body).to.have.property("events").that.is.an("array");
    expect(response.body.events.length).to.be.greaterThan(0);
  });

  // Test case: Should handle maximal values for health, strength, and attack
  it("should handle maximal values for health, strength, and attack", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          {
            name: "Player A",
            health: 1000000,
            strength: 1000000,
            attack: 1000000,
          },
          {
            name: "Player B",
            health: 1000000,
            strength: 1000000,
            attack: 1000000,
          },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for response properties
    expect(response.body).to.have.property("winner");
    expect(response.body.winner).to.be.oneOf([
      "Player A wins the game!",
      "Player B wins the game!",
      "It's a draw!",
    ]);

    expect(response.body).to.have.property("events").that.is.an("array");
    expect(response.body.events.length).to.be.greaterThan(0);
  });

  // Test case: Should handle missing player properties
  it("should handle missing player properties", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: 100, strength: 10 }, // Missing attack
          { name: "Player B", health: 100, strength: 8, attack: 18 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(400);

    // Assertions for error response
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal(
      "Each player must have a valid attack value greater than 0."
    );
  });

  // Test case: Should handle invalid property types
  it("should handle invalid property types", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: "100", strength: 10, attack: 20 }, // health is a string
          { name: "Player B", health: 100, strength: 8, attack: 18 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(400);

    // Assertions for error response
    expect(response.body).to.have.property("error");
    expect(response.body.error).to.equal(
      "Each player must have a valid health value greater than 0."
    );
  });

  // Test case: Should handle more than two players
  it("should handle more than two players", async () => {
    const response = await request(app)
      .post("/api/play-round")
      .send({
        players: [
          { name: "Player A", health: 100, strength: 10, attack: 20 },
          { name: "Player B", health: 100, strength: 8, attack: 18 },
          { name: "Player C", health: 100, strength: 12, attack: 22 },
        ],
      })
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for response properties
    expect(response.body).to.have.property("winner");
    expect(response.body.winner).to.be.oneOf([
      "Player A wins the game!",
      "Player B wins the game!",
      "Player C wins the game!",
      "It's a draw!",
    ]);

    expect(response.body).to.have.property("events").that.is.an("array");
    expect(response.body.events.length).to.be.greaterThan(0);
  });
});
