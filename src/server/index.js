const express = require("express")
const Page = require('../injector').MainPage

var app = express()
app.get("/", (req, res) =>
{
    res.send(Page)
})

PORT = 40001

app.listen(
    PORT, () =>
{
    console.log("front End server running @Port", PORT)
}
)