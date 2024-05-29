const router = require("express").Router();

const homeController = require("./constrollers/homeController");
const movieController = require("./constrollers/movieController");

router.use(homeController);
router.use(movieController);

module.exports = router;