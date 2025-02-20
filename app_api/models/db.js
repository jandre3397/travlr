const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';  // Use environment variable or default to localhost
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// Connect to MongoDB with a timeout
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {}), 1000);
};

//Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows-specific listener to handle termination
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

// Graceful Shutdown Function
const gracefulShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
    });
};

// Handle various termination signals
// Nodemon restart
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// App termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination');
    process.exit(0);
});

// Container shutdown (Docker, cloud environments)
process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown');
    process.exit(0);
});

// Connect to the database initially
connect();

// Import Mongoose schema
require('./travlr');

module.exports = mongoose;
