const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Role = require('./db-models/role');

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
 *   localhost:3000/employees HttpGet
 *   localhost:3000/employees/:id HttpGet
 *   localhost:3000/employees HttpPost
 *   localhost:3000/employees/:id HttpPut
 *   localhost:3000/employees/:id HttpDelete
 */


/**
 * FindAllRoles: /api/roles
 * Returns a full array of role documents
 *
 */
app.get('/api/roles', function(req, res, next) {
  Role.find({}, function(err, roles){
    /**
     * If there is an error, catch the error and write the error to the console.
     */
    if (err) {
      console.log(err);
      return next(err);
    } else {
      /**
       * If there is no error, write the results to the console and return the results as JSON data.
       */
      console.log(roles);
      res.json(roles);
    }
  })
})

/**
 * FindRoleById: /api/roles/:id
 * ID represents the auto-generated document ID
 */
 app.get('/api/roles/:roleId', function(req, res, next) {
  const roleId = req.params.roleId;

  /**
   * Find a role by the auto-generated document Id
   */
  Role.findOne({'_id': roleId}, function(err, role) {
    /**
     * If error,
     */
    if (err) {
      console.log(err);
      return next(err);
    } else {
      /**
       * Otherwise, return the role as JSON data
       */
      console.log(role);
      res.json(role);
    }
  })
})

/**
 * CreateRole: /api/roles
 * Creates a new
 */
app.post('/api/roles', function(req, res, next) {
  /**
   * Create a new object literal for the role document
   */
  let newRole = {
    name: req.body.name
  }

  /**
   * Invoke the create operation on MongoDB
   */
  Role.create(newRole, function(err, role) {
    /**
     * If there is an error
     */
    if (err) {
      console.log(err);
      return next(err);
    } else {
      /**
       * Otherwise, return the results as JSON
       */
      console.log(role);
      res.json(role);
    }
  })
})

/**
 * Create server
 */
http.createServer(app).listen(port, function() {
  console.log('Application started and listening on port: ' + port);
})


