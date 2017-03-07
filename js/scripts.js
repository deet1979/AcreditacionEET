$(document).ready(onDocumentReady);

var p;
var search;

function onDocumentReady() {
	//localStorage.setItem('json', false);
	var ls = getData('json');
	$('#searchForm #word').on("keyup", onKeyUp);
	if(ls) {
		console.log("localStorage");
		p = ls;
		fillRows();
	} else {
		console.log("$.getJSON");
		$.getJSON('./assets/ACREDITACIONES.json', {}, function(data) {
			console.log(data.personas);
			p = data.personas;
			localStorage.setItem('json', JSON.stringify(p));
			saveData('json', p);
			fillRows();
		});
	}
}

function onKeyUp() {
	var w = $('#searchForm #word').val();
	for(var i in p) {
		var n = p[i].nombre;
		var r = $('.trow-'+i);
		if(n.toLowerCase().indexOf( w.toLowerCase() ) > -1) {
			r.removeClass('hidden');
		} else {
			r.addClass('hidden');
		}
	}
	return false;
}

function fillRows() {
	$('#searchForm #word').val("");
	$('.trow').off("click", onClickTrow);
	$('#personas > tbody').empty();
	var count = 0;
	for(var i in p){
		if(p[i].ingreso){
			count++;
		}
		var rclass = (p[i].ingreso) ? ' success' : '';
		$('#personas > tbody').append('<tr id="tr-'+i+'" class="trow trow-'+i+rclass+'"><td>'+p[i].nombre+'</td></tr>');
	}
	$('.info-ingresos').html('ACREDITADOS: ' + count);
	$('.trow').on("click", onClickTrow);
}

function onClickTrow() {
	var id = $(this).attr('id').substr(3);
	console.log(id);
	if($(this).hasClass('success')){
		$(this).addClass('danger');
		if(confirm("¿Desmarcar esta fila?")){
			$(this).removeClass('danger');
			$(this).removeClass('success');
			p[id].ingreso = false;
			saveData('json', p);
			fillRows();
		} else {
			$(this).removeClass('danger');
		}
	} else {
		$(this).addClass('warning');
		if(confirm("¿Marcar esta fila?")){
			$(this).removeClass('warning');
			$(this).addClass('success');
			p[id].ingreso = true;
			saveData('json', p);
			fillRows();
		} else {
			$(this).removeClass('warning');
		}
	}
}

function getData(key) {
	var ls = localStorage.getItem(key);
	return JSON.parse(ls);
}

function saveData(key, string) {
	localStorage.setItem(key, JSON.stringify(string));
}