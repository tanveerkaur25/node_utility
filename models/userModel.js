const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email id required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: "Password is required",
    }
});


module.exports = mongoose.model("User", userSchema);