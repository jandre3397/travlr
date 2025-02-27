const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user"); // Import the User model

// Configure Passport to use the Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Using email instead of username
    },
    async (username, password, done) => {
      try {
        // Look up the user by their email
        const user = await User.findOne({ email: username }).exec();

        // User not found
        if (!user) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        }

        // Incorrect password
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }

        // Authentication successful
        return done(null, user);
      } catch (err) {
        // Error occurred during authentication
        return done(err);
      }
    }
  )
);
