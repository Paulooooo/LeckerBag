//**** ---- Funktionen load on init  ---- ****
//--------------------------------------------

//**** Navbar stick on Top ***
$(function() {
	    var nav = $('#navigation_bar');
	    var navButtons = $('.nav_item');
	    var navButtonLast = $('.nav_item_last'); 
	    var navbarContainer = $('.navbar_container'); 
	    var navHomeY = nav.offset().top;
	    var isFixed = false;
	    var $w = $(window);
	    
	    $w.scroll(function() {
	        var scrollTop = $w.scrollTop();
	        var shouldBeFixed = scrollTop > navHomeY;
	        if (shouldBeFixed && !isFixed) {
	            nav.css({
	                position: 'fixed',
	                top: 0,    
	                left: nav.offset().left+15, //add 15px padding
	                width: nav.width(),
	            });
	            navButtons.css({
	            	borderBottom: '1px solid #ddd'
	            });
	            navButtonLast.css({
	            	borderBottom: '1px solid #ddd'
	            });
	            navbarContainer.css({
	                boxShadow: '0px 1px 2px 0px rgba(221,221,221,1)'
	            });
	            isFixed = true;
	        }
	        else if (!shouldBeFixed && isFixed)
	        {
	            nav.css({   
	                position: '',
	                top: '',
		            width: '100%',
		           // backgroundColor: ''
	            });
	            navButtons.css({
	            	borderBottom: ''
	            });
	            navButtonLast.css({
	            	borderBottom: ''
	            });
	            navbarContainer.css({
	                boxShadow: ''
	            });
	            isFixed = false;
	        }
	    });
});

setCarouselHeight('#carousel-startseite');
function setCarouselHeight(id)
{
    var slideHeight = [];
    $(id+' .item').each(function()
    {
        // add all slide heights to an array
        slideHeight.push($(this).height());
    });

    // find the tallest item
    max = Math.max.apply(null, slideHeight);

    // set the slide's height
    $(id+' .item').each(function()
    {
        $(this).css('height',max+'px');
    });
    $(id+' #startseite_slider_arrow_left').each(function()
    {
        $(this).css('padding-top',max/2+'px');
    });
    $(id+' #startseite_slider_arrow_right').each(function()
    {
        $(this).css('padding-top',max/2+'px');
    });
}


