const router = require("express").Router();

const homeController = require("./constrollers/homeController");
const movieController = require("./constrollers/movieController");
const castController = require("./constrollers/castController");

router.use(homeController);
router.use("/movie", movieController);
router.use("/cast", castController);

router.get("*", (req, res) => {
    res.render("home/404"); 
});

module.exports = router;