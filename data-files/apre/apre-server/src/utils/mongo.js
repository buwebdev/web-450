/**
 * Title: mongo.js
 * Author: Professor Krasso
 * Date: 8/4/23
 */
'use strict'

// Require statements
const { MongoClient } = require('mongodb')
const config = require('./config')

// Connection string for MongoDB Atlas
const MONGO_URL = config.dbUrl

const mongo = async(operations, next) => {
  try {
    console.log('Connecting to MongoDB Atlas...', MONGO_URL)

    // Connect to the MongoDB cluster
    const client = await MongoClient.connect(MONGO_URL);

    // Select the database
    const db = client.db(config.dbname)
    console.log('Connected to MongoDB Atlas')

    // Execute the passed in operation
    await operations(db)
    console.log('Operation was successful')

    // Close the connection
    client.close()
    console.log('Closing connection to MongoDB Atlas...')
  } catch (err) {
    // Catch any errors and throw an error 500 status
    const error = new Error('Error connecting to db ' + err) // NOTE: updated this during sprint 4
    error.status = 500

    // Log out the error
    console.log('Error connecting to db', err)

    next(error)
  }
}

module.exports = { mongo }