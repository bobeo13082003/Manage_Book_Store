const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String },
    password: { type: String },
    avatar: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
    },
    fullName: String,
    phone: String,
    address: String,
    role: { type: Number, enum: [0, 1], default: 0 },
    re_token: String,
    status: { type: String, enum: ["active", "inactive"], default: "inactive" }
}, {
    timestamps: true
})

const Users = mongoose.model('Users', userSchema, 'users');

module.exports = Users;