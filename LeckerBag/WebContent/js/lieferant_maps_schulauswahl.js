//**** Bestellung - Google-Maps ****
var schulen = [
               unescape('W%FCrzburg - Wirsberg-Gymnasium'), 
               unescape('W%FCrzburg - R%F6ntgen-Gymnasium'), 
               unescape('W%FCrzburg - Dag-Hammarskj%F6ld-Gymnasium'), 
];

var locations_schulen = [
	[schulen[0], 49.787780, 9.928358],
	[schulen[1], 49.786974, 9.932903],
	[schulen[2], 49.787223, 9.947194],
];
var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';

var icons = [
	//iconURLPrefix + 'red-dot.png',
	iconURLPrefix + 'green-dot.png',
	/*iconURLPrefix + 'blue-dot.png',
	iconURLPrefix + 'orange-dot.png',
	iconURLPrefix + 'purple-dot.png',
	iconURLPrefix + 'pink-dot.png',      
	iconURLPrefix + 'yellow-dot.png'*/
];
var iconsLength = icons.length;

var map = new google.maps.Map(document.getElementById('schulen_map'), {
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

for (var i = 0; i < locations_schulen.length; i++) {  
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations_schulen[i][1], locations_schulen[i][2]),
		map: map,
		icon: icons[iconCounter]
	});

	markers.push(marker);

	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			infowindow.setContent(locations_schulen[i][0]);
			infowindow.open(map, marker);
			checkSchool(marker.position.A);
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

function checkSchool(a){
	if(a === 49.787780){
		document.getElementById("school1").checked = true;
	}
	else if(a === 49.786974){
		document.getElementById("school2").checked = true;
	}
	else{
		document.getElementById("school3").checked = true;
	}
};

function school_get_checked(){
	if(this.value === "1"){
		infowindow.setContent(locations_schulen[0][0]);
		infowindow.open(map, markers[0]);
	}
	else if(this.value === "2"){
		infowindow.setContent(locations_schulen[1][0]);
		infowindow.open(map, markers[1]);
	}
	else {
		infowindow.setContent(locations_schulen[2][0]);
		infowindow.open(map, markers[2]);
	}
};

