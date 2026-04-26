const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // We use process.env to access variables inside our .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process if it fails
    }
};

module.exports = connectDB;