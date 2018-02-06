// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");
var exHandlebars = require("express-handlebars")
var mongoose = require("mongoose");


var app = express();
var PORT = process.env.PORT || 3040;

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static directory to be served
app.use(express.static("app/public"));

// Routes
// require("./app/routes/api-routes.js")(app);


// First, tell the console what server.js is doing
console.log("\n***********************************\n");
app.get
    // Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request("https://www.newyorktimes.com", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    // $("p.title").each(function(i, element) {

    //     // Save the text of the element in a "title" variable
    //     var title = $(element).text();

    //     // In the currently selected element, look at its child elements (i.e., its a-tags),
    //     // then save the values for any "href" attributes that the child elements may have
    //     var link = $(element).children().attr("href");

    //     // Save these results in an object that we'll push into the results array we defined earlier
    //     results.push({
    //         title: title,
    //         link: link
    //     });
    // });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
});
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});