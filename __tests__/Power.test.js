import testBase from "./index";
import mongoose from "mongoose";

let strtId;
let session;

describe("Power Management", () => {
  beforeAll(async () => {
    await testBase.get("http://localhost:8080/user/auth/login").send();

    const strtObj = {
      city: "city1",
      neighborhood: "neigh2",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "2",
      comments: "I need help",
    };

    session = await mongoose.startSession();
    session.startTransaction();

    const power = await testBase.post("/power").send(strtObj);
    // console.log(power, "==========================>");
    const id = power.body.newIssue._id;
    strtId = id;
    console.log(strtId, "==========================>");
  }, 20000);

  afterAll(async () => {
    await session.commitTransaction();
    session.endSession();
    await mongoose.connection.close();
  });

  it("should get all power issues", async () => {
    const response = await testBase.get("/power").send({});

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
    expect(response.body.message).toEqual("Powers Found");
  }, 20000); // Increase the timeout to 20000 milliseconds (20 seconds)

  it("should get a power issue", async () => {
    const response = await testBase.get(`/power/${strtId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Power Found");
  });

  it("shouldn't return an issue with a none existing id", async () => {
    const response = await testBase.get(`/power/64b247e0693c1ad3eab2arb4`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Power Issue not found");
  });

  it("should post a power issue", async () => {
    const issue = {
      city: "city2",
      neighborhood: "neigh3",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "3",
      comments: "I need help",
    };
    const response = await testBase.post("/power").send({ issue });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Issue Added to Database");
  });

  it("Should Update the power issue given id", async () => {
    const issue = {
      city: "city2",
      neighborhood: "neigh3",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "3",
      comments: "I need help",
    };
    const response = await testBase.put(`/power/${strtId}`).send({ issue });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Updated Issue Added to Database");
  });

  it("Should not Update the power issue given id", async () => {
    const response = await testBase
      .put(`/power/64b247e0693c1ad3eab2arb4`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("At least one Field is required");
  });

  it("Should delete a power issue", async () => {
    const response = await testBase.delete(`/power/${strtId}`).send();

    expect(response.status).toBe(204);
    expect(response.body.message).toBe("Issue Deleted");
  });
});
