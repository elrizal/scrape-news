// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");

var app = express();
app.use(logger("dev"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(express.static("public"));

// Database configuration
var databaseUrl = "notetaker";
var collections = ["notes"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Routes
// ======

// Simple index route
app.get("/", function(req, res) {
    res.send(index.html);
});

// Handle form submission, save submission to mongo
app.post("/submit", function(req, res) {
    console.log(req.body);
    db.notes.insert(req.body, function(error, saved) {
        if (error) {
            console.log(error);
        } else {
            // Otherwise, send the note back to the browser
            // This will fire off the success function of the ajax request
            res.send(saved);
        }
    });
});

// Retrieve results from mongo
app.get("/all", function(req, res) {
    db.notes.find({}, function(error, found) {
     
        if (error) {
            console.log(error);
        } else {
            res.json(found);
        }
    });
});

// Select just one note by an id
app.get("/find/:id", function(req, res) {
    db.notes.findOne({
            // Using the id in the url
            _id: mongojs.ObjectId(req.params.id)
        },
        function(error, found) {
            // log any errors
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(found);
                res.send(found);
            }
        }
    );
});
//updates
app.post("/update/:id", function(req, res) {

    db.notes.update({
            _id: mongojs.ObjectId(req.params.id)
        }, {
            $set: {
                title: req.body.title,
                note: req.body.note,
                modified: Date.now()
            }
        },
        function(error, edited) {
         
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(edited);
                res.send(edited);
            }
        }
    );
});

// Delete One from the DB
app.get("/delete/:id", function(req, res) {
   
    db.notes.remove({
            _id: mongojs.ObjectID(req.params.id)
        },
        function(error, removed) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(removed);
                res.send(removed);
            }
        }
    );
});

// Clear the DB
app.get("/clearall", function(req, res) {
    // Remove every note from the notes collection
    db.notes.remove({}, function(error, response) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log(response);
            res.send(response);
        }
    });
});

