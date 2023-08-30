const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  email: String,
  phone: Number,
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
