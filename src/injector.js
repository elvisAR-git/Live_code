const MAIN_DIR = __dirname + "/app/"
const ARender = require('./main.js').ARender
data = [
    {
        name: 'elvis',
        age: 2
    },
    {
        name: 'alan',
        age: 14
    },
    {
        name: 'paul',
        age: 35
    }
]

var data2 = [
    {
        title: "The footer",
        slug: 'i love the red roses'
    },
    {
        title: "Bloody",
        slug: "Pink lilies"
    }
]

var apps = [
    {
        appname: "Hello",
        path: MAIN_DIR + 'views/hello.html',
        data: data
    },
    {
        appname: "Footer",
        path: MAIN_DIR + 'views/footer.html',
        data: data2
    },
    {
        appname: "Navbar",
        path: MAIN_DIR + "views/header.html",
        data: []
    }
]

MainPage = ARender.renderPage(apps)

// console.log(MainPage)

module.exports = {
    MainPage: MainPage
}

