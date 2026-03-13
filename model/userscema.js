let mongoose = require("mongoose");
let user = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: [true, "Please enter the new email"],
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

let User = mongoose.model("User", user);
module.exports = User;
