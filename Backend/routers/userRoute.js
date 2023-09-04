const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  checkEmail,
  updateUser,
  deleteUser,
} = require("../controller/userController");

router.get("/", getAllUsers);
router.get("/checkEmail", checkEmail);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
