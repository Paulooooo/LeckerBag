//**** ---- Funktionen load on init  ---- ****
//--------------------------------------------

//**** Navbar stick on Top ****
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


//**** Navigationsleiste - onResize anpassen ****
$(window).on('resize', function(){
	$('.nav_item').css({width: $('.wrapper').width()/6});
});
//**** Navigationsleiste - Navigationselemente aktivieren, deaktivieren ****
var setNav = function(site){
	var navitems = document.getElementsByClassName("nav_item");
	for (var i=0; i<navitems.length; i++){
		navitems[i].className = "nav_item";
	}
	if(site != null){
		navitems[site].className += " active";
	}
};
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

//**** Kundenprofil - hide textfields, change buttons ****
var editProfilKunde = function (value){
	var inputs = document.getElementsByClassName("profilTextfield");
	var inputs_collapse = document.getElementsByClassName("profilTextfieldCollapse");
	var inputs_size = document.getElementsByClassName("profil_element");
	
	for(var i = 0; i < inputs.length; i++) {
	    inputs[i].disabled = value;
	}
	if (value){
		document.getElementById("btn_profil_kunde_edit").style.display="";
		document.getElementById("btn_profil_kunde_save").style.display="none";
		for(var j = 0; j < inputs_collapse.length; j++) {
		    inputs_collapse[j].style.display="none";
		}
		for(var g = 0; g < inputs_size.length; g++) {
			inputs_size[g].style.height="300px";
		}
	}
	else{
		document.getElementById("btn_profil_kunde_edit").style.display="none";
		document.getElementById("btn_profil_kunde_save").style.display="";
		for(var k = 0; k < inputs_collapse.length; k++) {
		    inputs_collapse[k].style.display="";
		}
		for(var h = 0; h < inputs_size.length; h++) {
			inputs_size[h].style.height="400px";
		}
	}
};
var saveDate = function(value){
	var elements = document.getElementsByClassName("bestellung_td_selected");
	var daysRemaining = document.getElementById("daysRemaining");
	for(var i=0; i<elements.length; i++){
		elements[i].className = elements[i].className+" bestellung_td_done";
	}
	daysRemaining.innerHTML = parseInt(daysRemaining.innerHTML)-1;
};
//**** generelle Datumrückgabe - heute ****
var getDateToday = function(input_element){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd;
	} 

	if(mm<10) {
	    mm='0'+mm;
	} 

	today = mm+'/'+dd+'/'+yyyy;
	document.getElementById(input_element).value = today;
};
//**** Bestellung - Kind -> Schule ****
var bestellung_changeSchool = function(){
	var value = "Röntgen Gymnasium";
	var choose = document.getElementById("bestellung_schueler").value;
	if (choose === "1"){
		value = unescape("R%F6ntgen Gymnasium");
	}
	else if (choose === "2"){
		value = unescape("Grundschule S%FCd");
	}
	else {
		value = "Bosch Gymnasium";
	}
	document.getElementById("bestellung_lieferort").value = value;
};

//**** Bestellung - Typeahead ****
var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substringRegex;
	 
	    // an array that will be populated with substring matches
	    matches = [];
	 
	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');
	 
	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push(str);
	      }
	    });
	 
	    cb(matches);
	  };
};

//**** Bestellung - Google-Maps ****
var baecker = [
               unescape('W%FCrzburg - WEBERS B%E4kereiladen'), 
               unescape('W%FCrzburg - R%F6sner Backstube'), 
               unescape('W%FCrzburg - Sandertorb%E4ck'), 
];

var adresse = [
			{strasse: 'Zwinger 6',
			 ort:  unescape('97070 W%FCrzburg'),
			 profil: unescape('<a href="#">Profil ansehen</a>'),
			 tel: '0931 657721'},
			{strasse: 'Ottostrasse 5',
			 ort:  unescape('97070 W%FCrzburg'),
			 profil: unescape('<a href="#">Profil ansehen</a>'),
			 tel: '0931 30433640'},
			{strasse: 'Sanderstrasse 18',
			 ort:  unescape('97070 W%FCrzburg'),
			 profil: unescape('<a href="#">Profil ansehen</a>'),
			 tel: '0931 13360'},
           ];

var locations = [
	[baecker[0], 49.788704, 9.936353],
	[baecker[1], 49.787839, 9.933086],
	[baecker[2], 49.787606, 9.931375],
];
var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';

var icons = [
	iconURLPrefix + 'red-dot.png',
	/*iconURLPrefix + 'green-dot.png',
	iconURLPrefix + 'blue-dot.png',
	iconURLPrefix + 'orange-dot.png',
	iconURLPrefix + 'purple-dot.png',
	iconURLPrefix + 'pink-dot.png',      
	iconURLPrefix + 'yellow-dot.png'*/
];
var iconsLength = icons.length;

var map = new google.maps.Map(document.getElementById('bestellung_map'), {
	zoom: 10,
	center: new google.maps.LatLng(-37.92, 151.25),
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	mapTypeControl: false,
	streetViewControl: false,
	panControl: false,
	zoomControlOptions: {
		position: google.maps.ControlPosition.LEFT_BOTTOM
	}
});

var infowindow = new google.maps.InfoWindow({
	maxWidth: 160
});

var markers = new Array();

var iconCounter = 0;

for (var i = 0; i < locations.length; i++) {  
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		map: map,
		icon: icons[iconCounter]
	});

	markers.push(marker);

	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			infowindow.setContent(locations[i][0]);
			infowindow.open(map, marker);
			setTypahead(marker.position.A);
		};
	})(marker, i));
  
	iconCounter++;
 	if(iconCounter >= iconsLength) {
 		iconCounter = 0;
 	}
}
function autoCenter() {
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < markers.length; i++) {
		bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
}

//**** Bestellung - Google-Maps -> Typeahaead ****
var setTypahead = function(a){
	if(a === 49.788704){
		document.getElementById("baecker_input").value = unescape('W%FCrzburg - WEBERS B%E4kereiladen');
		document.getElementById("bestellung_lieferant_strasse").innerHTML = adresse[0].strasse;
		document.getElementById("bestellung_lieferant_ort").innerHTML = adresse[0].ort;
		document.getElementById("bestellung_lieferant_profil").innerHTML = adresse[0].profil;
		document.getElementById("bestellung_lieferant_tel").innerHTML = adresse[0].tel;
		document.getElementById("bestellung_rating").style.display = 'block';
		
	}
	else if(a === 49.787839){
		document.getElementById("baecker_input").value = unescape('W%FCrzburg - R%F6sner Backstube');
		document.getElementById("bestellung_lieferant_strasse").innerHTML = adresse[1].strasse;
		document.getElementById("bestellung_lieferant_ort").innerHTML = adresse[1].ort;
		document.getElementById("bestellung_lieferant_profil").innerHTML = adresse[1].profil;
		document.getElementById("bestellung_lieferant_tel").innerHTML = adresse[1].tel;
		document.getElementById("bestellung_rating").style.display = 'block';
	}
	else{
		document.getElementById("baecker_input").value = unescape('W%FCrzburg - Sandertorb%E4ck');
		document.getElementById("bestellung_lieferant_strasse").innerHTML = adresse[2].strasse;
		document.getElementById("bestellung_lieferant_ort").innerHTML = adresse[2].ort;
		document.getElementById("bestellung_lieferant_profil").innerHTML = adresse[2].profil;
		document.getElementById("bestellung_lieferant_tel").innerHTML = adresse[2].tel;
		document.getElementById("bestellung_rating").style.display = 'block';
	}
};

var UserLooking = function (){
	var typahead = document.getElementById("typahead_holder").getElementsByClassName("tt-menu")[0];
	typahead.addEventListener("click", function() {
		var value = document.getElementById("baecker_input").value;
		if (value === unescape('W%FCrzburg - WEBERS B%E4kereiladen')){
			infowindow.setContent(locations[0][0]);
			infowindow.open(map, markers[0]);
			document.getElementById("bestellung_lieferant_strasse").innerHTML = adresse[0].strasse;
			document.getElementById("bestellung_lieferant_ort").innerHTML = adresse[0].ort;
			document.getElementById("bestellung_lieferant_profil").innerHTML = adresse[0].profil;
			document.getElementById("bestellung_lieferant_tel").innerHTML = adresse[0].tel;
			document.getElementById("bestellung_rating").style.display = 'block';
		}
		else if (value === unescape('W%FCrzburg - R%F6sner Backstube')){
			infowindow.setContent(locations[1][0]);
			infowindow.open(map, markers[1]);
			document.getElementById("bestellung_lieferant_strasse").innerHTML = adresse[1].strasse;
			document.getElementById("bestellung_lieferant_ort").innerHTML = adresse[1].ort;
			document.getElementById("bestellung_lieferant_ptofil").innerHTML = adresse[1].profil;
			document.getElementById("bestellung_lieferant_tel").innerHTML = adresse[1].tel;
			document.getElementById("bestellung_rating").style.display = 'block';
		}
		else if (value === unescape('W%FCrzburg - Sandertorb%E4ck')){
			infowindow.setContent(locations[2][0]);
			infowindow.open(map, markers[2]);
			document.getElementById("bestellung_lieferant_strasse").innerHTML = adresse[2].strasse;
			document.getElementById("bestellung_lieferant_ort").innerHTML = adresse[2].ort;
			document.getElementById("bestellung_lieferant_profil").innerHTML = adresse[2].profil;
			document.getElementById("bestellung_lieferant_tel").innerHTML = adresse[2].tel;
			document.getElementById("bestellung_rating").style.display = 'block';
		}
	});

};
var removeBagProdukt = function () {
	console.log("ha");
};

$('#favorites_carousel').carousel({
	interval: 500
});

