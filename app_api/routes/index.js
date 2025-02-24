const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// Define route for listing all trips
router.route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

// Define route for retrieving and updating a single trip by code
router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET Method routes tripsFindByCode
    .put(tripsController.tripsUpdateTrip); // PUT Method routes tripsUpdateTrip

module.exports = router;
