const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware'); // <-- Bring in the bouncer!

// Notice we put 'protect' here. If there is no token, the order is blocked.
router.post('/', protect, addOrderItems);

module.exports = router;