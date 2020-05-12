
class Engine
{
    static loadTemplate(html, data)
    {
        var template = html
        var temp = eval('`' + template + '`')
        return temp;
    }
    static run(rawHTML, objectArray)
    {
        var html = "";
        objectArray.forEach((element, key) =>
        {
            html += this.loadTemplate(rawHTML, objectArray[key]);
        });
        if (html == "") return rawHTML
        return html;
    }

}

module.exports.Engine = Engine