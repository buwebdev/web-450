'use strict'

const { MongoClient } = require('mongodb')
const config = require('./server/utils/config')
const bcrypt = require('bcryptjs')

const MONGO_URL = config.DB_URL
const DB_NAME = config.DB_NAME
const saltRounds = 10

const client = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function dbInit() {
  try {
    const db = client.db(DB_NAME) // connect to nodebucketdb

    await db.dropCollection('employees') // drop the employees collection

    await db.createCollection('employees', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            empId: { bsonType: 'number'},
            firstName: { bsonType: 'string'},
            lastName: { bsonType: 'string'},
            email: { bsonType: 'string'},
            password: { bsonType: 'string'},
            role: { bsonType: 'string'}
          }
        }
      }
    })

    await db.collection('employees').createIndex({ empId: 1, email: 1}, {unique: true})

    const bach = {
      empId: 1007,
      firstName: 'Johann',
      lastName: 'Bach',
      email: 'bach@nodebucket.com',
      password: bcrypt.hashSync('Password01', saltRounds),
      role: 'standard'
    }

    const beethoven = {
      empId: 1008,
      firstName: 'Ludwig',
      lastName: 'Beethoven',
      email: 'beethoven@nodebucket.com',
      password: bcrypt.hashSync('Password01', saltRounds),
      role: 'standard'
    }

    const mozart = {
      empId: 1009,
      firstName: 'Wolfgang',
      lastName: 'Mozart',
      email: 'mozart@nodebucket.com',
      password: bcrypt.hashSync('Password01', saltRounds),
      role: 'admin'
    }

    const brahms = {
      empId: 1010,
      firstName: 'Johannes',
      lastName: 'Brahms',
      email: 'brahms@nodebucket.com',
      password: bcrypt.hashSync('Password01', saltRounds),
      role: 'standard'
    }

    const wagner = {
      empId: 1011,
      firstName: 'Richard',
      lastName: 'Wagner',
      email: 'wagner@nodebucket.com',
      password: bcrypt.hashSync('Password01', saltRounds),
      role: 'standard'
    }

    const debussy = {
      empId: 1012,
      firstName: 'Claude',
      lastName: 'Debussy',
      email: 'debussy@nodebucket.com',
      password: bcrypt.hashSync('Password01', saltRounds),
      role: 'standard'
    }

    // insert the records into mongodb atlas
    await db.collection('employees').insertMany([bach, beethoven, mozart, brahms, wagner, debussy])

  } catch (err) {
    throw err
  } finally {
    await client.close()
  }
}

function getDateTime() {
  const now = new Date()
  const date = now.toLocaleDateString('en-US')
  const time = now.toLocaleTimeString('en-US')

  return `${date} ${time}`
}

async function run () {
  try {
    await dbInit()

    console.log('\n  End of program ', getDateTime())
  } catch (err) {
    console.error(err)
  }
}

run() // run the main function