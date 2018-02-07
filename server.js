// Parses our HTML and helps us find elements

var express = require("express");
var bodyParser = require("body-parser");
var exHandlebars = require("express-handlebars")
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");
// var db = require("./model");
var app = express();
var PORT = process.env.PORT || 3040;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static("app/public"));

console.log("\n***********************************\n");
// =============================================================
app.get("/scrape", function(req, res) {
    axios.get("https://www.theonion.com/").then(function(response) {

        var $ = cheerio.load(response.data);

        $("h3.featured-headline").each(function(i, element) {
            var result = {};
            console.log(element);
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            // db.Article.create(result)
            //     .then(function(dbArticle) {
            //         console.log(dbArticle);
            //     })
            //     .catch(function(err) {
            //         return res.json(err);
            //     });
        });

        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
    });
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});