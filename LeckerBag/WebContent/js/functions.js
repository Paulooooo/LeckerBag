//**** ---- Funktionen load on init  ---- ****
//--------------------------------------------
//**** Navbar stick on Top ****
$(function() {
    $('#nav-wrapper').height($("#nav").height());
    
    $('#nav').affix({
        offset: { top: $('#nav').offset().top }
    });
});

//**** Navigationsleiste - onResize anpassen ****
$(window).on('resize', function(){
	$('.nav_item').css({width: $('.wrapper').width()/6});
});

$('.nav_item').css({width: $('.wrapper').width()/6});
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

var saveDate = function(value){
	var elements = document.getElementsByClassName("bestellung_td_selected");
	var daysRemaining = document.getElementById("daysRemaining");
	var bag_inhalt = document.getElementsByClassName("bestellung_bag");
	var bag = [];
	for(var a=0; a<bag_inhalt[0].childNodes.length; a++){
		if(bag_inhalt[0].childNodes[a].className === 'bag_item_holder'){
			bag.push(bag_inhalt[0].childNodes[a].childNodes[0].innerHTML);
		}
		/*if(bag_inhalt[0].childNodes[a].className != undefined){
			if(bag_inhalt[0].childNodes[a].classList.contains('blue') || bag_inhalt[0].childNodes[a].classList.contains('red') || bag_inhalt[0].childNodes[a].classList.contains('green')){
				bag.push(bag_inhalt[0].childNodes[a].innerHTML);
			}
		}*/
	}
	//create Bag table
	var bag_div = document.createElement('div');
	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	for(var b=0; b<bag.length; b++){
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.innerHTML = bag[b];
		td.className = "popover_baginhalt";
		tr.appendChild(td);
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	bag_div.appendChild(table);
	
	for(var i=0; i<elements.length; i++){
		var div_icon = document.createElement('div');
		var icon = document.createElement('i');
		icon.className = "fa fa-3x fa-check-circle check_circle_green";
		$(icon).popover({ placement : 'top', html: true, title: unescape('Baginhalt'), trigger: "hover", content: function (){ return $(bag_div).html();}});
		div_icon.appendChild(icon);
		elements[i].appendChild(div_icon);
		daysRemaining.innerHTML = parseInt(daysRemaining.innerHTML)-1;
	}
	$('.bestellung_td_selected').removeClass('bestellung_td_selected');
};

var remove_bag_item = function (item){
	var parent = item.parentNode;
	parent.parentNode.removeChild(parent);
};
