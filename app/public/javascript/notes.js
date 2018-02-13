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
    $.ajax({
        type: "GET",
        url: "/delete/" + selected.attr("data-id"),

        success: function(response) {
            selected.remove();
            $("#note").val("");
            $("#title").val("");
            $("#actionbutton").html("<button id='makenew'>Submit</button>");
        }
    });
});

$(document).on("click", ".dataTitle", function() {
    var selected = $(this);
    $.ajax({
        type: "GET",
        url: "/find/" + selected.attr("data-id"),
        success: function(data) {
            $("#note").val(data.note);
            $("#title").val(data.title);

            $("#actionbutton").html("<button id='updater' data-id='" + data._id + "'>Update</button>");
        }
    });
});
$(document).on("click", "#updater", function() {
    var selected = $(this);
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
        success: function(data) {
            $("#note").val("");
            $("#title").val("");
            $("#actionbutton").html("<button id='makenew'>Submit</button>");
            getNotes();
        }
    });
});