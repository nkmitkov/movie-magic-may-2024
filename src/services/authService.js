const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

const SECRET = "f3o4jhf2ui34hgwie4rhgiup3hg92p4h5g4";

// todo: check if user exists
exports.register = (userData) => User.create(userData);

exports.login = async (email, password) => {
    // Get user from db
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Check if password is valid
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    // Generate jwt token
    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

    // return token
    return token;
};