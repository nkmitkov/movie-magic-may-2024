const router = require("express").Router();

const User = require("../models/User");
const authService = require("../services/authService");
const { getErrorMessage, validate } = require("../utils/errorUtils");

router.get("/register", (req, res) => {
    res.render("auth/register");
});

// validate(User) gives me troubles and on every error redirects to 404
router.post("/register", validate(User), async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);
        
        res.redirect("/auth/login");
    } catch (err) {
        const message = getErrorMessage(err);

        res.render("auth/register", { ...userData, error: message});
    }

});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
    
        res.cookie("auth", token);
        res.redirect("/");
    } catch (err) {
        const message = getErrorMessage(err);

        res.render("auth/login", { email, error: message});
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("auth");

    res.redirect("/");
});

module.exports = router;