const mongoose = require("mongoose");

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [5, "Name must be at least 5 characters"],
    },
    age: {
        type: Number,
        required: true,
        max: 120,
        min: 1,
    },
    born: {
        type: String,
        required: true,
        minLength: [10, "Born must be at least 10 characters"],
    },
    nameInMovie: {
        type: String,
        required: true,
        minLength: [5, "Name In Movie must be at least 5 characters"],
    },
    castImage: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return /^https?:\/\//.test(value)
            },
            message: (props) => `${props.value} is invalid url for the castImage!`,
        }
    },
    // movies: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "Movie",
    // }]
});

const Cast = mongoose.model("Cast", castSchema);

module.exports = Cast;