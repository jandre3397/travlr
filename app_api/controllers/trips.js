const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register the model

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec(); // Fetch all trip records

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: "No trips found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// GET: /trips/:tripCode - Get a single trip by its code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec(); // Fetch one trip

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Export both functions
module.exports = {
    tripsList,
    tripsFindByCode
};

