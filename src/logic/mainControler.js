const express = require("express");
const ARender = require("../main").ARender;
const mediaRender = require("../mediaRender");
const Router = express.Router();
const loadApps = require("./loadApps");

Router.get("/web", (req, res) => {
  var apps = loadApps();

  var page = ARender.renderPage(apps);
  res.send(page);
});

Router.get("", (req, res) => {
  file = mediaRender.get("home.html");
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
module.exports = Router;
