const express = require("express");

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

app.listen(port, () => console.log(`Server is listening on port ${port}...`));