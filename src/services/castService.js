const Cast = require("../models/Cast");

exports.getAll = () => Cast.find();

exports.getById = (castId) => Cast.findById(castId);

// exports.getByCastIds = (movieCasts) => Cast.find({ _id: { $in: movieCasts }});

exports.create = (castData) => Cast.create(castData);