const { json } = require('express');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const logger = require('morgan');
const FavoriteTeams = require('./models/favorite-teams');

// database connection string 
const dbConn = 'mongodb+srv://web450_user:Wo1fJi4s0lybU5jY@cluster0.lujih.mongodb.net/Web450?retryWrites=true&w=majority';

mongoose.connect(dbConn, { useNewUrlParser: true, useUnifiedTopology: true}); // connect to db

let db = mongoose.connection; // get the MongoDB connection object 

db.on('error', console.error.bind(console, 'MongoDB connection error.')); // handle MongoDB connection errors 

/**
 * Once connected, write a message to the console window 
 */
db.once('open', function() {
    console.log('Connection to MongoDB Atlas successful!')
});

let app = express();
app.use(logger('dev'));


http.createServer(app).listen(3000, function() {
    console.log('Application started and listening on port 3000!');
})