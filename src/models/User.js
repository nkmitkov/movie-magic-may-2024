const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: [5, "Email must be at least 5 characters"],
        match: /\w+@\w+.\w+/,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be at least 8 characters"],
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