 //On the scrape click, we'll add 20 articles and alert the user with the modal

 $(document).ready(function() {
     $('.parallax').parallax();

     // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
     $('.modal').modal();
     var modalContent = $('.modal-content');
     modalContent.html('<h3>' + "You added articles!" + "</h3>");
 });