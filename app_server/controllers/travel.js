// Explicitly import fetch for CommonJS compatibility in Node.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const tripsEndpoint = "http://localhost:3000/api/trips";
const options = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
};

/* GET travel view */
const travel = async function (req, res, next) {
    console.log("🚀 TRAVEL CONTROLLER BEGIN");

    try {
        const response = await fetch(tripsEndpoint, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();

        console.log("✅ Trips Data Retrieved:", json); // Debugging output

        // Additional error handling
        let message = null;
        if (!(json instanceof Array)) {
            message = "⚠️ API lookup error: Data format incorrect.";
            json = []; // Set to empty array
        } else if (json.length === 0) {
            message = "⚠️ No trips exist in our database!";
        }

        res.render("travel", { title: "Travlr Getaways", trips: json, message });

    } catch (err) {
        console.error("❌ Error fetching trips data:", err.message);
        res.status(500).send(err.message);
    }
};

module.exports = { travel };


