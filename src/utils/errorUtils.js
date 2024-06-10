const mongoose = require("mongoose");

exports.getErrorMessage = (err) => {
    let message = "";

    if (err instanceof mongoose.MongooseError) {
        // if err has property erros get the message the first way otherwise the second way
        message = !!err.errors ? Object.values(err.errors).at(0).message : err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    return message;
};

// middleware factory
exports.validate = (Model) => async (req, res, next) => {
    try {
        const modelInstance = new Model(req.body);

        const isValid = await modelInstance.validate();

        if (!isValid) {
            res.redirect("/404");
        }

        next();
    } catch (err) {
        // is too disruptive
        const message = this.getErrorMessage(err);

        res.render("home/404", { error: message });
    }
};