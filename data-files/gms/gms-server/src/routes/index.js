/**
 * Author: Professor Krasso
 * Date: 7 August 2024
 * File: index.js
 * Description: Routing for the index page.
 */

// require statements
const express = require('express');
const router = express.Router();

/**
 * @description
 * Route handler for the root path ('/').
 *
 * This route responds with a JSON message when accessed.
 *
 * Usage:
 *
 * router.get('/', function(req, res, next) {
 *   res.send({
 *     message: 'Hello from the ETS server!'
 *   });
 * });
 *
 * Example:
 *
 * // Accessing the root path
 * // GET http://<server-address>/
 *
 * // Response:
 * // {
 * //   "message": "Hello from the ETS server!"
 * // }
 */
router.get('/', function(req, res, next) {
  const appName = 'Gardening Management System';
  res.send({
    message: `Hello from the ${appName} server!`
  });
});

module.exports = router;
