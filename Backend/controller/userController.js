const User= require('../models/userModel')
exports.all = async () => {
  try {
    const users = await User.find().exec();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    // res.status(500).send(err);
  }
};

exports.all_id = async () => {
  try {
    const users = await User.findById(req.params.id).exec();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.create = async (req, res) => {
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

exports.update = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body).exec();
    res.json({ message: "Updated Successfully " });
    console.log(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id,req.body).exec();
        console.log(req.body);
    
        res.json({ message: "Deleted Successfully " });
    
       }catch (err) {
        console.log(err);
        res.status(500).send(err);
       }
}
