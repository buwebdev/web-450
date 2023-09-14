'use strict'

const {
  DB_USERNAME = 'nodebucket339a_user',
  DB_PASSWORD = 's3cret',
  DB_NAME = 'nodebucket339a'
} = process.env

const CONFIG = {
  DB_URL: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.lujih.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  DB_NAME: DB_NAME
}

module.exports = CONFIG