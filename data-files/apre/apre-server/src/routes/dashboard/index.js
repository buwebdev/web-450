/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre dashboard API for the dashboard graphs and charts
 */

'use strict';

const express = require('express');
const { mongo } = require('../../utils/mongo');

const router = express.Router(); // Creates a new router object

/**
 * @description
 *
 * GET /sales-data
 *
 * Fetches sales data grouped by region.
 *
 * Example:
 * fetch('/sales-data')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/sales-data', (req, res, next) => {
  try {
    mongo(async db => {
      const salesData = await db.collection('sales').aggregate([
        {
          $group: {
            _id: "$region",
            totalAmount: { $sum: "$amount" }
          }
        },
        {
          $project: {
            _id: 0,
            region: "$_id",
            totalAmount: 1
          }
        },
        {
          $sort: {
            region: 1
          }
        }
      ]).toArray();

      res.send(salesData);
    }, next);
  } catch (err) {
    console.error('Error: ' + err.message);
    next(err);
  }
});

/**
 * @description
 *
 * GET /agent-performance
 *
 * Fetches agent performance data, including average performance metrics.
 *
 * Example:
 * fetch('/agent-performance')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/agent-performance', (req, res, next) => {
  try {
    mongo (async db => {
      const agentPerformance = await db.collection('agentPerformance').aggregate([
        {
          $lookup: {
            from: 'agents',
            localField: 'agentId',
            foreignField: 'agentId',
            as: 'agentInfo'
          }
        },
        {
          $unwind: '$agentInfo'
        },
        {
          $group: {
            _id: {
              agentId: '$agentId',
              name: '$agentInfo.name'
            },
            averagePerformance: {
              $avg: {
                $avg: '$performanceMetrics.value'
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            agentId: '$_id.agentId',
            name: '$_id.name',
            averagePerformance: 1
          }
        },
        {
          $sort: {
            name: 1
          }
        }
      ]).toArray();

      res.send(agentPerformance);
    }, next);
  } catch (err) {
    console.error('Error: ' + err.message);
    next(err);
  }
});

/**
 * @description
 *
 * GET /customer-feedback
 *
 * Fetches customer feedback data, including average performance metrics by feedback type.
 *
 * Example:
 * fetch('/customer-feedback')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/customer-feedback', (req, res, next) => {
  try {
    mongo (async db => {
      const customerFeedback = await db.collection('customerFeedback').aggregate([
        {
          $group: {
            _id: '$feedbackType',
            averagePerformance: { $avg: '$performanceMetrics' }
          }
        },
        {
          $project: {
            _id: 0,
            feedbackType: '$_id',
            averagePerformance: 1
          }
        },
        {
          $sort: {
            averagePerformance: -1
          }
        }
      ]).toArray();

      res.send(customerFeedback);
    }, next);
  } catch (err) {
    console.error('Error: ' + err.message);
    next(err);
  }
});

/**
 * @description
 *
 * GET /report-types
 *
 * Fetches the types of reports available and their counts.
 *
 * Example:
 * fetch('/report-types')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/report-types', (req, res, next) => {
  try {
    mongo (async db => {

      const reportTypes = [
        "Sales Report",
        "Customer Feedback Report",
        "Agent Performance Report"
      ];

      const result = await db.collection('sales').aggregate([
        {
          $facet: {
            salesReport: [
              { $count: "count" }
            ],
            customerFeedbackReport: [
              {
                $lookup: {
                  from: 'customerFeedback',
                  pipeline: [{ $count: "count" }],
                  as: 'customerFeedbackReport'
                }
              },
              { $unwind: "$customerFeedbackReport" },
              { $replaceRoot: { newRoot: "$customerFeedbackReport" } }
            ],
            agentPerformanceReport: [
              {
                $lookup: {
                  from: 'agentPerformance',
                  pipeline: [{ $count: "count" }],
                  as: 'agentPerformanceReport'
                }
              },
              { $unwind: "$agentPerformanceReport" },
              { $replaceRoot: { newRoot: "$agentPerformanceReport" } }
            ]
          }
        }
      ]).toArray();

      const reportCounts = [
        result[0].salesReport[0] ? result[0].salesReport[0].count : 0,
        result[0].customerFeedbackReport[0] ? result[0].customerFeedbackReport[0].count : 0,
        result[0].agentPerformanceReport[0] ? result[0].agentPerformanceReport[0].count : 0
      ];

      const finalOutput = {
        reportCounts: reportCounts,
        reportTypes: reportTypes
      };

      res.send(finalOutput);
    }, next);
  } catch (err) {
    console.error('Error: ' + err.message);
    next(err);
  }
});

/**
 * @description
 *
 * GET /agent-feedback
 *
 * Fetches agent feedback data, including call duration and customer feedback.
 *
 * Example:
 * fetch('/agent-feedback')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/agent-feedback', (req, res, next) => {
  try {
    mongo (async db => {
      const agentFeedback = await db.collection('agentPerformance').aggregate([
        {
          $lookup: {
            from: 'agents',
            localField: 'agentId',
            foreignField: 'agentId',
            as: 'agentDetails'
          }
        },
        {
          $unwind: '$agentDetails'
        },
        {
          $group: {
            _id: '$agentDetails.name',
            callDuration: { $sum: '$callDuration' },
            customerFeedback: { $push: '$customerFeedback' }
          }
        },
        {
          $project: {
            _id: 0,
            agent: '$_id',
            callDuration: 1,
            customerFeedback: 1
          }
        },
        {
          $sort: {
            agent: 1
          }
        }
      ]).toArray();

      res.send(agentFeedback);
    }, next);
  } catch (err) {
    console.error('Error: ' + err.message);
    next(err);
  }
});

module.exports = router;