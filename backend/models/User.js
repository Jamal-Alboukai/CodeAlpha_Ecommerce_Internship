const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // No two users can have the same email
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false // Regular users are not admins by default
    }
}, {
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

const User = mongoose.model('User', userSchema);
module.exports = User;