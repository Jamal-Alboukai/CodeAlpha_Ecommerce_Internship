const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // 1. Link this order to a specific User in our database
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    // 2. An array of the items they bought
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            // Link each item to a specific Product in our database
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                required: true, 
                ref: 'Product' 
            }
        }
    ],
    // 3. The final calculated price
    totalPrice: { 
        type: Number, 
        required: true, 
        default: 0.0 
    }
}, {
    timestamps: true // Automatically tracks when the order was placed
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;