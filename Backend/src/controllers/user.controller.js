const User = require("../models/User");

const jwt = require("jsonwebtoken");
const cookie = require("../config/cookie");
// const { cloudinary } = require('../multer');

const newToken = (user) => {
  return jwt.sign({ user }, `${process.env.JWT_SECRET}`, {
    expiresIn: "7d",
  });
};

//Register User
exports.signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.findOne({ email });
    // const result = await cloudinary.uploader.upload(req.file.path);

    if (user) {
      return res.status(401).send({ message: "Email already registered" });
    }

    let newUser;

    if (role == "admin") {
      newUser = await User.create({
        name,
        email,
        password,
        role: role,
      });
    } else {
      newUser = await User.create({
        name,
        email,
        password,
      });
    }

    const token = newToken({
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      id: newUser._id,
    });

    cookie(newUser, token, res);
  } catch (error) {
    return res.send(error.message);
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "User not register" });
    }

    const matchPassword = await user.checkPassword(password);

    if (!matchPassword) {
      return res.status(401).send({ message: "Invalid Credintial" });
    }

    const token = newToken({
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    });

    cookie(user, token, res);
  } catch (error) {
    return res.send(error.message);
  }
};

// Logout User
exports.logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged Out Successfully",
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send(users);
  } catch (error) {
    return res.send(error.message);
  }
};
