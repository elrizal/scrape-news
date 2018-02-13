
 $(document).ready(function() {
     $('.parallax').parallax();

     $(".modal-trigger").on("click", function(event) {
         $('.modal').modal();
         var modalContent = $('.modal-content');
         $("#articles").append("text").css("color", "gray");
         console.log("-------");

         $.getJSON("/all", function(element, result){
             
            for (var i = 0; i < element.length; i++) {
                $("#articles").append(element[i].children.data);
            }
        })
    });
 });
