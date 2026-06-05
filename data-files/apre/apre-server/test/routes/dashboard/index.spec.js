/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: index.spec.js
 * Description: Test the dashboard API
 */

'use strict';

// Require the modules
const request = require('supertest');
const express = require('express');
const router = require('../../../src/routes/dashboard/index');
const { mongo } = require('../../../src/utils/mongo');

jest.mock('../../../src/utils/mongo'); // mock the mongo module

// Create an express application
const app = express();
app.use(express.json());
app.use('/api/dashboard', router);

// Test the dashboard API
describe('Apre Dashboard API', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  it('GET /api/dashboard/sales-data should fetch sales data grouped by region', async () => {
    mongo.mockImplementation(async (callback) => {
      // Mock the MongoDB collection
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            { region: 'North', totalAmount: 1000 },
            { region: 'South', totalAmount: 2000 }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/dashboard/sales-data'); // Send a GET request to the sales-data endpoint

    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      { region: 'North', totalAmount: 1000 },
      { region: 'South', totalAmount: 2000 }
    ]);
  });

  // Test the agent-performance endpoint
  it('GET /api/dashboard/agent-performance should fetch agent performance data', async () => {
    // Mock the mongo function
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            { agentId: '1', name: 'Agent A', averagePerformance: 90 },
            { agentId: '2', name: 'Agent B', averagePerformance: 85 }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/dashboard/agent-performance'); // Send a GET request to the agent-performance endpoint
    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      { agentId: '1', name: 'Agent A', averagePerformance: 90 },
      { agentId: '2', name: 'Agent B', averagePerformance: 85 }
    ]);
  });

  // Test the customer-feedback endpoint
  it('GET /api/dashboard/customer-feedback should fetch customer feedback data', async () => {
    // Mock the mongo function
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            { feedbackType: 'Positive', averagePerformance: 4.5 },
            { feedbackType: 'Negative', averagePerformance: 2.0 }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/dashboard/customer-feedback'); // Send a GET request to the customer-feedback endpoint
    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      { feedbackType: 'Positive', averagePerformance: 4.5 },
      { feedbackType: 'Negative', averagePerformance: 2.0 }
    ]);
  });

  // Test the report-types endpoint
  it('GET /api/dashboard/report-types should fetch report types and their counts', async () => {

    // Mock the mongo function
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              salesReport: [{ count: 10 }],
              customerFeedbackReport: [{ count: 5 }],
              agentPerformanceReport: [{ count: 8 }]
            }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/dashboard/report-types'); // Send a GET request to the report-types endpoint

    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual({
      reportCounts: [10, 5, 8],
      reportTypes: [
        "Sales Report",
        "Customer Feedback Report",
        "Agent Performance Report"
      ]
    });
  });

  // Test the agent-feedback endpoint
  it('GET /api/dashboard/agent-feedback should fetch agent feedback data', async () => {
    mongo.mockImplementation(async (callback) => {
      // Mock the MongoDB collection
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              agent: 'Agent A',
              callDuration: 120,
              customerFeedback: ['Good', 'Excellent']
            },
            {
              agent: 'Agent B',
              callDuration: 90,
              customerFeedback: ['Average', 'Good']
            }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/dashboard/agent-feedback'); // Send a GET request to the agent-feedback endpoint

    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      {
        agent: 'Agent A',
        callDuration: 120,
        customerFeedback: ['Good', 'Excellent']
      },
      {
        agent: 'Agent B',
        callDuration: 90,
        customerFeedback: ['Average', 'Good']
      }
    ]);
  });
});