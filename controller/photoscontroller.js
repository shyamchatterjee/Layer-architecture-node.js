const photoservice = require("../service/photoservice");
let imageprocess = require("../process/imageprocess");
class photoscontroller {
  async uploadphoto(req, res) {
    try {
      if (!req.file) {
        return res
          .status(404)
          .json({ ok: false, massage: "Please put the image" });
      }
      let orginalphoto = req.file?.path;
      let processimage = await imageprocess.processimage(orginalphoto);

      let photos = await photoservice.uploadphotos(
        orginalphoto,
        req.user?._id,
        processimage,
      );
      if (photos) {
        return res.status(200).json({
          ok: true,
          massage: "Done",
          passportsize: photos?.processimage,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, massage: "Server error" });
    }
  }
  async getallphotos(req, res) {
    try {
      let photos = await photoservice.getallphotos(req.user?._id);
      if (photos) {
        return res.status(200).json({ ok: true, photos: photos });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, massage: "Server error" });
    }
  }
}
module.exports = new photoscontroller();
