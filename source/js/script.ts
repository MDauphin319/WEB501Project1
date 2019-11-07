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