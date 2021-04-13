const MediaRender = require("../mediaRender");

const MAIN_DIR = process.cwd() + "/src/" + "";

module.exports = function loadapps(limit) {
  // apps go here

  return new Promise((resolve, reject) => {
    // running query

    MediaRender.get("data.json").then((response) => {
      let obj = JSON.parse(response.data.toString());

      obj = obj.reverse();
      if (limit && limit > 0) {
        obj = obj.slice(0, parseInt(limit));
      }
      let array = [
        {
          appname: "Navbar",
          path: MAIN_DIR + "app/views/header.html",
          data: [],
        },
        {
          appname: "Requests",
          path: MAIN_DIR + "app/views/table.html",
          data: obj,
        },
      ];
      return resolve(array);
    });
  });
};
