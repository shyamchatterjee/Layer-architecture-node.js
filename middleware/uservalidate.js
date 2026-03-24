let jwt = require("jsonwebtoken");
let userservice = require("../service/user.service");
class UserValidate {
  static async validateUser(req, res, next) {
    try {
      const token = req?.cookies?.accessToken;

      if (!token) {
        return res.status(401).json({
          ok: false,
          message: "You're not logged in. Please login",
        });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      let verifyuser = await userservice.getuser(decoded?.id);
      if (!verifyuser) {
        return res
          .status(400)
          .json({ ok: false, massage: "You're not logged in. Please login" });
      }
      req.user = verifyuser;
      return next();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserValidate;
