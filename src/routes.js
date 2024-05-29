const router = require("express").Router();

const homeController = require("./constrollers/homeController");
const movieController = require("./constrollers/movieController");

router.use(homeController);
router.use(movieController);

router.get("*", (req, res) => {
    res.render("404"); 
});

module.exports = router;