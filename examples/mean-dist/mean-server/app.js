const express = require('express');
const createError = require('http-errors');
const url = require('url');

const helloRouter = require('./routes/hello/index')

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // This allows all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed request methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allowed headers
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/hello', helloRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler for all other errors
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
