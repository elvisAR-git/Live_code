const express = require("express");
var router = express.Router();
const fs = require("fs");
const MediaRender = require("./mediaRender");
const { Socket } = require("net");

router.get("", (req, res) => {
  var dirs = fs.readdirSync("../Classes/");
  dirs.pop();
  let classes = [];
  var d = __dirname.replace("/app", "/");
  dirs.forEach((dir) => {
    var files = fs.readdirSync("../Classes/" + dir);
    var logo = "default.png";
    files.forEach((file) => {
      if (file.includes("logo")) {
        if (file.includes(".svg")) {
          logo = fs.readFileSync(d + "Classes/" + dir + "/" + file).toString();
        } else {
          logo = file;
        }
      }
    });
    classes.push({
      name: dir.substr(0, dir.length - 2),
      id: dir.substr(dirs.length - 7, dir.length - 3).replace("#", ""),
      image: logo,
    });
  });
  let data = {
    classes: classes,
  };
  res.render("index", data);
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

router.get("/:filename", (req, res) => {
  file = MediaRender.get(req.params.filename);
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
router.get("/download/:filename", (req, res) => {
  file = MediaRender.get(req.params.filename);
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

module.exports = router;
