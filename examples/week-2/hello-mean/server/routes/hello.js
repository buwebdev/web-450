/**
 * Title: hello.js
 * Author: Professor Krasso
 * Date: 8/9/2023
 */
'use strict'

// Import express
const express = require('express')
const router = express.Router()

/**
 * API: hello.js
 * @param {*} req
 * @returns {object}
 */
router.get('/', function (req, res, next) {
  // JSON message to the client to let them know the API is working.
  const hello = {
    message: 'Hello World!',
    route: '/api/hello'
  }

  console.log('GET request made to the API', hello) // Log message to the server console.
  res.send(hello) // Return JSON message to the client.
})

module.exports = router
