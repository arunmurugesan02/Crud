const mongoose = require('mongoose');
const mongoDB = function(){
    mongoose
  .connect('mongodb://localhost:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error connecting"));
}

module.exports = mongoDB;