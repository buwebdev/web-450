/**
 * Title: index.js
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
  const index = {
    message: 'Welcome to the MEAN Example Project',
    route: '/api/index'
  }

  console.log('GET request made to the API', index) // Log message to the server console.
  res.send(index) // Return JSON message to the client.
})

module.exports = router
