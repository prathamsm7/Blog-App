const express = require("express");
const router = express.Router();

const {
  signupUser,
  getAllUsers,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");

//register
router.route("/register").post(signupUser);
router.route("/login").post(loginUser);
router.route("/allusers").get(getAllUsers);
router.route("/logout").get(logoutUser);

module.exports = router;
