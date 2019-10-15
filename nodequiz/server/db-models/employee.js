const mongoose = require('mongoose');

let employeeSchema = mongoose.Schema({
  employeeId: String,
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('Employee', employeeSchema);
