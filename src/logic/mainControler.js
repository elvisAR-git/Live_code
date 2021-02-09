const express = require("express");
const ARender = require("../main").ARender;

const Router = express.Router();
const loadApps = require("./loadApps");

Router.get("", (req, res) => {
  var apps = loadApps();

  var page = ARender.renderPage(apps);
  res.send(page);
});

module.exports = Router;
