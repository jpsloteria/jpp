
var apiVersion = "API Client v1.1.18";

var api_url = "https://api.app.jps.go.cr/api/";
var api_key = 'aQhzlkTdEFL9k2TByJ1G';

var static_api_url = "http://static.app.jps.go.cr/api/";
var integrations_api_url = "https://integrations.jps.go.cr/api/";
var integrations_api_url_dev = "https://integrations.devapp.jps.go.cr/api/";
var integrations_api_url_new = "https://integration.jps.go.cr/";





var mes_validos = 2;

var pagesize = 20;

function gup(name, context) // 'get parameter names'
{
if (typeof context == "undefined") {
context = window.location.href;
}
name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
var regexS = "[\\?&]" + name + "=([^&#]*)";
var regex = new RegExp(regexS);
var results = regex.exec(context);
if (results == null)
return "";
else
return results[1];
}

function formatFecha(date) {

var current_date = new Date(date);

var month_names = new Array();
month_names[month_names.length] = "Enero";
month_names[month_names.length] = "Febrero";
month_names[month_names.length] = "Marzo";
month_names[month_names.length] = "Abril";
month_names[month_names.length] = "Mayo";
month_names[month_names.length] = "Junio";
month_names[month_names.length] = "Julio";
month_names[month_names.length] = "Agosto";
month_names[month_names.length] = "Setiembre";
month_names[month_names.length] = "Octubre";
month_names[month_names.length] = "Noviembre";
month_names[month_names.length] = "Diciembre";

var day_names = new Array();
day_names[day_names.length] = "Domingo";
day_names[day_names.length] = "Lunes";
day_names[day_names.length] = "Martes";
day_names[day_names.length] = "Miércoles";
day_names[day_names.length] = "Jueves";
day_names[day_names.length] = "Viernes";
day_names[day_names.length] = "Sábado";


return (day_names[current_date.getDay()] + ", " + current_date.getDate() + " de " + month_names[current_date.getMonth()] + " " + current_date.getFullYear());
}

function getSorteo(id) {

if (jQuery('body').hasClass('page-node-28')) {
window.location = "/productos/loteria-nacional?sorteoId=" + id;

} else if (jQuery('body').hasClass('page-node-29')) {
window.location = "/productos/chances?sorteoId=" + id;

} else if (jQuery('body').hasClass('page-node-30')) {
window.location = "/productos/tiempos?sorteoId=" + id;

} else if (jQuery('body').hasClass('page-node-307')) {
window.location = "/productos/loteria-instantanea?sorteoId=" + id;

} else if (jQuery('body').hasClass('page-node-32')) {
window.location = "/productos/lotto?sorteoId=" + id;

} else if (jQuery('body').hasClass('page-node-33')) {
window.location = "/productos/nuevos-tiempos?sorteoId=" + id;

} else if (jQuery('body').hasClass('page-node-39')) {
window.location = "/productos/rueda-fortuna?sorteoId=" + id;

} else if (jQuery('body').hasClass('page-node-688')) {
window.location = "/productos/3-monazos?sorteoId=" + id;
}
}

function formatJsonDate(jsonDate) {

var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
];

var myNewDate = new Date(jsonDate);
return (myNewDate.getDate() + " " + monthNames[myNewDate.getMonth()] + ", " + myNewDate.getFullYear());
}

function calcularPremio( numero, serie, fraccion, ultimo_sorteo_id, par ) {

var data = window.premios;
if (par != null && par != "") {
data = window.premiosId;
}




jQuery('.loteria .submit').html('Buscando ...');
jQuery('.loading-consultar').show();

if (data.tipoSorteo_Id == 1) {
tipoSorteo = 'N';
}

if (data.tipoSorteo_Id == 2) {
tipoSorteo = 'P';
}


verificar_premio( tipoSorteo, data.numeroSorteo, numero, serie, fraccion, data );

jQuery('.loteria .submit').html('Calcular');

}

function setLabels() {
jQuery('.loading-consultar').hide();
if (jQuery('.resultado_mensaje strong').html() == "") {
jQuery('.resultado_mensaje strong, .resultado_mensaje .premios_ganados').show();
jQuery('.resultado_mensaje strong').html("No ha resultado ganador con ese número y serie. Gracias por participar y colaborar con la Junta de Protección Social, siga ayudando a la JPS.");
jQuery('.resultado_mensaje .premios_ganados li').remove();
}
}

function refrescar() {

  alert('test');

  console.log(refrescar);
// getSorteo(par);
// window.location.replace(windo;w.location.pathname + window.location.search + window.location.hash);
  // alert(window.location.href );
// location.reload(window.location.href);

}



function verificar_premio(tipoSorteo, sorteo, numero, serie, fraccion, data) {




jQuery('.loteria .submit').attr("disabled", "disabled");


var estado = false;


jQuery.ajax({
type: "GET",
url: integrations_api_url + "Sorteos/GetSorteoDevuelvePremios?TipoLoteria="+ tipoSorteo +"&NumeroSorteo="+ sorteo +"&Serie="+ serie +"&Numero=" + numero,
crossDomain: true,
dataType: 'json',
async: false,
headers: {
//'X-Loteria-ApiKey': api_key
}

}).done(function (response, textStatus, jqXHR) {

var text = '';

if( response.result.length > 0 ) {


text += "¡Felicidades!<br>Usted ha sido ganador de los siguientes premios con el número " + numero + " y la serie " + serie + ":<br>";

if (montoGanado > 2000000) {
text += "Al ser un monto de premio superior a los 2,000,000.00 de colones, debe brindar su número de cuenta cliente al presentarse en la JPS.<br>";
}

for (var i = 0; i < response.result.length; i++) {

var montoGanado = response.result[i].MontoUnitario * fraccion;
text +=  '<h3>' +  etiquetaPremio( response.result[i].TipoPremio, response.result[i].SubPremio, response.result[i].Descripcion )  + '</h3>' ;
text +=  '<span class="moneda">' + montoGanado + '</span><br><br>';

}

// console.log(response);

jQuery('.resultado_mensaje').html(  text  );

jQuery('.moneda').priceFormat({
prefix: '₡ ',
centsSeparator: ',',
thousandsSeparator: '.',
centsLimit: 0
});


} else {

text +=  '<p>No ha resultado ganador con ese número y serie. Gracias por participar y colaborar con la Junta de Protección Social, siga ayudando a la JPS.</p>' ;
jQuery('.resultado_mensaje').html(  text  );

}


}).fail(function (jqXHR, textStatus, errorThrown) {

});

jQuery('.loteria .submit').removeAttr("disabled");

return estado;

}


// Inicio etiquetaPremio
function etiquetaPremio(premioTipo, subPremio, premioStr) {

// console.log(premioTipo);
// console.log(subPremio);
//textStatus


if (premioTipo == 1 ) {

if( subPremio == 0) {
premioStr = 'Premio Mayor';
}

if( subPremio == 1) {
premioStr = 'Aproximación Anterior';
}

if( subPremio == 2) {
premioStr = 'Aproximación Posterior';
}

if( subPremio == 3) {
premioStr = 'Serie igual al mayor';
}

if( subPremio == 4) {
premioStr = 'Número igual al mayor';
}

if( subPremio == 5) {
premioStr = 'Terminación';
}

if( subPremio == 6) {
premioStr = 'Inverso';
}

} else if (premioTipo == 2 ) {

if( subPremio == 0) {
premioStr = 'Segundo Premio';
}

if( subPremio == 4) {
premioStr = 'Igual al Segundo';
}

if( subPremio == 6) {
premioStr = 'Inverso del Segundo';
}

} else if (premioTipo == 3  ) {


if( subPremio == 0) {
premioStr = 'Tercer Premio';
}

if( subPremio == 4) {
premioStr = 'Número igual al Tercero';
}

if( subPremio == 6) {
premioStr = 'Inverso del Tercero';
}

} else  {
premioStr = premioStr;
}

return premioStr;
} // Fin etiquetaPremio



function montoGanado(premio, fraccion, numero, serie, data) {

var premioStr = "";
var montoPremio = 0;

var infopremios = window.infopremios;

var fraccionesTotal = infopremios.Fracciones;
if (premio == "PremioNormal") {
for (var i = 0; i < data.premios.length; i++) {
if (data.premios[i].numero == numero && data.premios[i].serie == serie) {
montoPremio = data.premios[i].monto;
premioStr = 'Premio Directo';
var montoFraccion = montoPremio / fraccionesTotal;
var montoGanado = montoFraccion * fraccion;

var texto = "¡Felicidades!<br>Usted ha sido ganador de los siguientes premios con el número " + numero + " y la serie " + serie + ":<br>";

if (montoGanado > 2000000) {
texto += "Al ser un monto de premio superior a los 2,000,000.00 de colones, debe brindar su número de cuenta cliente al presentarse en la JPS.<br>";
}

jQuery('.resultado_mensaje strong').html(texto);

var li = jQuery('<li>' + premioStr + ': ' + '</li>');
var span = jQuery('<br><span>' + montoGanado + '</span>');
li.append(span);

span.priceFormat({
prefix: '₡ ',
centsSeparator: ',',
thousandsSeparator: '.',
centsLimit: 0
});

jQuery('.resultado_mensaje .premios_ganados').append(li);
jQuery('.resultado_mensaje strong, .resultado_mensaje .premios_ganados').show();
return;
}
}
} else {

switch (premio) {
case 'PremioMayor':
montoPremio = infopremios.PremioMayor;
premioStr = 'Premio Mayor';
break;

case 'PremioSegundo':
montoPremio = infopremios.PremioSegundo;
premioStr = 'Segundo Premio';
break;

case 'PremioTercero':
montoPremio = infopremios.PremioTercero;
premioStr = 'Tercer Premio';
break;

case 'Inverso':
montoPremio = infopremios.Inverso;
premioStr = 'Inverso del Primero';
break;

case 'InversoSegundo':
montoPremio = infopremios.InversoSegundo;
premioStr = 'Inverso del Segundo';
break;

case 'InversoTercero':
montoPremio = infopremios.InversoTercero;
premioStr = 'Inverso del Tercero';
break;

case 'Terminacion':
montoPremio = infopremios.Terminacion;
premioStr = 'Terminación';
break;

case 'NumeroIgualMayor':
montoPremio = infopremios.NumeroIgualMayor;
premioStr = 'Número igual al Mayor';
break;

case 'NumeroIgualSegundo':
montoPremio = infopremios.NumeroIgualSegundo;
premioStr = 'Número igual al Segundo';
break;

case 'NumeroIgualTercero':
montoPremio = infopremios.NumeroIgualTercero;
premioStr = 'Número igual al Tercero';
break;

case 'SerieIgualMayor':
montoPremio = infopremios.SerieIgualMayor;
premioStr = 'Serie igual al Mayor';
break;

case 'AproximacionAnterior':
montoPremio = infopremios.AproximacionAnterior;
premioStr = 'Aproximación anterior al Mayor';
break;

case 'AproximacionPosterior':
montoPremio = infopremios.AproximacionPosterior;
premioStr = 'Aproximacion posterior al Mayor';
break;

default:
break;
}

var montoFraccion = montoPremio / fraccionesTotal;
var montoGanado = montoFraccion * fraccion;
if (montoGanado > 0) {
var texto = "¡Felicidades!<br>Usted ha sido ganador de los siguientes premios con el número " + numero + " y la serie " + serie + ":<br>";
if (montoGanado > 2000000) {
texto += "<i>Al ser un monto de premio superior a los 2,000,000.00 de colones, debe brindar su número de cuenta cliente al presentarse en la JPS.</i><br>";
}
jQuery('.resultado_mensaje strong').html(texto);

var li = jQuery('<li>' + premioStr + ': ' + '</li>');
var span = jQuery('<br><span>' + montoGanado + '</span>');
li.append(span);

span.priceFormat({
prefix: '₡ ',
centsSeparator: ',',
thousandsSeparator: '.',
centsLimit: 0
});

jQuery('.resultado_mensaje .premios_ganados').append(li);
jQuery('.resultado_mensaje strong, .resultado_mensaje .premios_ganados').show();
}
}
}

function confirmar() {
    // location.reload();

   if ( jQuery('.consultar_premios #number').val() != "" && jQuery('.consultar_premios #serie').val() != "" ) {

    var par = gup('sorteoId');
    // if (jQuery('input#serie').val() != "" && jQuery('input#number').val() != "" && jQuery('input#fraccion').val() != "") {
    jQuery('.resultado_mensaje strong, .resultado_mensaje .premios_ganados').hide();
    var id = jQuery('.consultar_premios .form button').data('id');
    jQuery('.loading-consultar').show();

    var numero = parseInt(jQuery('.consultar_premios #number').val());
    var serie = parseInt(jQuery('.consultar_premios #serie').val());
    var fraccion = parseInt(jQuery('.consultar_premios #fraccion').val());

     // alert( numero + ' - ' + serie + ' - ' + fraccion+ ' - ' + par);
    jQuery('.resultado_mensaje strong').html("");
    jQuery('.resultado_mensaje .premios_ganados li').remove();

    calcularPremio(numero, serie, fraccion, id, par);

    jQuery('.consultar_premios #number').prop('disabled', true);
    jQuery('.consultar_premios #serie').prop('disabled', true);
    jQuery('.consultar_premios #fraccion').prop('disabled', true);
    jQuery('.accion').html("");
    jQuery("#ref").show();

} else {

     var id = jQuery('.consultar_premios .form button').data('id');
     jQuery('.loading-consultar').show();

}

}



function numeroInverted(numero) {
var numeroStr = numero.toString();

var str1 = numeroStr.substring(0, 1);
var str2 = "";

if (numeroStr.length <= 1) {
str2 = str1;
str1 = "0";
} else {
str2 = numeroStr.substring(1, 2);
}

var result = str2 + str1;
return result;
}

