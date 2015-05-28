//**** ---- Funktionen load on init  ---- ****
//--------------------------------------------

//**** Navbar stick on Top ***
$(function() {
	    var nav = $('#navigation_bar');
	    var navButtons = $('.nav_item');
	    var navButtonLast = $('.nav_item_last'); 
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
	                //backgroundColor: '#332211'
	            });
	            navButtons.css({
	            	borderBottom: '1px solid #ddd'
	            });
	            navButtonLast.css({
	            	borderBottom: '1px solid #ddd'
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
	            isFixed = false;
	        }
	    });
});