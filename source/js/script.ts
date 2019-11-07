//Accordian with smooth slide
$('.accordion').on('click', '.accordion-control', function(event) {
  event.preventDefault();
  $(event.target)
    .next('.accordion-panel')
    .not('animated')
	.addClass('animated')
    .slideToggle(function(){
		 $(event.target)
		.next('.accordion-panel').removeClass('animated');
	});	
});

//Button that scrolls to bottom of page
$("#buttonScroll").click(function() {
    $('html, body').animate({
        scrollTop: $("#myDiv").offset().top
    }, 2000);
});