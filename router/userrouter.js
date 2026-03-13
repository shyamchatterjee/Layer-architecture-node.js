let express = require("express");
let usercontroller = require("../controller/usercontroller");
const upload = require("../middleware/imagemiddleware");

let userrouter = express.Router();

userrouter.post(
  "/register",

  upload.single("image"),
  (req, res) => usercontroller.register(req, res),
);
userrouter.post("/login", (req, res) => usercontroller.login(req, res));

module.exports = userrouter;
