const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

// add as many as you like
MEDIA_DIRS = [
  __dirname + "/",
  __dirname + "/app/Scripts/",
  __dirname + "/app/global/",
  __dirname + "/app/CSS/",
  __dirname + "/app/classes/",
];

/*
    The MediaRender class implements an async file reader that reads files
    stored on the server. it is very easy to use, just call the get method
    and it returns a response object

*/

class MediaRender {
  static async get(filename) {
    // Response object
    var response = {
      code: 404,
      data: undefined,
    };
    var n = MEDIA_DIRS.length;
    var counter = 0;

    // search fot the file in the MEDIA_DIRS
    while (counter <= n) {
      await readFile(MEDIA_DIRS[counter] + filename)
        .then((dt) => {
          // File found
          response.code = 200;
          response.data = dt;
          console.log(`[+] 200 ---> ${MEDIA_DIRS[counter] + filename}`);
        })
        .catch((err) => {});

      counter = counter + 1;
    }
    if (response.data === undefined) {
      // File not found
      console.log(`[!] 404 ----> ${filename}`);
    }
    return response;
  }
}

module.exports = MediaRender;
