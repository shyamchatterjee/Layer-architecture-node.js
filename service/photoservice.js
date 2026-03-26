const photoReposetry = require("../repository/photo.reposetry");
let photosrepository = require("../repository/photo.reposetry");

class photoservice {
  async uploadphotos(orginalphoto, userid, processimage) {
    let photos = await photosrepository.postphotos(
      orginalphoto,
      userid,
      processimage,
    );
    return photos;
  }
  async getallphotos(id) {
    let photos = await photoReposetry.getphotos(id);
    return photos;
  }
}

module.exports = new photoservice();
