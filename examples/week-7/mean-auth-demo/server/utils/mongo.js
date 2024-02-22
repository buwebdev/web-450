/**
 * Title: mongo.js
 * Author: Professor Krasso
 * Date: 2/14/2024
 */
"use strict"

// Require statements
const { MongoClient } = require("mongodb")

// Connection string for MongoDB Atlas
const MONGO_URL = "mongodb+srv://web_450_user:s3cret@cluster0.lujih.mongodb.net/?retryWrites=true&w=majority"

let db = null; // Create a variable to hold the database connection

/**
 * @description This function connects to the MongoDB cluster and returns the database object
 * @returns {Promise<null|Db>}
 */
const connect = async () => {
  if (db) return db; // If the database connection exists, return it

  // Connect to the MongoDB cluster
  const client = await MongoClient.connect(MONGO_URL);

  db = client.db("web_450"); // Select the database
  return db; // Return the database connection
};

/**
 * @description This function performs an operation on the database
 * @param {*} operation The operation to perform on the database
 * @returns {Promise<*>} The result of the operation
 */
const performOperation = async (operation) => {
  const db = await connect(); // Connect to the database
  return operation(db); // Perform the operation
};

module.exports = { performOperation }; // Export the performOperation function
