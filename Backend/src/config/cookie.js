const cookie = (user = {}, token, res) => {
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res.cookie("token", token, options).json(user);
};

module.exports = cookie;
