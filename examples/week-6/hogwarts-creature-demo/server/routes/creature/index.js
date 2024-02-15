/**
 * Author: Professor Krasso
 * Date: 2/15/2024
 * File Name: index.js
 * Description: Index file for the creature routes
 */

"use strict";

// Import the required modules
const express = require("express");
const router = express.Router();
const { performOperation } = require("../../utils/mongo"); // Import the performOperation function from the mongo module
const { ObjectId } = require("mongodb"); // Import the ObjectId class from the mongodb module

/**
 * @description Get all creatures
 * @returns {Array} An array of creatures
 * @method GET
 */
router.get("/", async (req, res, next) => {
  try {
    const creatures = await performOperation(db => {
      return db.collection("creatures").find({}).toArray();
    }); // Returns a promise that resolves to an array of creatures
    res.json(creatures); // Sends the creatures as a JSON response
  } catch (err) {
    next(err); // Passes the error to the error handler
  }
});

/**
 * @description Create a new creature
 * @returns {ObjectId} The ID of the new creature
 * @body {Object} creature - The creature to be created
 * @method POST
 */
router.post("/", async(req, res, next) => {
  try {
    const creature = req.body; // The creature to be created
    const result = await performOperation(db => {
      return db.collection("creatures").insertOne(creature);
    }); // Returns a promise that resolves to the result of the insert operation
    res.json(result.insertedId); // Sends the ID of the new creature as a JSON response
  } catch (err) {
    next(err); // Passes the error to the error handler
  }
});

/**
 * @description Get a creature by ID
 * @param {string} id - The ID of the creature to be retrieved
 * @returns {Object} The creature with the specified ID
 * @method GET
 */
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id; // The ID of the creature to be retrieved

    // Check if the ID is valid (i.e., a valid ObjectId) using the isValid method of the ObjectId class from the mongodb module
    if (!ObjectId.isValid(id)) {
      return next({ status: 400, message: "Invalid creature ID" }); // Passes a 400 error to the error handler
    }

    const creature = await performOperation(db => {
      return db.collection("creatures").findOne({ _id: new ObjectId(id) });
    }); // Returns a promise that resolves to the creature with the specified ID
    if (creature) {
      res.json(creature); // Sends the creature as a JSON response
    } else {
      next({ status: 404, message: "Creature not found" }); // Passes a 404 error to the error handler
    }
  } catch (err) {
    next(err); // Passes the error to the error handler
  }
});

/**
 * @description Update a creature by ID
 * @param {string} id - The ID of the creature to be updated
 * @body {Object} creature - The updated creature
 * @returns {204} No Content
 */
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id // The ID of the creature to be updated
    const creature = req.body; // The updated creature

    // Check if the ID is valid (i.e., a valid ObjectId) using the isValid method of the ObjectId class from the mongodb module
    if (!ObjectId.isValid(id)) {
      return next({ status: 400, message: "Invalid creature ID" }); // Passes a 400 error to the error handler
    }

    const result = await performOperation(db => {
      return db.collection("creatures").updateOne({ _id: new ObjectId(id) }, { $set: creature });
    }); // Returns a promise that resolves to the result of the update operation

    if (result.matchedCount) { // If the update operation matched a document
      res.sendStatus(204); // Sends a 204 No Content response
    } else {
      next({ status: 404, message: "Creature not found" }); // Passes a 404 error to the error handler
    }
  } catch (err) {
    next(err); // Passes the error to the error handler
  }
});

/**
 * @description Delete a creature by ID
 * @param {string} id - The ID of the creature to be deleted
 * @returns {204} No Content
 * @method DELETE
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id; // The ID of the creature to be deleted

    // Check if the ID is valid (i.e., a valid ObjectId) using the isValid method of the ObjectId class from the mongodb module
    if (!ObjectId.isValid(id)) {
      return next({ status: 400, message: "Invalid creature ID" }); // Passes a 400 error to the error handler
    }

    const result = await performOperation(db => {
      return db.collection("creatures").deleteOne({ _id: new ObjectId(id) });
    }); // Returns a promise that resolves to the result of the delete operation
    if (result.deletedCount) {
      res.sendStatus(204); // Sends a 204 No Content response
    } else {
      next({ status: 404, message: "Creature not found" }); // Passes a 404 error to the error handler
    }
  } catch (err) {
    next(err); // Passes the error to the error handler
  }
});

module.exports = router;