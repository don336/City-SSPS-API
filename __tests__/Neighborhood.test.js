import testBase from "./index";
import mongoose from "mongoose";

let nghId;
let session;

describe("Neighborhood Management", () => {
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
    const neighborhood = sewer.body.sewer.neighborhood;
    nghId = neighborhood;
    
  }, 20000);

  afterAll(async () => {
    await session.commitTransaction();
    session.endSession();
    await mongoose.connection.close();
  });

  it("should get all neighborhoods", async () => {
    const response = await testBase.get(`/neighborhood/${nghId}`).send({});
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
    
  }, 20000); // Increase the timeout to 20000 milliseconds (20 seconds)


});
