const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    resetPassword: {
        type: String,
    },
    role: {
        type: Number,
        default: "user"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema,"users");