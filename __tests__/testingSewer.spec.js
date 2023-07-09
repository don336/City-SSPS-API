import request from 'supertest';
import app from '../src/Routes/app'; 

describe('API Routes', () => {
  let createdItemId; 

  describe('POST /api/v1/sewer', () => {
    it('should create a new sewer item', async () => {
      const response = await request(app)
        .post('/api/v1/sewer')
        .send({
            "city": "Lima",
            "neighborhood": "Elio",
            "fullName": "Hugo Rivera",
            "email": "riv22006@byui.edu",
            "dateReport": "2023-07-08",
            "level": "2",
            "comments": "This is a test"
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');

      createdItemId = response.body._id;
    });
  });

  console.log('createdItemId:', createdItemId);

  
  describe('GET /api/v1/sewer/:_id', () => {
    it('should retrieve an existing sewer item', async () => {
      const response = await request(app).get(`/api/v1/sewer/${createdItemId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', createdItemId);
  
    });
  });

  
  describe('PUT /api/v1/sewer/:_id', () => {
    it('should update an existing sewer item', async () => {
      const response = await request(app)
        .put(`/api/v1/sewer/${createdItemId}`)
        .send({
            "city": "Lima",
            "neighborhood": "Elio",
            "fullName": "Andres Sosa",
            "email": "riv22006@byui.edu",
            "dateReport": "2023-07-08",
            "level": "2",
            "comments": "This is a second test"
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('comments', "This is a second test");
      expect(response.body).toHaveProperty('_id', createdItemId);
      
    });
  });

  
  describe('DELETE /api/v1/sewer/:_id', () => {
    it('should delete an existing sewer item', async () => {
      const response = await request(app).delete(`/api/v1/sewer/${createdItemId}`);

      expect(response.statusCode).toBe(204);
    });
  });

 

 
//   describe('Power Routes', () => {
 
//   });

//   describe('Street Routes', () => {
 
//   });

//   describe('Security Routes', () => {
 
//   });
});