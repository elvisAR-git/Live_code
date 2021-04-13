const express = require("express");
const ARender = require("../main").ARender;
const Router = express.Router();
const loadApps = require("./loadApps");
const { v4: uuidv4 } = require("uuid");

Router.get("", (req, res) => {
  var fs = require("fs");

  var currentrequest = JSON.stringify(req.body);

  fs.readFile(
    __dirname.replace("logic", "") + "Database/" + "data.json",
    function (err, data) {
      var json = JSON.parse(data);

      let r = {};
      r.body = currentrequest;
      r.headers = req.headers;
      r.url = req.url;
      r.params = req.params;
      r.id = uuidv4();
      r.time = new Date();
      r.method = "GET";
      r.ip = req.connection.remoteAddress;

      json.push(r);
      fs.writeFile(
        __dirname.replace("logic", "") + "Database/" + "data.json",
        JSON.stringify(json, null, 4),
        (err, result) => {
          loadApps().then((apps) => {
            var page = ARender.renderPage(apps);
            res.send(page);
          });
        }
      );
    }
  );
});

Router.get("/filter-json/:number", (req, res) => {
  var fs = require("fs");

  var currentrequest = JSON.stringify(req.body);

  fs.readFile(
    __dirname.replace("logic", "") + "Database/" + "data.json",
    function (err, data) {
      var json = JSON.parse(data);
      console.log(req.params.number, " filtering...");
      let r = {};
      r.body = currentrequest;
      r.headers = req.headers;
      r.url = req.url;
      r.params = req.params;
      r.id = uuidv4();
      r.time = new Date();
      r.method = "GET";
      r.ip = req.connection.remoteAddress;

      json.push(r);
      fs.writeFile(
        __dirname.replace("logic", "") + "Database/" + "data.json",
        JSON.stringify(json, null, 4),
        (err, result) => {
          loadApps(req.params.number).then((apps) => {
            let data = [];
            apps.forEach((element) => {
              data.push(element.data);
            });
            res.setHeader("Content-Type", "application/json");
            res.send(data);
          });
        }
      );
    }
  );
});

Router.get("/filter/:number", (req, res) => {
  var fs = require("fs");

  var currentrequest = JSON.stringify(req.body);

  fs.readFile(
    __dirname.replace("logic", "") + "Database/" + "data.json",
    function (err, data) {
      var json = JSON.parse(data);
      console.log(req.params.number, " filtering...");
      let r = {};
      r.body = currentrequest;
      r.headers = req.headers;
      r.url = req.url;
      r.params = req.params;
      r.id = uuidv4();
      r.time = new Date();
      r.method = "GET";
      r.ip = req.connection.remoteAddress;

      json.push(r);
      fs.writeFile(
        __dirname.replace("logic", "") + "Database/" + "data.json",
        JSON.stringify(json, null, 4),
        (err, result) => {
          loadApps(req.params.number).then((apps) => {
            var page = ARender.renderPage(apps);
            res.send(page);
          });
        }
      );
    }
  );
});

Router.get("/hit", (req, res) => {
  var fs = require("fs");

  var currentrequest = JSON.stringify(req.body);

  fs.readFile(
    __dirname.replace("logic", "") + "Database/" + "data.json",
    function (err, data) {
      var json = JSON.parse(data);

      let r = {};
      r.body = currentrequest;
      r.headers = req.headers;
      r.url = req.url;
      r.params = req.params;
      r.id = uuidv4();
      r.time = new Date();
      r.method = "GET";
      r.ip = req.connection.remoteAddress;

      json.push(r);
      fs.writeFile(
        __dirname.replace("logic", "") + "Database/" + "data.json",
        JSON.stringify(json, null, 4),
        (err, result) => {
          res.send(r.id);
        }
      );
    }
  );
});

Router.post("/hit", (req, res) => {
  var fs = require("fs");

  var currentrequest = JSON.stringify(req.body);
  console.log(currentrequest);
  fs.readFile(
    __dirname.replace("logic", "") + "Database/" + "data.json",
    function (err, data) {
      var json = JSON.parse(data);

      let r = {};
      r.body = currentrequest;
      r.headers = req.headers;
      r.url = req.url;
      r.params = req.params;
      r.id = uuidv4();
      r.time = new Date();
      r.method = "POST";

      json.push(r);
      fs.writeFile(
        __dirname.replace("logic", "") + "Database/" + "data.json",
        JSON.stringify(json, null, 4),
        (err, result) => {
          res.send(r.id);
        }
      );
    }
  );
});

Router.put("/hit", (req, res) => {
  var fs = require("fs");

  var currentrequest = JSON.stringify(req.body);

  fs.readFile(
    __dirname.replace("logic", "") + "Database/" + "data.json",
    function (err, data) {
      var json = JSON.parse(data);

      let r = {};
      r.body = currentrequest;
      r.headers = req.headers;
      r.url = req.url;
      r.params = req.params;
      r.id = uuidv4();
      r.time = new Date();
      r.method = "PUT";
      r.ip = req.connection.remoteAddress;

      json.push(r);
      fs.writeFile(
        __dirname.replace("logic", "") + "Database/" + "data.json",
        JSON.stringify(json, null, 4),
        (err, result) => {
          res.send(r.id);
        }
      );
    }
  );
});
Router.patch("/hit", (req, res) => {
  var fs = require("fs");

  var currentrequest = JSON.stringify(req.body);

  fs.readFile(
    __dirname.replace("logic", "") + "Database/" + "data.json",
    function (err, data) {
      var json = JSON.parse(data);

      let r = {};
      r.body = currentrequest;
      r.headers = req.headers;
      r.url = req.url;
      r.params = req.params;
      r.id = uuidv4();
      r.time = new Date();
      r.method = "PATCH";
      r.ip = req.connection.remoteAddress;
      json.push(r);
      fs.writeFile(
        __dirname.replace("logic", "") + "Database/" + "data.json",
        JSON.stringify(json, null, 4),
        (err, result) => {
          res.send(r.id);
        }
      );
    }
  );
});
module.exports = Router;
