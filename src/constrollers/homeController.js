const router = require("express").Router();

const movieService = require("../services/movieService");

router.get("/", async (req, res) => {
    const movies = await movieService.getAll().lean();

    res.render("home/home", { movies });
});

router.get("/about", (req, res) => {
    res.render("home/about");
});

router.get("/search", async (req, res) => {
    const { title, genre, year } = req.query;

    const movies = await movieService.search(title, genre, year).lean();

    res.render("home/search", { movies, title, genre, year });
});

router.get("/404", (req, res) => {
    res.render("home/404");
});

module.exports = router;