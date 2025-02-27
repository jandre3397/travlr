const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user'); // Import the User model

// Register new user
const register = async (req, res) => {
  // 🔍 Validate input to ensure all fields are provided
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    // Create a new user instance
    const user = new User({
      name: req.body.name, // Set user name
      email: req.body.email, // Set email address
      password: '' // Initialize with an empty password
    });

    // Set hashed password and salt
    user.setPassword(req.body.password);

    // Save user to the database
    const savedUser = await user.save();

    // If save is successful, generate JWT token
    if (!savedUser) {
      return res.status(400).json({ message: "Error saving user" });
    } else {
      const token = user.generateJWT();
      return res.status(200).json({ token }); // Return the generated token
    }
  } catch (err) {
    return res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// Login user
const login = (req, res) => {
  // Validate email and password presence
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  // Authenticate using passport
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};

// Export both functions to drive endpoints
module.exports = {
  register,
  login
};

