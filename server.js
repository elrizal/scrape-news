var express = require("express");
var bodyParser = require("body-parser");
var exHandlebars = require("express-handlebars")
var mongoose = require("mongoose");
var logger = require("morgan");

var cheerio = require("cheerio");
var axios = require("axios");

var db = require("./app/models");
var app = express();
var PORT = process.env.PORT || 3040;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("app/public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/app", {
    useMongoClient: true
});
console.log("\n***********************************\n");
// =============================================================

// app.get("/all", function(req, res) {
//     db.scrapedData.find({}, function(error, found) {
//       if (error) {
//         console.log(error);
//       }
//       else {
//         res.json(found);
//       }
//     });
//   });
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.theonion.com/").then(function(response) {
 
    var $ = cheerio.load(response.data);

        $("h3.featured-headline").each(function(i, element) {
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
              .children("a")
              .text();
            result.link = $(this)
              .children("a")
              .attr("href");

            console.log("===========================***");
 
        //    var articleTitle= $(this)
        //         .children("a")
        //         .text();
        //     var articleLink = $(this)
        //         .children("a")
        //         .attr("href");
        //   var articleData = {}; 


            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err);
                });
                res.send(element);
        });
        res.send("scrapped");
    });


// GET Articles from the db
app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {

    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        }).then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });

    res.status(500).json({
        status: 'error'
    });
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});