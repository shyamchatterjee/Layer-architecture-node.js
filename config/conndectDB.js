let mongoose = require("mongoose");
class Detabaseconnected {
  static connectDB() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then((value) => {
        console.log("Detabase connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = Detabaseconnected;
