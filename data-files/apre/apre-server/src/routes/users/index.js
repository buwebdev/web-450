/**
 * Author: Professor Krasso
 * Date: 8/9/2024
 * File: index.js
 * Description: Routes for the users collection.
 */

'use strict';

// Require statements
const express = require('express');
const { mongo } = require('../../utils/mongo');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

const router = express.Router(); // Create a new router object
const saltRounds = 10; // Number of salt rounds for the bcrypt hashing algorithm

/**
 * @description
 * GET /users
 *
 * Retrieves a list of all users from the database.
 *
 * Example:
 *
 * // Fetch all users
 * fetch('/users')
 *   .then(response => response.json())
 *   .then(data => console.log(data));
 */
router.get('/', async (req, res, next) => {
  try {
    mongo(async db => {
      const users = await db.collection('users').find().toArray();
      console.log('List of all users in the database:', users);
      res.send(users);
    }, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * @description
 * GET /users/:id
 *
 * Retrieves a single user from the database by ID.
 *
 * Example:
 *
 * // Fetch a single user by ID
 * fetch('/users/650c1f1e1c9d440000a1b1c3')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 *
 */
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;

    mongo(async db => {
      const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
      console.log('User with ID:', user);
      res.send(user);
    }, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * @description
 * POST /users
 *
 * Creates a new user in the database.
 *
 * Example:
 *
 * // Create a new user
 * fetch('/users', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     user: {
 *       username: 'jdoe',
 *       passwordHash: 'Password01',
 *       email: 'jdoe@example.com',
 *       role: 'user'
 *     }
 *   })
 * })
 *   .then(response => response.json())
 *   .then(data => console.log(data));
 */
router.post('/', (req, res, next) => {
  try {
    const { user } = req.body;
    console.log('User from the request body:', user);

    user.passwordHash = bcrypt.hashSync(user.passwordHash, saltRounds);
    user.createdAt = new Date().toISOString();
    user.updatedAt = new Date().toISOString();

    mongo(async db => {
      const result = await db.collection('users').insertOne(user);
      console.log('Result of the insert:', result);
      res.send({
        id: result.insertedId,
      });
    }, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * @description
 * PUT /users/:id
 *
 * Updates an existing user in the database.
 *
 * Example:
 *
 * // Update a user
 * fetch('/users/650c1f1e1c9d440000a1b1c3', {
 *   method: 'PUT',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     username: 'jdoe',
 *     role: 'admin',
 *     email: 'jdoe@example.com',
 *     password: 'NewPassword123'
 *   })
 * })
 *   .then(response => response.json())
 *   .then(data => console.log(data));
 */
router.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, role, email, password } = req.body;
    const updateFields = {};

    if (username) updateFields.username = username;
    if (role) updateFields.role = role;
    if (email) updateFields.email = email;
    if (password) updateFields.passwordHash = bcrypt.hashSync(password, saltRounds);

    updateFields.updatedAt = new Date().toISOString();

    mongo(async db => {
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateFields },
      );
      console.log('Result of the update:', result);
      res.send({
        id: id,
      });
    }, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * @description
 *
 * DELETE /users/:id
 *
 * Deletes a user from the database by ID.
 *
 * Example:
 *
 * // Delete a user by ID
 * fetch('/users/650c1f1e1c9d440000a1b1c3', {
 *  method: 'DELETE'
 * })
 *  .then(response => response.json())
 * .then(data => console.log(data));
 */
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    mongo(async db => {
      const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
      console.log('Result of the delete:', result);
      res.send({
        id: id,
      });
    }, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;