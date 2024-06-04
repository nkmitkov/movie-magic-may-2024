const Movie = require("../models/Movie");
// const Cast = require("../models/Cast");

exports.getAll = () => Movie.find();

// Todo: Filter result in MongoDB
exports.search = (title, genre, year) => {
    let query = {};
    let query2 = Movie.find();

    if (title) {
        query.title = new RegExp(title, "i" );
        // query2 = query2.find({ title: new RegExp(title, "i" ) });
    }
    
    if (genre) {
        query.genre = genre.toLowerCase();
        // query2 = query2.find({ genre: genre.toLowerCase()});
    }
    
    if (year) {
        query.year = year;
        // query2 = query2.find({ year });
    }

    return Movie.find(query);
    // return query2;
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