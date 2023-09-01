const mongoose = require('mongoose');
const mongoDB = function(){
    mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error connecting"));
}

module.exports = mongoDB;