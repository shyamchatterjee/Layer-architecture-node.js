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
      let accsesToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "15min",
      });
      let refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return res
        .cookie("accessToken", accsesToken, {
          httpOnly: true,
          secure: true,
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ ok: true, massage: "You're login", accessToken: accsesToken });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ ok: false, massage: "Server error" });
    }
  }
  async getuser(req, res) {
    let user = await userservice.getuser(req.user._id);
    if (!user) {
      return res.status(400).json({ ok: false, massage: "Unvalied user" });
    }
    return res.status(200).json({ ok: true, user: user });
  }
  async refreshToken(req, res) {
    try {
      let token = req?.cookies?.refreshToken;
      if (!token) {
        return res.status(400).json({ ok: false, massage: "Plaese logged in" });
      }
      let decoded = jwt.verify(token, process.env.SECRET_KEY);
      let user = await userservice.getuser(decoded?.id);
      let accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "15min",
      });
      let refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ ok: true, massage: "set Token" });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new Usercontroller();
