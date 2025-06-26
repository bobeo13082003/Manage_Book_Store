// models/author.model.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    photo: String
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);
