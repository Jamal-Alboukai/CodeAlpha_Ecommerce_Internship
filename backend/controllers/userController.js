const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, email, password } = req.body;

        // 1. Check if the user already exists in the database
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 4. Send back a success response (Notice we do NOT send back the password)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: "User registered successfully!"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by their email
        const user = await User.findOne({ email });

        // 2. Check if the user exists AND if the passwords match
        // bcrypt.compare() safely compares the plain text password with the hashed one in the DB
        if (user && (await bcrypt.compare(password, user.password))) {
            
            // 3. If everything matches, send back the user data PLUS the new JWT
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id) // <-- Give them the wristband!
            });
        } else {
            // 4. If email or password is wrong, deny access
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    // Because our 'protect' middleware ran first, we already have req.user!
    const user = req.user;

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

// Update your exports to include the new function
module.exports = { registerUser, loginUser, getUserProfile };;