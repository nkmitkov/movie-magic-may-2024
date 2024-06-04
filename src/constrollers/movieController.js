const router = require("express").Router();

const movieService = require("../services/movieService");

router.get("/create", (req, res) => {
    res.render("movie/create");
});

router.post("/create", async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie); 
        
        res.redirect("/");
    } catch (error) {
        console.log(error.message);
        res.redirect("movie/create");   
    }
});

router.get("/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();

    // todo: This is not perfect, use handlebars helpers
    movie.ratingArr = new Array(Number(movie.rating)).fill(true);
    
    res.render("movie/details", { movie });
});

router.get("/:movieId/attach", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId).lean();

    res.render("movie/attach", { ...movie });
});

module.exports = router;