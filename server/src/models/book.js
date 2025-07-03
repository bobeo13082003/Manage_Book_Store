const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, slug: 'title', unique: true, slug_padding_size: 4 },
    description: String,
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    coverUrl: String,
    authors: [{ type: String, required: true }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    status: { type: String, enum: ['active' | 'inactive'], default: 'active' },
    tags: [String],
    avgRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema);
