// models/orderItem.model.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    qty: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 }
});

module.exports = orderItemSchema; // sub-document, không cần model riêng
