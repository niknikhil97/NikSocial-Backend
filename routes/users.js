const express = require("express");
const userController = require("../controllers/UserController");
const passportLocal = require("../config/passport-local");
const passportJWT = require("../config/passport-jwt");
const multer = require('multer')
const upload = multer({dest: '/uploads'})

const router = express.Router();

// after Auth requests
router.get(
  "/profile",
  passportJWT.authenticate("jwt", {
    failureRedirect: "/user/auth-fail",
    session: false,
  }),
  function (req, res) {
    return res.status(200).json({
      email: req.body.email
    });
  }
);

// Auth routes
router.post("/create-user", userController.createUser);
router.post(
  "/create-session",
  passportLocal.authenticate("local", {
    failureRedirect: "/user/auth-fail",
    session: false,
  }),
  userController.createToken
);
router.get("/create-token", userController.createToken);
router.get("/auth-fail", userController.authFail);

// update profile
router.post('/update-profile', upload.single('avatar'),passportJWT.authenticate("jwt", {
  failureRedirect: "/user/auth-fail",
  session: false,
}), userController.updateProfile)

module.exports = router;
