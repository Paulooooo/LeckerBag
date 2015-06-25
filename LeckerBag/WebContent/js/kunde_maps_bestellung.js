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

