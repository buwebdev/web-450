/**
 * Author: Professor Krasso
 * Date: 8/10/24
 * File: index.js
 * Description: Sign-in route
 */

'use strict';

// Require statements
const express = require('express');
const bcrypt = require('bcryptjs');
const { mongo } = require('../../utils/mongo');
const createError = require('http-errors');

const router = express.Router(); // Creates a new router object

/**
 * @description
 *
 * POST /signin
 *
 * Sign-in route for the application.
 *
 * // Sign-in route
 *
 * Example:
 * fetch('/signin', {
 *  method: 'POST',
 * headers: {
 * 'Content-Type': 'application/json'
 * },
 * body: JSON.stringify({
 * username: 'admin',
 * password: 'password'
 * })
 * })
 * .then(response => response.json())
 * .then(data => console.log(data));
 */
router.post('/signin', (req, res, next) => {
  try {
    const { username, password } = req.body; // Destructure the username and password from the request body

    mongo(async db => {
      // Find the user by username
      const user = await db.collection('users').findOne({ username });

      // Compare the password to the hashed password in the database
      let passwordIsValid = bcrypt.compareSync(password, user.passwordHash);

      // If the password is invalid, return a 401 status code
      if (!passwordIsValid) {
        return next(createError(401, 'Not authorized')); // Return a 401 status code
      }

      // If the password is valid, return the user object
      res.send({
        username: user.username,
        role: user.role
      })
    }, next);
  } catch (err) {
    console.error('Error in /signin', err);
    next(err);
  }
});

module.exports = router;