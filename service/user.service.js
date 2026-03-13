const userReopositroy = require("../repository/user.reopositroy");

class Userservice {
  async useregister(deta, image) {
    let user = await userReopositroy.createuser(deta, image);
    if (user) {
      return user;
    }
  }
  async userlogin(deta) {
    let user = await userReopositroy.findemail(deta);
    if (user) {
      return user;
    }
  }
}

module.exports = new Userservice();
