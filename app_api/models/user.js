const mongoose = require('mongoose');
const crypto = require('crypto'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
require('dotenv').config(); // Load environment variables like JWT_SECRET

//Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String, // Encrypted password
  salt: String  // Random string for added security
});

//Method to set the password and generate a cryptographic salt
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex'); // Generate a 16-byte salt
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex'); // Generate hash
};

//Method to verify if the provided password matches the stored hash
userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash; // Returns true if the hashes match
};

//Method to generate a JSON Web Token (JWT) for user authentication
userSchema.methods.generateJWT = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // Token expires in 7 days

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000) // Expiration time in seconds
  }, process.env.JWT_SECRET); // Use the secret from the .env file
};

//Register and export the model for use in other files
const User = mongoose.model('users', userSchema);
module.exports = User;

