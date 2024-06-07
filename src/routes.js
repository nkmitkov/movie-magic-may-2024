const router = require("express").Router();

const homeController = require("./constrollers/homeController");
const movieController = require("./constrollers/movieController");
const castController = require("./constrollers/castController");
const authController = require("./constrollers/authController");

router.use(homeController);
router.use("/movies", movieController);
router.use("/cast", castController);
router.use("/auth", authController);

router.get("*", (req, res) => {
    res.render("home/404"); 
});

module.exports = router;