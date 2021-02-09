const plugin = require("./plugin.js");
const HTML = require("html");
const MAIN_DIR = __dirname + "/app/";

/*
    The Arender class employs soft methods that allow for the
    template generation.

    it returns a MAINPAGE that contains the complete HTML to be displayed
    along with the data inserted with the engine.js class

    It is also interfaced with plugin.js

*/

class ARender {
  static renderPage(apps) {
    var rawHtml;
    var outHtml;
    var MainPage = plugin.readHtml(MAIN_DIR + "main.html").toString();
    var data;

    apps.forEach((view) => {
      rawHtml = plugin.readHtml(view.path);
      outHtml = plugin.render(rawHtml, view.data);

      data = MainPage.replace(`<${view.appname}></${view.appname}>`, outHtml);
      MainPage = data;
    });

    MainPage = HTML.prettyPrint(MainPage);

    return MainPage;
  }
}

exports.ARender = ARender;
