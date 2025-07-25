// models/order.model.js
const mongoose = require('mongoose');
const orderItemSchema = require('./orderItem');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    items: [orderItemSchema],
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true, min: 0 },
    shippingInfo: {
        recipient: String,
        phone: String,
        address: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
