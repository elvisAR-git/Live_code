const MAIN_DIR = __dirname + "/app/";

/*
    Create a list of the required apps.

    Each applet needs a name, path and data (Check the main.html to see why)
    the name will be used to determine where the applet is located
    in the HTML page

    the data is the main data feed to be used in the app --> always an array of objects
    
*/

var apps = [
  {
    appname: "Navbar",
    path: MAIN_DIR + "views/header.html",
    data: [],
  },
  {
    appname: "document",
    path: MAIN_DIR + "views/document.html",
    data: [
      {
        file: __dirname + "/app/classes/index.html",
        name: "index.html",
      },
    ],
  },
  {
    appname: "sty",
    path: MAIN_DIR + "views/css.html",
    data: [{ file: __dirname + "/app/classes/main.css", name: "main.css" }],
  },
  {
    appname: "frame",
    path: MAIN_DIR + "views/iframe.html",
    data: [],
  },
];

module.exports.apps = apps;
