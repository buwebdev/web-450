/**
 * Author: Professor Krasso
 * Date: 2/21/2024
 * File Name: index.js
 * Description: User routes
 */

"use strict";

// Import the required modules
const express = require("express");
const bcrypt = require("bcryptjs");
const { performOperation } = require("../../utils/mongo");

const router = express.Router(); // Create a new router object

/**
 * @description This route registers a new user
 * @body {string} email - The user's email
 * @body {string} password - The user's password
 * @returns {object} The ID of the inserted user
 * @method POST
 */
router.post("/register", async (req, res, next) => {
  try {
    // Get the user's email and password from the request body and hash the password
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };

    // Check if the user already exists
    const savedUser = await performOperation(db => {
      return db.collection("users").findOne({ email: user.email }); // Find a user with the same email
    })

    /**
     * If a user with the same email already exists, log a message to the console and send a 404 error
     */
    if (savedUser) {
      console.log("User already exists"); // Log a message to the console
      next({ status: 401, message: "User already exists"}) // Send a 404 error if the user already exists
      return; // Return early to prevent the user from being inserted
    }

    // Insert the user into the users collection
    const result = await performOperation(db => {
      const registeredUser = {
        email: user.email,
        password: user.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: "standard",
        selectedSecurityQuestions: req.body.selectedSecurityQuestions
      };

      return db.collection("users").insertOne(registeredUser); // Insert the user into the users collection
    })

    res.send(result.insertedId); // Send the ID of the inserted user as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
});

/**
 * @description This route is used to verify a user's email
 * @param {string} email - The user's email
 * @returns {object} The user object
 * @method GET
 */
router.get("/verify-email/:email", async (req, res, next) => {
  try {
    const email = req.params.email; // Get the email from the request parameters

    console.log("email", email)

    // Check if the user already exists
    const savedUser = await performOperation(db => {
      return db.collection("users").findOne({ email: email }); // Find a user with the same email
    })

    // If the user exists, send the user as a JSON response
    if (savedUser) {
      res.send(savedUser); // Send the user as a JSON response
    } else {
      console.log("User not found"); // Log a message to the console
      next({ status: 404, message: "User not found" }); // Send a 404 error if the user does not exist
    }
  } catch (err) {
    console.error("err", err);
    next(err); // Pass any errors to the error handler
  }
});

/**
 * @description This route is used to verify a user's security questions
 * @param {string} email - The user's email
 * @body {array} securityQuestions - The user's security questions
 * @returns {object} The user object
 * @method POST
 */
router.post("/verify-security-questions/:email", async (req, res, next) => {
  try {
    const email = req.params.email; // Get the email from the request parameters
    const { securityQuestions } = req.body; // Get the security questions from the request body

    // Check if the user already exists
    const user = await performOperation(db => {
      return db.collection("users").findOne({ email: email }); // Find a user with the same email
    })

    // If the user does not exist, send a 404 error
    if (!user) {
      console.error("User not found"); // Log a message to the console
      next({ status: 404, message: "User not found" }); // Send a 404 error if the user does not exist
      return; // Return early to exit the function
    };

    // if the security questions do not match return a 401 error to the client
    if (securityQuestions[0].answer !== user.selectedSecurityQuestions[0].answer ||
      securityQuestions[1].answer !== user.selectedSecurityQuestions[1].answer ||
      securityQuestions[2].answer !== user.selectedSecurityQuestions[2].answer) {
      const err = new Error('Unauthorized') // create a new Error object
      err.status = 401 // set the error status to 401
      err.message = 'Unauthorized: Security questions do not match' // set the error message to 'Security questions do not match'
      console.log('Security questions do not match', err) // log out the error to the console
      next(err) // return the error to the client
      return // return to exit the function
    }

    console.log("User found", user) // log a message to the console

    res.send(user) // return the user object to the client

  } catch (err) {
    console.error("err", err);
    next(err); // Pass any errors to the error handler
  }
});

/**
 * @description This route is used to reset a user's password
 * @param {string} email - The user's email
 * @body {string} password - The user's new password
 * @returns {void}
 * @method POST
 */
router.post("/reset-password/:email", async (req, res, next) => {
  try {
    const email = req.params.email; // Get the email from the request parameters
    const password = req.body.password; // Get the password from the request body

    // Check if the user already exists
    const user = await performOperation(db => {
      return db.collection("users").findOne({ email: email }); // Find a user with the same email
    })

    // If the user does not exist, send a 404 error
    if (!user) {
      console.error("User not found"); // Log a message to the console
      next({ status: 404, message: "User not found" }); // Send a 404 error if the user does not exist
      return; // Return early to exit the function
    };

    // hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // update the user's password
    const result = await performOperation(db => {
      return db.collection("users").updateOne({ email: email }, { $set: { password: hashedPassword } }); // Update the user's password
    })

    res.status(204).send(); // return a 204 status code to the client
  } catch (err) {
    console.error("err", err);
    next(err); // Pass any errors to the error handler
  }
});

/**
 * @description This route is used to retrieve a user's security questions
 * @param {string} email - The user's email
 * @returns {object} The user's security questions
 * @method GET
 */
router.get("/security-questions/:email", async (req, res, next) => {
  try {
    const email = req.params.email; // Get the email from the request parameters

    // Check if the user already exists
    const user = await performOperation(db => {
      return db.collection("users").findOne({ email: email }); // Find a user with the same email
    })

    // If the user does not exist, send a 404 error
    if (!user) {
      console.error("User not found"); // Log a message to the console
      next({ status: 404, message: "User not found" }); // Send a 404 error if the user does not exist
      return; // Return early to exit the function
    };

    console.log("User found", user.selectedSecurityQuestions); // Log a message to the console

    res.send(user.selectedSecurityQuestions); // Send the user's security questions as a JSON response
  } catch (err) {
    console.error("err", err);
    next(err); // Pass any errors to the error handler
  }
});

module.exports = router; // Export the router object
