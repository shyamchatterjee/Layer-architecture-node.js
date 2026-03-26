let express = require("express");
const uploadimage = require("../middleware/uploadsphoto");
let photoscontroller = require("../controller/photoscontroller");
let uservalidation = require("../middleware/uservalidate");
let photorouter = express.Router();

photorouter.post(
  "/uploadphoto",
  uservalidation.validateUser,
  uploadimage.single("image"),
  (req, res) => photoscontroller.uploadphoto(req, res),
);

photorouter.get("/getallphotos", uservalidation.validateUser, (req, res) =>
  photoscontroller.getallphotos(req, res),
);

module.exports = photorouter;
