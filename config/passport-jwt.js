const passport = require("passport");
const passportJWT = require("passport-jwt");
const UserAuth = require("../models/user");
const { jwtSecret } = require("../environment");

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (jwt_payload, done) {
      
      try {
        
        const user = await UserAuth.findOne({ email: jwt_payload.email });
        if (user) {
          console.log("::User found for login")    
          return done(null, user);
        }

        console.log("::User not found while loggin in")
        return done(null, false);
      } catch (error) {
        console.log("::**Error while jwt auth", error);
        return done(error);
      }
    }
  )
);




module.exports = passport;
