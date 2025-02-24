const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register the model

// ✅ GET: /trips - lists all trips
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

// ✅ GET: /trips/:tripCode - Get a single trip by its code
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

// ✅ POST: /trips - Add a new trip
const tripsAddTrip = async (req, res) => {
  console.log("Adding trip:", req.body); // Debugging

  try {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    const savedTrip = await newTrip.save(); // Save new trip to the database
    return res.status(201).json(savedTrip);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ PUT: /trips/:tripCode - Update an existing trip
const tripsUpdateTrip = async (req, res) => {
  console.log("Updating trip:", req.params); // Debugging trip code
  console.log("Data to update:", req.body); // Debugging new data

  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode }, // Find the trip by trip code
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true } // Return the updated trip after modification
    ).exec();

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found for update" });
    } else {
      return res.status(200).json(updatedTrip); // Successfully updated
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Export all functions
module.exports = {
  tripsList,         // List all trips
  tripsFindByCode,   // Find a trip by its code
  tripsAddTrip,      // Add a new trip
  tripsUpdateTrip    // Update an existing trip
};
