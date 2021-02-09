const HTML = require("html");
const fs = require("fs");

function readCode(filePath) {
  var code_data = fs.readFileSync(filePath).toString("utf-8");

  code_data = code_data.replace(/</g, "&lt;");
  code_data = code_data.replace(/>/g, "&gt;");
  return code_data;
}

class Engine {
  /*
        This class serves as the main template generator. it accepts
        objects as data and generates an array of html 'applets' that contain the
        data array
    */
  static loadTemplate(html, data) {
    console.log(data);
    var template = html;
    if (data.file) {
      data.file = readCode(data.file);
    }
    var temp = eval("`" + template + "`");
    temp = HTML.prettyPrint(temp);
    return temp;
  }
  static run(rawHTML, objectArray) {
    var html = "";
    objectArray.forEach((element, key) => {
      html += this.loadTemplate(rawHTML, objectArray[key]);
    });
    if (html == "") return rawHTML;
    return html;
  }
}

module.exports.Engine = Engine;
