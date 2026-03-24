let User = require("../model/userscema");
let bcrypt = require("bcrypt");
class Userrepository {
  async createuser(deta, image) {
    let password = await bcrypt.hash(deta.password, 10);
    let user = await User.create({
      name: deta?.name,
      email: deta?.email,
      password: password,
      image: image?.originalname,
    });
    return user;
  }
  async findemail(deta) {
    console.log(deta?.email);
    let user = await User.findOne({ email: deta?.email });
    return user;
  }
  async getuser(id) {
    let user = await User.findById(id);
    return user;
  }
}

module.exports = new Userrepository();
