// models/order.model.js
const mongoose = require('mongoose');
const orderItemSchema = require('./orderItem.model');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true, min: 0 },
    shippingInfo: {
        recipient: String,
        phone: String,
        address: String
    },
    paymentId: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
