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

//**** Lieferantenprofil - hide textfields, change buttons ****
var editProfilLieferant = function (value){
	var inputs = document.getElementsByClassName("profilTextfield_lieferant");
	var inputs_collapse = document.getElementsByClassName("profilTextfieldCollapse_lieferant");
	var inputs_size = document.getElementsByClassName("profil_element");
	
	for(var i = 0; i < inputs.length; i++) {
	    inputs[i].disabled = value;
	}
	if (value){
		document.getElementById("btn_profil_lieferant_edit").style.display="";
		document.getElementById("btn_profil_lieferant_save").style.display="none";
		for(var j = 0; j < inputs_collapse.length; j++) {
		    inputs_collapse[j].style.display="none";
		}
		for(var g = 0; g < inputs_size.length; g++) {
			inputs_size[g].style.height="300px";
		}
	}
	else{
		document.getElementById("btn_profil_lieferant_edit").style.display="none";
		document.getElementById("btn_profil_lieferant_save").style.display="";
		for(var k = 0; k < inputs_collapse.length; k++) {
		    inputs_collapse[k].style.display="";
		}
		for(var h = 0; h < inputs_size.length; h++) {
			inputs_size[h].style.height="400px";
		}
	}
};

//**** Kindprofil - hide textfields, change buttons ****
var editProfilKind = function (value){
	var inputs = document.getElementsByClassName("profilTextfield_kind");
	var inputs_collapse = document.getElementsByClassName("profilTextfieldCollapse_kind");
	
	for(var i = 0; i < inputs.length; i++) {
	    inputs[i].disabled = value;
	}
	if (value){
		document.getElementById("btn_profil_kind_edit").style.display="";
		document.getElementById("btn_profil_kind_save").style.display="none";
		for(var j = 0; j < inputs_collapse.length; j++) {
		    inputs_collapse[j].style.display="none";
		}
	}
	else{
		document.getElementById("btn_profil_kind_edit").style.display="none";
		document.getElementById("btn_profil_kind_save").style.display="";
		for(var k = 0; k < inputs_collapse.length; k++) {
		    inputs_collapse[k].style.display="";
		}
	}
};