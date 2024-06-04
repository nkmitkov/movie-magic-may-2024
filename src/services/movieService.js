const Movie = require("../models/Movie");
// const Cast = require("../models/Cast");

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

exports.getById = (id) => Movie.findById(id).populate("casts");

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
    // todo: Validate castsId if exists
    // todo: Validate if cast is already added

    // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId }});

    // This is optional and we don't need it in this case
    // const cast = await Cast.findById(castId);
    // cast.movies.push(movie);
    // await cast.save();

    const movie = await this.getById(movieId);
    
    movie.casts.push(castId);
    await movie.save();
    
    return movie;
};