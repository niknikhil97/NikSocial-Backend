const UserAuth = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res) => {
  const reqData = req.body;

  //   name , email , password , confirm-password
  if (reqData["password"] !== reqData["confirm-password"]) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  bcrypt.hash(reqData["password"], 12, (error, hash) => {
    if (error) {
      console.log("**ERROR WHILE CREATING PASSWORD HASH");
      return res.status(404).json({
        message: "Internal Server Error, hashing failed",
      });
    }

    reqData["password"] = hash;

    // check if user exists
    // UserAuth.findOne({email:email})

    // Create User
    UserAuth.create(reqData, (error, user) => {
      if (error) {
        console.log("**ERROR WHILE CREATING USER", error);
        return res.status(404).json({
          message: "Internal Server Error",
        });
      }

      console.log("User created successfully");
      return res.status(200).json({
        message: "User Created Successfully, User details",
        user,
      });
    });
  });
};

// create login session
module.exports.createSession = (req, res) => {
  const reqData = req.body;

  // find user
  UserAuth.findOne({ email: reqData.email }, (error, user) => {
    if (error) {
      console.log("**ERROR WHILE FINDING USER FOR SIGNIN:::", error);
      return res.status(404).json({
        message: "Internal Server Error",
      });
    }
    if (!user) {
      console.log("Wrong Username");
      return res.status(400).json({
        message: "Wrong Username",
      });
    }

    bcrypt.compare(reqData["password"], user.password, function (err, result) {
      if (error) {
        console.log("Error while comparing passwords", error);
        return res.status(404).json({
          message: "Internal Server Error",
          error,
        });
      }

      if (result) {
        console.log("Session Created Successfully");
        return res.status(200).json({
          secretKey: user.email,
        });
      }

      console.log("Credentials Do Not Match");
      return res.status(400).json({
        message: "Credentials do not Match",
      });
    });
  });

  // if user exists

  // match passwords using bcrypt
};
