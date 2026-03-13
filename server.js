const app = require("./index.js");
const Detabaseconntected = require("./config/conndectDB");
let dotenv = require("dotenv");
dotenv.config();

Detabaseconntected.connectDB();
app.listen(process.env.PORT, () => {
  console.log("server started");
});
