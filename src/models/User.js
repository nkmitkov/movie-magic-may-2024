const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: [10, "Email must be at least 10 characters"],
        match: [/@\w+\.\w+$/, "Invalid Email Address"], // $ sign means this is the end of a string
        unique: true,
    },
    password: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, "Password must be only letters and digits"],
        minLength: [6, "Password must be at least 6 characters"],
    }
})

userSchema.pre("save", async function() {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
});

userSchema.virtual("rePassword")
    .set(function(value) {
        // Validate - ако паролите се различават хвърли грешка, иначе продължи напред
        if (value !== this.password) {
            throw new mongoose.MongooseError("Password missmatch!");
        }
    });

const User = mongoose.model("User", userSchema);

module.exports = User;