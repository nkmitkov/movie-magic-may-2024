const router = require("express").Router();

const movieService = require("../services/movieService");
const castService = require("../services/castService");

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
    // const casts = await castService.getByCastIds(movie.casts).lean();
   
    // todo: This is not perfect, use handlebars helpers
    movie.ratingArr = new Array(Number(movie.rating)).fill(true);
    
    res.render("movie/details", { movie });
});

router.get("/:movieId/attach", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId).lean();
    const casts = await castService.getAll().lean();

    // todo: remove already added casts
    res.render("movie/attach", { ...movie, casts });
});

router.post("/:movieId/attach", async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    const result = await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/attach`);
});

router.get("/:movieId/edit", async (req, res) => {
    const movie = await movieService.getById(req.params.movieId).lean();

    res.render("movie/edit", { movie });
});

router.post("/:movieId/edit", (req, res) => {
    //
});

module.exports = router;