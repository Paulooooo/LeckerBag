//**** Startseite - Carousel für Kommentare ****
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