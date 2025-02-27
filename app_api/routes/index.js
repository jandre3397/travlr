const express = require('express');
const router = express.Router();

// Import Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Import JWT for token authentication
const jwt = require('jsonwebtoken'); // Enable JWT

// Middleware Function to Authenticate JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('Authorization header missing!');
    return res.status(401).json({ message: 'Authorization header required' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from Bearer format

  if (!token) {
    console.log('No token provided!');
    return res.status(401).json({ message: 'Access token missing' });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      console.log('Invalid or expired token!');
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.auth = verified; // Attach decoded token to request
    next(); // Continue to the next middleware/controller
  });
}

// Routes for Authentication
router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

// Routes for Trip Management
router.route('/trips')
  .get(tripsController.tripsList) // Public route to fetch all trips
  .post(authenticateJWT, tripsController.tripsAddTrip); // Protected: Add a trip

router.route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode) // Public route to get trip details
  .put(authenticateJWT, tripsController.tripsUpdateTrip); // Protected: Update trip

module.exports = router;
