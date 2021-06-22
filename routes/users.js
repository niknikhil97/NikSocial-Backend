const express = require("express");
const userController = require("../controllers/UserController");
const passportLocal = require("../config/passport-local");
const passportJWT = require("../config/passport-jwt");

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
      message: "You Are loggen hence can see posts",
      posts: ["post 1", "post 2", "post 3", "post 4", "post 5"],
    });
  }
);

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

module.exports = router;
