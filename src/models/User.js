const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: [3, "Email must be at least 3 characters"],
        match: /\w+@\w+.\w+/,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;