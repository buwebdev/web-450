const express = require('express');
const createError = require('http-errors');
const path = require('path');

const helloRouter = require('./routes/hello/index')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/mean/browser')))
app.use('/', express.static(path.join(__dirname, '../dist/mean/browser')))

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
