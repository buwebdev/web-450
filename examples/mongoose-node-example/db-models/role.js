const mongoose = require('mongoose');

let roleSchema = mongoose.Schema({
  name: {type: String, unique: true, dropDups: true}
});

module.exports = mongoose.model('Role', roleSchema);
