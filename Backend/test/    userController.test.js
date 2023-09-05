const mongoose = require("mongoose");
const User = require("../models/userModel");
const {
  getAllUsers,
  getUserById,
  createUser,
  checkEmail,
  updateUser,
  deleteUser,
} = require("../controller/userController");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Controller Tests", () => {
  const testUserData = {
    firstName: "Arun",
    lastName: "Murugesan",
    dob: "2023-11-01",
    email: "arun@gmail.com",
    phone: 1234567890,
    timestamp: new Date(),
  };

  it("should get all users", async () => {
    const createdUser1 = await User.create(testUserData);
    const createdUser2 = await User.create(testUserData);

    const req = {};
    const res = {
      json: jest.fn(),
    };

    await getAllUsers(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(testUserData)])
    );
  });

  it("should get a user by ID", async () => {
    const createdUser = await User.create(testUserData);

    const req = { params: { id: createdUser._id } };
    const res = {
      json: jest.fn(),
    };

    await getUserById(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining(testUserData) 
    );
  });
  it('should create a new user', async()=>{
    const createdUser = await User.create(testUserData);
    
  })
});
