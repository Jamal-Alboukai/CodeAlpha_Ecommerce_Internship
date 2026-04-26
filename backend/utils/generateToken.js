const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // We sign the token with the user's ID and our secret key. 
    // It will expire in 30 days so the user doesn't stay logged in forever.
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;