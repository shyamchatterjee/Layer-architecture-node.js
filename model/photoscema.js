let mongoosh = require("mongoose");

let photoscemna = new mongoosh.Schema(
  {
    orginalphoto: {
      type: String,
    },
    userid: {
      type: mongoosh.Schema.Types.ObjectId,
      ref: "User",
    },
    processimage: {
      type: String,
    },
  },
  { timestamps: true },
);
let Photos = mongoosh.model("Photos", photoscemna);
module.exports = Photos;
