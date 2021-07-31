const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  gender: String,
  img: String,
  ROLE: String
});

let User = mongoose.model('user', userSchema);

module.exports = User;