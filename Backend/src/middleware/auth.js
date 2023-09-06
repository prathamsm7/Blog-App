const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({ message: "Please Login" });
  }

  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedUser.user.id);
  next();
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({ message: "Unauthorised Access" });
  }
  next();
};
