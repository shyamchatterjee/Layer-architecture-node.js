let sharp = require("sharp");
class imageprocess {
  async processimage(orginalurl) {
    let outputpath = "public/passport/passportphoto-" + Date.now() + ".jpg";
    await sharp(orginalurl).resize(100, 250).toFile(outputpath);
    return outputpath;
  }
}

module.exports = new imageprocess();
