import testBase from "./index";
import mongoose from "mongoose";

let strtId;
let session;

describe("Security Management", () => {
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

    const security = await testBase.post("/security").send(strtObj);
    // console.log(security, "==========================>");
    const id = security.body.newIssue._id;
    strtId = id;
    console.log(strtId, "==========================>");
  }, 20000);

  afterAll(async () => {
    await session.commitTransaction();
    session.endSession();
    await mongoose.connection.close();
  });

  it("should get all security issues", async () => {
    const response = await testBase.get("/security").send({});

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
    expect(response.body.message).toEqual("Security Found");
  }, 20000); // Increase the timeout to 20000 milliseconds (20 seconds)

  it("should get a security issue", async () => {
    const response = await testBase.get(`/security/${strtId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Security Found");
  });

  it("shouldn't return an issue with a none existing id", async () => {
    const response = await testBase.get(`/security/64b247e0693c1ad3eab2arb4`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Security Issue not found");
  });

  it("should post a security issue", async () => {
    const issue = {
      city: "city2",
      neighborhood: "neigh3",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "3",
      comments: "I need help",
    };
    const response = await testBase.post("/security").send({ issue });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Issue Added to Database");
  });

  it("Should Update the security issue given id", async () => {
    const issue = {
      city: "city2",
      neighborhood: "neigh3",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "3",
      comments: "I need help",
    };
    const response = await testBase.put(`/security/${strtId}`).send({ issue });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Updated Issue Added to Database");
  });

  it("Should not Update the security issue given id", async () => {
    const response = await testBase
      .put(`/security/64b247e0693c1ad3eab2arb4`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("At least one Field is required");
  });

  it("Should delete a security issue", async () => {
    const response = await testBase.delete(`/security/${strtId}`).send();

    expect(response.status).toBe(204);
    expect(response.body.message).toBe("Issue Deleted");
  });
});
