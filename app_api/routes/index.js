const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Define route for listing all trips
router.route('/trips')
    .get(tripsController.tripsList); // GET Method routes tripList

// Define route for retrieving a single trip by code
router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode); // GET Method routes tripsFindByCode

module.exports = router;
