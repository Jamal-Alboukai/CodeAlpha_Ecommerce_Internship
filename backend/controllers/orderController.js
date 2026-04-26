const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Only logged-in users can buy things!)
const addOrderItems = async (req, res) => {
    try {
        // Grab the cart items and total price sent from the frontend
        const { orderItems, totalPrice } = req.body;

        // Make sure the cart isn't empty
        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "No order items found" });
        } else {
            // Create a new order in the database
            const order = new Order({
                orderItems,
                user: req.user._id, // We get this from our 'protect' middleware!
                totalPrice
            });

            // Save it to MongoDB
            const createdOrder = await order.save();

            // Send back a success message with the order details
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { addOrderItems };