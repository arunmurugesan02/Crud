  const User = require("../models/userModel");
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().sort({ timestamp: -1 }).limit(15).exec();
      console.log(users);
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  const getUserById = async (req, res) => {
    try {
      const users = await User.findById(req.params.id).exec();
      console.log(users);
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

  const createUser = async (req, res) => {
    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        email: req.body.email,
        phone: req.body.phone,
      });
      console.log(user);
      user.timestamp = new Date();
      await user.save(res.json(user));
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

  const checkEmail =async (req, res) => {
    try {
      const { email } = req.query;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  const updateUser = async (req, res) => {
    const userId = req.params.id; // Assuming you have the user's _id in the request parameters
    const updatedUserData = req.body; // Updated user data
  
    try {
      // Update the timestamp field to the current date and time
      updatedUserData.timestamp = new Date();
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the updated user
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id, req.body).exec();
      console.log(req.body);

      res.json({ message: "Deleted Successfully " });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    checkEmail,
    updateUser,
    deleteUser,
  };
