'use strict'

const express = require('express')
const createServer = require('http-errors')
const path = require('path')

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

// error handler
app.use(function(req, res, next) {
  next(createServer(404))
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)

  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app