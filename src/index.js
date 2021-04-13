const express = require("express");
const mediaRender = require("./mediaRender");
const bodyParser = require("body-parser");
const Controller = require("./logic");
var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json({})
);

app.use("", Controller);

/*Common Paths for fetch */

app.get("/:filename", (req, res) => {
  file = mediaRender.get(req.params.filename);
  file.then((data) => {
    if (data.code == 200) {
      // file found
      res.status(data.code);
      res.write(data.data);
      res.end();
    } else {
      res.status(data.code);
      res.write(req.params.filename + " could not be found on this server");
      res.end();
    }
  });
});

//Download request
app.get("/download/:filename", (req, res) => {
  file = mediaRender.get(req.params.filename);
  file.then((data) => {
    if (data.code == 200) {
      // file found
      res.status(data.code);
      res.send(data.data);
      res.end();
    } else {
      res.status(data.code);
      res.write(req.params.filename + " could not be found on this server");
      res.end();
    }
  });
});

PORT = process.env.PORT | 8080;
ADRR = "192.168.43.70";
app.listen(PORT, ADRR, () => {
  console.log(
    "----------------------------------------------\nThe webserver is running at :"
  );
  console.log(
    `http://${ADRR}:${PORT}/\n----------------------------------------------`
  );
});
