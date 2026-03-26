let express = require("express");

const userrouter = require("./router/userrouter");
let app = express();
let cookieparser = require("cookie-parser");
const photorouter = require("./router/photorouter");
app.use(cookieparser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", userrouter);
app.use("/api/passportphoto", photorouter);

module.exports = app;
