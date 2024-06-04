const Cast = require("../models/Cast");

exports.getAll = () => Cast.find();

exports.getById = (castId) => Cast.findById(castId);

exports.create = (castData) => Cast.create(castData);