let express = require("express");
let usercontroller = require("../controller/usercontroller");
const upload = require("../middleware/imagemiddleware");
let uservaildator = require("../middleware/uservalidate");
let userrouter = express.Router();

userrouter.post(
  "/register",

  upload.single("image"),
  (req, res) => usercontroller.register(req, res),
);
userrouter.post("/login", (req, res) => usercontroller.login(req, res));
userrouter.get("/get-me", uservaildator.validateUser, (req, res) =>
  usercontroller.getuser(req, res),
);
userrouter.get("/refreshtoken", (req, res) =>
  usercontroller.refreshToken(req, res),
);
module.exports = userrouter;
