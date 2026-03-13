let express = require("express");

const userrouter = require("./router/userrouter");
let app = express();
let cookieparser = require("cookie-parser");
app.use(cookieparser());
app.use(express.json());
app.use(express.static("/public/user"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", userrouter);

module.exports = app;
