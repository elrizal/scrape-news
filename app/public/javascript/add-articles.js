
 $(document).ready(function() {
     $('.parallax').parallax();

     $(".modal-trigger").on("click", function(event) {
         $('.modal').modal();
         var modalContent = $('.modal-content');

            $.ajax({
              url: 'http://localhost:3040/scrape',
              type: 'get',
              dataType: 'jsonp',
              jsonp: 'jsonp', 
              success: function (data) {
              console.log('success', data);
    //      var articleTitle = answer[k].children.data;
    //      var articleLink = answer[k].parent.attribs.href;

              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error', errorThrown);
              }
            });

    });
 });
