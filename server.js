var express = require("express");
var bodyParser = require("body-parser");
var exHandlebars = require("express-handlebars")
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");
var db = require("./app/models");
var app = express();
var PORT = process.env.PORT || 3040;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("app/public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/app", {
    useMongoClient: true
});
console.log("\n***********************************\n");
// =============================================================
app.get("/all", function(req, res) {

    console.log("made it to scrape");
    axios.get("https://www.theonion.com/").then(function(response) {

        var $ = cheerio.load(response.data);

        $("h3.featured-headline").each(function(i, element) {
            var result = [];

            console.log(element);
            console.log("===========================***");
            for (var i=0; i < response.length; i++){
                result.push(response[i].result)
            } 
            console.log(result);
            console.log("===========================");
          
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
          
            console.log(result);
                    if (error) {
                      console.log(error);
                    }
                    else {
                      res.json(found);
                    }
                  });

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

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
        .then(function(dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
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