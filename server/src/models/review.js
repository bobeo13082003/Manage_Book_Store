// models/review.model.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String
}, { timestamps: true });

reviewSchema.index({ user: 1, book: 1 }, { unique: true }); // 1 user 1 review

module.exports = mongoose.model('Review', reviewSchema);
