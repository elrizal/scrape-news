function getNotes() { //grabs notes and empties them
    $("#results").empty();
    $.getJSON("/all", function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
                data[i]._id + ">" + data[i].title + "</span><span class=deleter>X</span></p>");
        }
    });
}
getNotes();

$(document).on("click", "#makenew", function() {

    $.ajax({
            type: "POST",
            dataType: "json",
            url: "/submit",
            data: {
                title: $("#title").val(),
                note: $("#note").val(),
                created: Date.now()
            }
        })
        .then(function(data) {
            $("#results").prepend("<p class='dataentry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
                data._id + ">" + data.title + "</span><span class=deleter>X</span></p>");
            $("#note").val("");
            $("#title").val("");
        });
});

$("#clearall").on("click", function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/clearall",
        success: function(response) {
            $("#results").empty();
        }
    });
});

$(document).on("click", ".deleter", function() {
    var selected = $(this).parent();
    // Make an AJAX GET request to delete the specific note
    // this uses the data-id of the p-tag, which is linked to the specific note
    $.ajax({
        type: "GET",
        url: "/delete/" + selected.attr("data-id"),

        // On successful call
        success: function(response) {
            // Remove the p-tag from the DOM
            selected.remove();
            // Clear the note and title inputs
            $("#note").val("");
            $("#title").val("");
            // Make sure the #actionbutton is submit (in case it's update)
            $("#actionbutton").html("<button id='makenew'>Submit</button>");
        }
    });
});

// When user click's on note title, show the note, and allow for updates
$(document).on("click", ".dataTitle", function() {
    // Grab the element
    var selected = $(this);
    // Make an ajax call to find the note
    // This uses the data-id of the p-tag, which is linked to the specific note
    $.ajax({
        type: "GET",
        url: "/find/" + selected.attr("data-id"),
        success: function(data) {
            // Fill the inputs with the data that the ajax call collected
            $("#note").val(data.note);
            $("#title").val(data.title);
            // Make the #actionbutton an update button, so user can
            // Update the note s/he chooses
            $("#actionbutton").html("<button id='updater' data-id='" + data._id + "'>Update</button>");
        }
    });
});

// When user click's update button, update the specific note
$(document).on("click", "#updater", function() {
    // Save the selected element
    var selected = $(this);
    // Make an AJAX POST request
    // This uses the data-id of the update button,
    // which is linked to the specific note title
    // that the user clicked before
    $.ajax({
        type: "POST",
        url: "/update/" + selected.attr("data-id"),
        dataType: "json",
        data: {
            title: $("#title").val(),
            note: $("#note").val()
        },
        // On successful call
        success: function(data) {
            // Clear the inputs
            $("#note").val("");
            $("#title").val("");
            // Revert action button to submit
            $("#actionbutton").html("<button id='makenew'>Submit</button>");
            // Grab the results from the db again, to populate the DOM
            getNotes();
        }
    });
});