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

app.get('/api/favorite-teams', async(req, res) => {
    try {

        FavoriteTeams.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': 'Internal server error'
                })
            } else {
                console.log(teams);
                res.json(teams);
            }
        })
    } catch (e) {
        res.status(500).send({
            'message': 'Internal server error'
        })
    }
})

app.get('/api/favorite-teams/:teamId', async(req, res) => {
    try {
        const teamId = parseInt(req.params.teamId); 
       
        FavoriteTeams.findOne({teamId: teamId}, function(err, team) {
            console.log(team);
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': 'Database error'
                })
            } else {
                console.log(team);
                res.json(team);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': 'Internal server error'
        })
    }
})

app.post('/api/favorite-teams', async(req, res) => {
    try {
        const newTeam = {
            teamId: 103,
            mascot: 'Packers'
        };

        FavoriteTeams.insertOne(newTeam, function(err, team) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': 'Internal server error'
                })
            } else {
                console.log(team);
                res.json(team);
            }
        })
    } catch (e) {
        res.status(500).send({
            'message': 'Internal server error'
        })
    }
})

http.createServer(app).listen(3000, function() {
    console.log('Application started and listening on port 3000!');
})

