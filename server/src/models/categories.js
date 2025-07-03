// models/category.model.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    slug: { type: String, slug: 'name', unique: true, slug_padding_size: 4 }
}, { timestamps: true });

module.exports.Category = mongoose.model('Category', categorySchema);
