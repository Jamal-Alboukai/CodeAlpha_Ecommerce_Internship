// Import the express library
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize the express application
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
// Middleware: Allows our app to accept JSON data in request bodies
app.use(express.json());
app.use(cors()); // Enable CORS for all routes (you can configure this for specific origins in production)
// A simple test route to verify the server is working
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: "Hello from the E-commerce API!" });
});

// Use the user routes for any requests to /api/users
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// Define the port our server will listen on
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});