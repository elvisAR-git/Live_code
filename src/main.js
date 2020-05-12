const plugin = require('./plugin.js')
const HTML = require('html')
const MAIN_DIR = __dirname + "/app/"

class ARender
{
    static renderPage(apps)
    {
        var rawHtml
        var outHtml
        var MainPage = plugin.readHtml(MAIN_DIR + 'main.app').toString()
        var data

        apps.forEach(view =>
        {
            rawHtml = plugin.readHtml(view.path)
            outHtml = plugin.render(rawHtml, view.data)

            data = MainPage.replace(`<${view.appname}></${view.appname}>`, outHtml)
            MainPage = data
        });

        MainPage = HTML.prettyPrint(MainPage)

        return MainPage
    }
}


exports.ARender = ARender