const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");
const configHandlebars = require("./config/configHandlebars");
const configExpress = require("./config/configExpress");

const app = express();
const port = 5000;

configHandlebars(app);
// require("./config/configHandlebars")(app);
configExpress(app);
// require("./config/configExpress")(app);

app.use(routes);

mongoose.connect(`mongodb://localhost:27017/magic-movies`)
    .then(() => {
        console.log("DB connected");
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch((err) => console.log(`DB connection error -> ${err}`));