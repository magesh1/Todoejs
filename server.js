const express = require('express');
const date = require(__dirname + "/date.js");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const items = [];
const workItems = [];

app.get("/", function (req, res) {

    const day = date.getDate();
    res.render("List", {
        listTitle: day,
        newListItems: items
    });
});

app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    })
});


app.post("/", function (req, res) {
    var item = req.body.newItem;
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});


app.listen(process.env.PORT || 3000, () => console.log('server listening 3000'))