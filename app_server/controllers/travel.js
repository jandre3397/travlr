const fs = require('fs');

// ✅ Read trips.json synchronously
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { 
        title: 'Travlr Getaways',
        trips  // ✅ Pass trip data to the template
    });
};

module.exports = {
    travel
};
