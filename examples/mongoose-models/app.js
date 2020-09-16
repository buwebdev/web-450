const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Role = require('./models/role');

const port = process.env.PORT || 3000;

const connString = 'mongodb://superadmin:s3cret@ds135003.mlab.com:35003/nodequiz';

// MongoDB connect
mongoose.connect(connString,
  {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.debug('Connection to the MongoDB instance was successful'))
  .catch((err) => console.debug('MongoDB Error: ' + err.message));

let app = express();

/**
 * Node.js using statements
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

/**
 * API
 * RESTFul (CRUD) - HttpGet, HttpPost, HttpPut, HttpDelete
 * URL:
 *   localhost:3000/roles HttpGet
 *   localhost:3000/roles/:id HttpGet
 *   localhost:3000/roles HttpPost
 */


/**
 * FindAllRoles: /api/roles
 * Returns a full array of role documents
 *
 */
app.get('/api/roles', async(req, res) => {
    try {
        /**
         * Query MongoDB for a list of roles 
         */
        Role.find({}, function(err, roles) {
            /**
             * If there is a MongoDB generated error, return a server 500 error
             */
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: 'Internal server error!'
                })
            } else {
                /**
                 * If there is no error, write the results to the console and return the results in JSON format
                 */
                console.log(roles);
                res.json(roles);
            }
        });
    } catch(e) {
        /**
         * Catch any potential server errors and return a server 500 error
         */
        console.log(e);
        res.status(500).send({
            message: 'Internal server error!'
        })
    }
})

/**
 * FindRoleById: /api/roles/:id
 * ID represents the auto-generated document ID
 */
 app.get('/api/roles/:roleId', async(req, res) => {

    try {
        const roleId = req.params.roleId; // get the passed-in param Id

        Role.findOne({'_id': roleId}, function(err, role) {
            if (err) {
                /**
                 * If error return a server 500 error 
                 */
                console.log(err);
                res.status(500).send({
                    message: 'Internal server error!'
                });
            } else {
                /**
                 * Otherwise, return the requested record 
                 */
                console.log(role);
                res.json(role);
            }
        })
    } catch (e) {
        /**
         * Catch any potential server errors and return a server 500 error 
         */
        console.log(e);
        res.status(500).send({
            message: 'Internal server error!'
        })
    }
})

/**
 * CreateRole: /api/roles
 * Creates a new
 */
app.post('/api/roles', async(req, res) => {
    try {
        /**
         * Create a new role object
         */
        const newRole = {
            name: req.body.name // get the name from the HTTP request body
        };

        Role.create(newRole, function(err, role) {
            if (err) {
                /**
                 * If error, return a server 500 error 
                 */
                console.log(err);
                res.status(500).send({
                    message: 'Internal server error!'
                });
            } else {
                /**
                 * Otherwise, return the newly added document
                 */
                console.log(role);
                res.json(role);
            }
        })
    } catch(e) {
        console.log(e);
        res.status(500).send({
            message: 'Internal server error!'
        });
    }
})

/**
 * Create server
 */
http.createServer(app).listen(port, function() {
  console.log('Application started and listening on port: ' + port);
})


