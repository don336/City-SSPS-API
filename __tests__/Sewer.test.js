import testBase from "./index";
import mongoose from "mongoose";


let swrId;
let session;

describe("Sewer Management", () => {
  beforeAll(async () => {
    await testBase.get("http://localhost:8000/user/auth/login").send();

    const swrObj = {
      city: "city1",
      neighborhood: "neigh2",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "2",
      comments: "I need help",
    };

    session = await mongoose.startSession();
    session.startTransaction();

    const sewer = await testBase.post("/sewer").send(swrObj);
    const id = sewer.body.sewer._id;
    swrId = id;
  }, 20000);

  afterAll(async () => {
    await session.commitTransaction();
    session.endSession();
    await mongoose.connection.close();
  });

  it("should get all sewer issues", async () => {
    const response = await testBase.get("/sewer").send({});
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
    expect(response.body.message).toEqual("Sewers Found");
  }, 20000); // Increase the timeout to 20000 milliseconds (20 seconds)

  it("should get a sewer issue", async () => {
    const response = await testBase.get(`/sewer/${swrId}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sewer Found");
  });

  it("shouldn't return an issue with a none existing id", async () => {
    const response = await testBase.get(`/sewer/64b247e0693c1ad3eab2arb4`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Sewer Issue not found");
  });

  it("shouldn't return an issue with a non valid id", async () => {
    const response = await testBase.get(`/sewer/r4nd0mnumb3r`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Wrong id");
  });

  it("should post a Sewer issue", async () => {
    const issue = {
      city: "city2",
      neighborhood: "neigh3",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "3",
      comments: "I need help"
    };
    const response = await testBase.post("/sewer").send(issue);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Issue Added to Database");
  });

  it("should not post an incomplete Sewer issue", async () => {
    const issue = {
      city: "city2",
      neighborhood: "neigh3",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "3"
    };
    const response = await testBase.post("/sewer").send(issue);
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All Fields are required");
  });



  it("Should Update the sewer issue given id", async () => {
    const issue = {
      city: "city2",
      neighborhood: "neigh3",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "3",
      comments: "I need help",
    };
    const response = await testBase.put(`/sewer/${swrId}`).send(issue);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Updated Issue Added to Database");
  });

  it("Should not Update the sewer issue given wrong id", async () => {
    const issue = {
      city: "city2",
      neighborhood: "neigh3",
      fullName: "John Doe",
      email: "Doe@gmail.com",
      level: "3",
      comments: "I need help",
    };
    const response = await testBase.put(`/sewer/64b247e0693c1ad3eab2arb`).send(issue);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server Error");
  });

  it("Should not Update the sewer issue given id", async () => {
    const response = await testBase
      .put(`/sewer/64b247e0693c1ad3eab2arb4`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing required fields.");
  });

  it("Should delete a sewer issue", async () => {
    const response = await testBase.delete(`/sewer/${swrId}`).send();
    
    expect(response.status).toBe(204);
    //expect(response.body.message).toBe("Issue Deleted");
  });

  it("Should raise error deleting a sewer issue", async () => {
    const response = await testBase.delete(`/sewer/64b247e0693c1ad3eab2arb4`).send();

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server Error");
  });
});
