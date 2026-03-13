let bcrypt = require("bcrypt");
let userservice = require("../service/user.service");
let jwt = require("jsonwebtoken");
let userReopositroy = require("../repository/user.reopositroy");
class Usercontroller {
  async register(req, res) {
    try {
      if (!req.body.name || !req.body.password || !req.body.email) {
        return res
          .status(400)
          .json({ ok: false, massage: "Please fill the from" });
      }
      let finduser = await userReopositroy.findemail(req.body);
      if (finduser) {
        return res
          .status(400)
          .json({ ok: false, massage: "Allredy register this email" });
      }
      let user = await userservice.useregister(req.body, req.file);
      if (user) {
        res.status(400).json({ ok: true, massage: "You're register" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, massage: "Server eror" });
    }
  }
  async login(req, res) {
    try {
      if (!req.body.password || !req.body.email) {
        return res
          .status(400)
          .json({ ok: false, massage: "Please fill the from" });
      }
      let user = await userservice.userlogin(req.body);
      if (!user) {
        return res.status(400).json({ ok: false, massage: "User not found" });
      }
      let match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res
          .status(400)
          .json({ ok: false, massage: "invailed password" });
      }
      let token = jwt.sign({ id: user._id }, "token");
      return res
        .cookie(token)
        .status(200)
        .json({ ok: true, massage: "You're login" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, massage: "Server error" });
    }
  }
}

module.exports = new Usercontroller();
