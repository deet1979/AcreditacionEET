$(document).ready(onDocumentReady);

var p;
var search;

function onDocumentReady() {
	//localStorage.setItem('json', false);
	var ls = getData('json');
	if(ls) {
		console.log("localStorage");
		p = ls;
		fillRows();
	}
}

function fillRows() {
	$('body').empty();
	var count = 0;
	$('body').append('<a href="javascript:void(0);" onclick="window.history.go(-1);">« Volver</a><br />');
	for(var i in p){
		if(p[i].ingreso){
			$('body').append(p[i].nombre+"<br />");
			count++;
		}
	}
}

function getData(key) {
	var ls = localStorage.getItem(key);
	return JSON.parse(ls);
}