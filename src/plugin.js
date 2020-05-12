const Engine = require('./engine.js').Engine
const fs = require('fs')

function render(html, data){
    var evalHtml= Engine.run(html,data)
    return evalHtml
}

function readHtml(app){
    var data = fs.readFileSync(app)
    data = data.toString('utf-8')
    return data
}



module.exports.readHtml = readHtml
module.exports.render = render