var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create new NoteSchema object
var NoteSchema = new Schema({
    title: String,
    body: String
});

var Note = mongoose.model("usernote", NoteSchema);
module.exports = Note;