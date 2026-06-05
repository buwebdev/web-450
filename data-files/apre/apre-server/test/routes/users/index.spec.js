/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: index.spec.js
 * Description: Test the users API
 */

// Require the modules
const request = require('supertest');
const app = require('../../../src/app');
const { mongo } = require('../../../src/utils/mongo');

jest.mock('../../../src/utils/mongo');

// Test the users API
describe('Users API', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test the GET /users endpoint
  it('should fetch a list of all users', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockResolvedValue([
          { _id: '123', username: 'user1', email: 'user1@example.com', role: 'admin' },
          { _id: '456', username: 'user2', email: 'user2@example.com', role: 'user' }
        ])
      };
      await callback(db);
    });

    const response = await request(app).get('/api/users'); // Send a GET request to the /users endpoint

    expect(response.status).toBe(200); // Expect a 200 status code
    expect(response.body).toEqual([
      { _id: '123', username: 'user1', email: 'user1@example.com', role: 'admin' },
      { _id: '456', username: 'user2', email: 'user2@example.com', role: 'user' }
    ]); // Expect the response body to match the expected data
  });

  // Test the GET /users/:id endpoint
  it('should fetch a single user by ID', async () => {
    const userId = '650c1f1e1c9d440000a1b1c3';
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockResolvedValue({ _id: userId, username: 'user1', email: 'user1@example.com', role: 'admin' })
      };
      await callback(db);
    });

    const response = await request(app).get(`/api/users/${userId}`); // Send a GET request to the /users/:id endpoint

    expect(response.status).toBe(200); // Expect a 200 status code
    expect(response.body).toEqual({ _id: userId, username: 'user1', email: 'user1@example.com', role: 'admin' }); // Expect the response body to match the expected data
  });

  // Test the POST /users endpoint
  it('should create a new user', async () => {
    const newUser = {
      username: 'jdoe',
      passwordHash: 'Password01',
      email: 'jdoe@example.com',
      role: 'user'
    };

    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        insertOne: jest.fn().mockResolvedValue({ insertedId: '789' })
      };
      await callback(db);
    });

    const response = await request(app)
      .post('/api/users')
      .send({ user: newUser }); // Send a POST request to the /users endpoint

    expect(response.status).toBe(200); // Expect a 200 status code
    expect(response.body).toEqual({ id: '789' }); // Expect the response body to match the expected data
  });

  // Test the PUT /users/:id endpoint
  it('should update an existing user', async () => {
    const userId = '650c1f1e1c9d440000a1b1c3';
    const updatedUser = {
      username: 'jdoe',
      role: 'admin',
      email: 'jdoe@example.com',
      password: 'NewPassword123'
    };

    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 })
      };
      await callback(db);
    });

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser); // Send a PUT request to the /users/:id endpoint

    expect(response.status).toBe(200); // Expect a 200 status code
    expect(response.body).toEqual({ id: userId }); // Expect the response body to match the expected data
  });

  // Test the DELETE /users/:id endpoint
  it('should delete a user by ID', async () => {
    const userId = '650c1f1e1c9d440000a1b1c3';

    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
      };
      await callback(db);
    });

    const response = await request(app).delete(`/api/users/${userId}`); // Send a DELETE request to the /users/:id endpoint

    expect(response.status).toBe(200); // Expect a 200 status code
    expect(response.body).toEqual({ id: userId }); // Expect the response body to match the expected data
  });
});