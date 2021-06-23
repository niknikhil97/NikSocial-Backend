const UserAuth = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../environment");

module.exports.createUser = async (req, res) => {
  return res.status(200).json({
    message: "User Created",
  });
};

module.exports.createToken = (req, res) => {
  console.log("req.body", req.body);
  const user = req.body;
  const token = jwt.sign(user, jwtSecret);

  return res.status(200).json({
    message: "Session Created",
    token,
  });
};

module.exports.authFail = (req, res) => {
  return res.status(401).json({
    message: "Auth Failed",
  });
};


module.exports.updateProfile = (req, res) => {

  console.log(req.file)
  console.log(req.body)


  return res.status(200).json({
    message: 'profile Updated'
  })
}