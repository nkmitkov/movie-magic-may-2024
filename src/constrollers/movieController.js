const router = require("express").Router();

const movieService = require("../services/movieService");

router.get("/create", (req, res) => {
    res.render("create");
});

router.post("/create", (req, res) => {
    const newMovie = req.body;

    movieService.create(newMovie); 
    
    res.send("Movie should be created!");
});

router.get("/movies/:movieId", (req, res) => {
    // const id = req.params.movieId;

    res.render("details");
});

module.exports = router;