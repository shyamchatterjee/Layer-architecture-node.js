const Photos = require("../model/photoscema");

class Photorepositroy {
  async postphotos(orginalphoto, userid, processimage) {
    let photos = await Photos.create({
      orginalphoto: orginalphoto,
      userid: userid,
      processimage: processimage,
    });
    return photos;
  }
  async getalluserPhotos() {
    let photos = await Photos.find().sort({ createdAt: -1 }).populate("userid");
    return photos;
  }
  async getphotos(id) {
    let photos = await Photos.find({ userid: id })
      .sort({ createdAt: -1 })
      .populate("userid");
    return photos;
  }
}
module.exports = new Photorepositroy();
