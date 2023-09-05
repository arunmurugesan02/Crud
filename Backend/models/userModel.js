const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: String,
    email: String,
    phone: Number,
    timestamp: { type: Date, default: Date.now } 
  });
  const User = mongoose.model("User", UserSchema);
  module.exports = User;