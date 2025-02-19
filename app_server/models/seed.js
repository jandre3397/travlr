// Bring in the DB connection and the Trip schema
const mongoose = require('./db'); // Ensure correct DB connection
const Trip = require('./travlr'); // Reference the schema

// Read seed data from JSON file
const fs = require('fs');
const path = require('path'); // Helps with cross-platform file paths

// Adjust file path to ensure it finds `trips.json`
const tripsPath = path.join(__dirname, '../../data/trips.json');
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

// Function to seed database
const seedDB = async () => {
    try {
        await Trip.deleteMany({}); // Delete existing records
        await Trip.insertMany(trips); // Insert new seed data
        console.log('✅ Database successfully seeded with trip data!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
};

// Close the MongoDB connection after seeding
seedDB().then(async () => {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed.');
    process.exit(0);
});
