const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.send({
      message: 'Welcome to the MEAN Stack API'
    })
  } catch (err) {
    console.error('Error occurred while retrieving data from the database', err);
    next(err);
  }
});

module.exports = router;
