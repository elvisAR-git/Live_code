module.exports = function loadapps() {
  const MAIN_DIR = process.cwd() + "/src/" + "";

  // apps go here
  return [
    {
      appname: "Navbar",
      path: MAIN_DIR + "app/views/header.html",
      data: [],
    },
    {
      appname: "document",
      path: MAIN_DIR + "app/views/document.html",
      data: [
        {
          file: MAIN_DIR + "app/classes/index.html",
          name: "index.html",
        },
      ],
    },
    {
      appname: "sty",
      path: MAIN_DIR + "app/views/css.html",
      data: [{ file: MAIN_DIR + "app/classes/main.css", name: "main.css" }],
    },
    {
      appname: "frame",
      path: MAIN_DIR + "app/views/iframe.html",
      data: [],
    },
    {
      appname: "js",
      path: MAIN_DIR + "app/views/js.html",
      data: [
        {
          file: MAIN_DIR + "app/classes/index.js",
          name: "index.js",
        },
      ],
    },
  ];
};
