const express = require("express");
const DB = require("./DatabaseService");
var router = express.Router();
const fs = require("fs");
const MediaRender = require("./mediaRender");
const { Socket } = require("net");
const { resolve } = require("path");

let MyDB;

DB.connect("dsc_database").then((database) => {
  MyDB = database;
});

router.get("", (req, res) => {
  var classes = [];
  DB.fetch(MyDB, "classes", 0)
    .then((results, error) => {
      results.forEach((element) => {
        classes.push(element);
      });

      var data = {
        classes: results,
      };
      res.render("index", data);
    })
    .catch((err) => {
      console.log("[!] DATABASE CONNECT ERRROR:", err.code);
      res.render("500");
    });
});

router.get("/class/:id", (req, res) => {
  var dirs = fs.readdirSync("../Classes/");
  var sent = false;
  dirs.forEach((dir) => {
    if (dir.includes(`#${req.params.id}`)) {
      var files = fs.readdirSync("../Classes/" + dir);
      var m = [];

      files.forEach((f) => {
        if (f.includes(".html")) {
          m.push({
            filename: f,
            icon: "fa fa-html5",
          });
        } else if (f.includes(".css")) {
          m.push({
            filename: f,
            icon: "fa fa-css3",
          });
        } else if (f.includes(".js")) {
          m.push({
            filename: f,
            icon: "fa fa-file",
          });
        } else if (f.includes(".py")) {
          m.push({
            filename: f,
            icon: "fa fa-file",
          });
        } else {
          m.push({
            filename: f,
            icon: "fa fa-file",
          });
        }
      });

      var data = {
        files: m,
        name: dir,
        id: req.params.id,
      };
      if (!sent) {
        res.render("dashboard", data);
        sent = true;
      }
    }
  });
  if (!sent) {
    res.render("no_session");
  }
});

router.get("/class-data/:id/:filename", (req, res) => {
  var dirs = fs.readdirSync("../Classes/");
  dirs.forEach((dir) => {
    if (dir.includes(`#${req.params.id}`)) {
      var files = fs.readdirSync("../Classes/" + dir);
      var m = [];

      files.forEach((f) => {
        if (f === req.params.filename) {
          var d = __dirname.replace("/app", "/");
          m.push({
            filename: f,
            data: fs.readFileSync(d + `/Classes/${dir}/${f}`).toString(),
          });
        }
      });

      data = m[0];
      res.send(data);
    }
  });
});

router.get("/run/:file_name/", (req, res) => {
  var file = req.params.file_name;
  MediaRender.get(file).then((obj) => {
    if (obj.code == 200) {
      if (
        file.includes(".html") ||
        file.includes(".css") ||
        file.includes(".js")
      ) {
        res.status(obj.code);
        res.write(obj.data);
        res.end();
      } else {
        console.log("[*] executing with Tunnel server --->", file);
        var socker = new Socket();
        socker.connect({ port: 5000, host: "localhost" });
        socker.write(obj.path);
        socker.on("data", (data) => {
          var solution = data.toString("utf-8");
          res.render("Code", { solution: solution, file: file });
        });
      }
    } else {
      res.send(`<h1>Error [${obj.code}], please don't do that :-)</h1>`);
      res.end();
    }
  });
});

module.exports = router;
