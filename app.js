const express = require("express");
const cors = require("cors");
const routes = require("./Routes");
const path = require("path");
const bodyparser = require("body-parser");
// prepare

var app = express();

// content parsers
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(
  bodyparser.json({
    extended: true,
  })
);

app.use(cors());
app.use(express.static(__dirname + "/assets/"));
app.set("views", path.join(__dirname, "/assets/views/pages"));
app.set("view engine", "ejs");
app.use("/", routes);

// Run

var PORT = process.env.PORT || 3000;
var addr = "192.168.43.70";
app.listen(PORT, "localhost", () => {
  console.log(`The server is running at port ${PORT}`);
});
