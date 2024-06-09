const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+$/, "Title must be only letters, digits and whitespaces"],
        minLength: [5, "Title must be at least 5 characters"],
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9\s]+$/, "Genre must be only letters, digits and whitespaces"],
        minLength: [5, "Genre must be at least 5 characters"],
    },
    director: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\s]+$/, "Director must be only letters, digits and whitespaces"],
        minLength: [5, "Director must be at least 5 characters"],
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2024,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        required: true,
        minLength: [20, "Description must be at least 20 characters"],
        maxLength: 1000,
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: "Cast",
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
})

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;