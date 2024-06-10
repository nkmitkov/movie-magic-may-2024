const router = require("express").Router();

const movieService = require("../services/movieService");
const castService = require("../services/castService");
const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", isAuth, (req, res) => {
    res.render("movie/create");
});

router.post("/create", isAuth, async (req, res) => {
    const newMovie = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await movieService.create(newMovie); 
        
        res.redirect("/");
    } catch (err) {
        const message = getErrorMessage(err);

        res.status(400).render("movie/create", { ...newMovie, error: message });   
    }
});

router.get("/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId).lean();
    const isOwner = movie.owner && movie.owner == req.user?._id; // movie.owner.toString() === req.user._id / movie.owner === mongoose.Types.ObjectId(req.user._id)

    // todo: This is not perfect, use handlebars helpers
    movie.ratingArr = new Array(Number(movie.rating)).fill(true);
    
    res.render("movie/details", { movie, isOwner });
});

router.get("/:movieId/attach", isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getById(movieId).lean();
    const casts = await castService.getAll().lean();

    // todo: remove already added casts
    res.render("movie/attach", { ...movie, casts });
});

router.post("/:movieId/attach", isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    const result = await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/attach`);
});

router.get("/:movieId/edit", isAuth,async (req, res) => {
    const movie = await movieService.getById(req.params.movieId).lean();

    res.render("movie/edit", { movie });
});

router.post("/:movieId/edit", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const editedBody = req.body;

    await movieService.edit(movieId, editedBody);

    res.redirect(`/movies/${movieId}`);
});

router.get("/:movieId/delete", isAuth, async (req, res) => {
    await movieService.delete(req.params.movieId);

    res.redirect("/");
});

module.exports = router;