const router = require("express").Router();

const homeController = require("./constrollers/homeController");
const movieController = require("./constrollers/movieController");

router.use(movieController);
router.use(homeController);

module.exports = router;