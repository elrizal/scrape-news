 //On the scrape click, we'll add 20 articles and alert the user with the modal

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
              },
              error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error', errorThrown);
              }
            });
    //      $.ajax({
    //         url: 'http://localhost:28017/local/andyb',
    //         method: "GET"
    //     }).done(function(response) {
    //      var articlesSpot = $('#articles');
    //      var answer = response.type;
    //      var articleTitle = answer[k].children.data;
    //      var articleLink = answer[k].parent.attribs.href;
    //     })
    });
 });
