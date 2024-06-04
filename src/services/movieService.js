const Movie = require("../models/Movie");

exports.getAll = () => Movie.find();

// Todo: Filter result in MongoDB
exports.search = async (title, genre, year) => {
    let result = await Movie.find().lean();

    if (title) {
        result = result.filter((movie) => movie.title.toLowerCase().includes(title.toLowerCase()));
    }
    
    if (genre) {
        result = result.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase());
    }
    
    if (year) {
        result = result.filter((movie) => movie.year === year);
    }

    return result;
};

exports.getById = (id) => Movie.findById(id);

exports.create = (movieData) => Movie.create(movieData);

exports.attach = (movieId, castId) => {
    // todo: Validate castsId if exists
    // todo: Validate if cast is already added

    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId }});
    
    // const movie = await this.getById(movieId);
    
    // movie.casts.push(castId);

    // return movie.save();
};