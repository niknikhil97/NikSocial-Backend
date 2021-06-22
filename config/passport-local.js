const passport = require("passport");
const passportLocal = require("passport-local");
const UserAuth = require("../models/user");
const bcrypt = require("bcrypt");

passport.use(
  new passportLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      console.log(email, password);
      try {
        const user = await UserAuth.findOne({ email: email });

        if (!user) {
          console.log("Wrong Email");
          return done(null, false);
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
          // If result is false --> password does not match
          console.log("Invalid Password");
          return done(null);
        }

        // if correct password
        console.log("Session Created Successfully");
        return done(null, user);
      } catch (error) {
        console.log("Error While Searching For User");
        return done(error);
      }
    }
  )
);

module.exports = passport;
