const router = require("express").Router();

const homeController = require("./constrollers/homeController");

router.use(homeController);

module.exports = router;