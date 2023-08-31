const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const cors = require("cors");
require('dotenv').config();


const mongoDB = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error connecting"));


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  email: String,
  phone: Number,
});
const User = mongoose.model("User", UserSchema);


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/user", async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 }).limit(5).exec();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



app.get("/user/:id", async (req, res) => {
  try {
    const users = await User.find(req.params.id).sort({ _id: -1 }).limit(5).exec();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



app.post("/user", async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
    });
    console.log(user);
    await user.save(res.json(user));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



app.put('/user/:id',async  (req, res)=>{
  try{
await User.findByIdAndUpdate(req.params.id, req.body).exec();
res.json({ message: "Updated Successfully " });
console.log(req.body);
  }catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})



app.delete('/user/:id',async (req,res)=>{
   try{
    await User.findByIdAndDelete(req.params.id,req.body).exec();
    console.log(req.body);

    res.json({ message: "Deleted Successfully " });

   }catch (err) {
    console.log(err);
    res.status(500).send(err);
   }
})


app.use((req, res, next) => {
  next(createError.NotFound());
});
app.use((error, req, res, next) => {
  res.json({
    error: {
      status: error.status,
      message: error.message,
    },
  });
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
