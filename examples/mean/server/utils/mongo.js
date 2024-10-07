/**
 * Title: mongo.js
 * Author: Professor Krasso
 * Date: 8/4/23
 */
'use strict'

// Require statements
const { MongoClient } = require('mongodb')

// Connection string for MongoDB Atlas
// TODO: Update this connection string with your own credentials
const MONGO_URL = 'mongodb+srv://nodebucket_user:s3cret@cluster0.lujih.mongodb.net/nodebucketDB?retryWrites=true&w=majority'

const mongo = async(operations, next) => {
  try {
    console.log('Connecting to MongoDB Atlas...')

    // Connect to the MongoDB cluster
    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // Select the database
    const db = client.db('nodebucketDB')
    console.log('Connected to MongoDB Atlas')

    // Execute the passed in operation
    await operations(db)
    console.log('Operation was successful')

    // Close the connection
    client.close()
    console.log('Closing connection to MongoDB Atlas...')
  } catch (err) {
    // Catch any errors and throw an error 500 status
    const error = new Error('Error connecting to db', err)
    error.status = 500

    // Log out the error
    console.log('Error connecting to db', err)

    next(error)
  }
}

module.exports = { mongo }
