
 $(document).ready(function() {
     $('.parallax').parallax();

     $(".modal-trigger").on("click", function(event) {
         $('.modal').modal();
         var modalContent = $('.modal-content');
         $("#articles").append("text").css("color", "gray");

         $.getJSON("/all", function(element){
             console.log("-------------");
             console.log(element[i].children.data);
             console.log("-------------");
            for (var i = 0; i < data.length; i++) {

                $("#articles").append(element[i].children.data);
            }
        })

    //         $.ajax({
    //           url: 'http://localhost:3040/scrape',
    //           type: 'get',
    //           dataType: 'jsonp',
    //           jsonp: 'jsonp', 
    //           success: function (data) {
    //           console.log('success', data);
    // //      var articleTitle = answer[k].children.data;
    // //      var articleLink = answer[k].parent.attribs.href;

    //           },
    //           error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             console.log('error', errorThrown);
    //           }
    //         });

    });
 });
