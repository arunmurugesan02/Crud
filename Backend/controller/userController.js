const User = require("../models/userModel");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 }).limit(5).exec();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
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
  try {
    await User.findByIdAndUpdate(req.params.id, req.body).exec();
    res.json({ message: "Updated Successfully " });
    console.log(req.body);
  } catch (err) {
    console.log(err);
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
