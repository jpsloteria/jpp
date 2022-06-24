
function chances_CheckRefresh(par) {
    var refreshDate = getRefreshDate('chances');
    if (refreshDate && sessionStorage['chancesDateUpdated'] != refreshDate) {
        sessionStorage['chancesDateUpdated'] = refreshDate;
        sessionStorage.removeItem('getRecentsChancesSorteosObject');
        sessionStorage.removeItem('getChancesLastObject');
        sessionStorage.removeItem('getChancesLastSorteosObject');
        return true;
    } else {
        return false;
    }
}

function getRecentsChancesSorteos(request) {
    var localO = sessionStorage['getRecentsChancesSorteosObject'];
    //if (!localO) {
    if(request == 'server'){

      var token_api = localStorage.getItem('token_api_integrations');
      var settings = {
        "url": integrations_api_url_new+"/api/App/chances/page",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+token_api,
        },
      };

      jQuery.ajax(settings).done(function (data) {
        jQuery('.otros_resultado.chances .dropdown ul li').remove();
        console.log("GET chances/function/recent done");

        sessionStorage.setItem('getRecentsChancesSorteosObject', JSON.stringify(data));

        for (var i = 0; i < data.length; i++) {
            var li = jQuery('<li role="presentation"></li>');
            var a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/chances?sorteoId=' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</a>');

            a.click(getSorteo);
            li.append(a);
            jQuery('.otros_resultado.chances .dropdown ul').append(li);
        }
      });
      jQuery.ajax(settings).fail(function (response) {
        console.log("Get chances recent sorteos fail: " + errorThrown);
      });

    }
    else {
        jQuery('.otros_resultado.chances .dropdown ul li').remove();
        console.log("GET LOCAL chances/function/recent done");

        var dataStr = sessionStorage.getItem('getRecentsChancesSorteosObject');
        var data = JSON.parse(dataStr);

        for (var i = 0; i < data.length; i++) {
            var li = jQuery('<li role="presentation"></li>');
            var a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/chances?sorteoId=' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</a>');

            a.click(getSorteo);
            li.append(a);
            jQuery('.otros_resultado.chances .dropdown ul').append(li);
        }
    }
}

function getChancesBySorteoId(id) {

    jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').css('opacity', 0);

    var token_api = localStorage.getItem('token_api_integrations');
    var settings = {
      "url": integrations_api_url_new+"/api/App/chances/"+id,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token_api,
      },
    };

    jQuery.ajax(settings).done(function (data) {


              jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').css('opacity', 1);
              console.log("GET chances/function/last done");
              if (data != null) {
                  mostrarChancesSorteo(jQuery(".detail_ultimoSorteo.chances"), data);
                  if (jQuery('body').hasClass('page-node-29')) {
                      window.premiosId = data;
                      getInfopremios(id);
                      jQuery('.chances .sorteo_pdf_0').attr('href', 'http://www.jps.go.cr/Listas/PremiosEspeciales/Popular/' + data.numeroSorteo + '.pdf');
                  }
                  jQuery('.detail_ultimoSorteo').css('opacity', 1);
                  jQuery('.not-front.page-node-29 .sorteos_anteriores.loteria').css('opacity', 1);
                  jQuery('.page-node-29 .loading').hide();
                  jQuery('.page-node-29 .consultar_premios').css('opacity', 1);

              } else {

                  jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');

              }
    });
    jQuery.ajax(settings).fail(function (response) {
      jQuery('.page-node-29 .loading').hide();
      jQuery('.detail_ultimoSorteo').css('opacity', 1);
      jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').css('opacity', 1);
      console.log("Get sorteobyId fail: " + errorThrown);
      jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

    });


}

function getChancesLast(par, request) {
    jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').css('opacity', 0);

    var localO = sessionStorage['getChancesLastObject'];
    //if (!localO) {
        if(request == 'server'){


          var token_api = localStorage.getItem('token_api_integrations');
          var settings = {
            "url": integrations_api_url_new+"/api/App/chances/last",
            "method": "GET",
            "timeout": 0,
            "headers": {
              "Authorization": "Bearer "+token_api,
            },
          };

          jQuery.ajax(settings).done(function (data) {
            jQuery('.page-node-29 .loading').hide();
            jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').css('opacity', 1);
            console.log("GET chances/function/last done");
            if (data != null) {
                sessionStorage.setItem('getChancesLastObject', JSON.stringify(data));
                if (par == null || par == "") {
                    jQuery('.consultar_premios.chances .form button').attr('data-id', data.numeroSorteo);
                    mostrarChancesSorteo(jQuery(".detail_ultimoSorteo.chances"), data);
                } else {
                    jQuery('.consultar_premios.chances .form button').attr('data-id', par);
                    mostrarChancesSorteo(jQuery(".front .detail_ultimoSorteo.chances"), data);
                }
                if (jQuery('body').hasClass('page-node-29')) {
                    window.premios = data;
                    getInfopremios(data.numeroSorteo);
                }
                mostrarChancesSorteo(jQuery(".sorteo_detail.chances"), data);
                if (par == null || par == "") {
                    jQuery('.page-node-29 .loading').hide();
                    jQuery('.chances .sorteo_pdf_0').attr('href', 'http://www.jps.go.cr/Listas/PremiosEspeciales/Popular/' + data.numeroSorteo + '.pdf');
                    jQuery('.detail_ultimoSorteo').css('opacity', 1);
                    jQuery('.page-node-29 .consultar_premios').css('opacity', 1);
                }
            } else {
                jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
            }
            jQuery('.front .loading').hide();
          });
          jQuery.ajax(settings).fail(function (data) {
            jQuery('.page-node-29 .loading, .front .loading').hide();
            jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').css('opacity', 1);
            console.log("Get sorteo fail: " + errorThrown);
            jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

          });



    } else {

        console.log("GET LOCAL chances/function/last done");
        var data = JSON.parse(localO);

        if (par == null || par == "") {
            jQuery('.consultar_premios.chances .form button').attr('data-id', data.numeroSorteo);
            mostrarChancesSorteo(jQuery(".detail_ultimoSorteo.chances"), data);
        } else {
            jQuery('.consultar_premios.chances .form button').attr('data-id', par);
            mostrarChancesSorteo(jQuery(".front .detail_ultimoSorteo.chances"), data);
        }
        if (jQuery('body').hasClass('page-node-29')) {
            window.premios = data;
            getInfopremios(data.numeroSorteo);
        }
        mostrarChancesSorteo(jQuery(".sorteo_detail.chances"), data);
        if (par == null || par == "") {
            jQuery('.page-node-29 .loading').hide();
            jQuery('.chances .sorteo_pdf_0').attr('href', 'http://www.jps.go.cr/Listas/PremiosEspeciales/Popular/' + data.numeroSorteo + '.pdf');
            jQuery('.detail_ultimoSorteo').css('opacity', 1);
            jQuery('.page-node-29 .consultar_premios').css('opacity', 1);
        }
        jQuery('.front .loading').hide();
        jQuery('.not-front.page-node-29 #block-system-main, .front .sorteo_detail.chances, .quick_sorteo .sorteo_detail.chances').css('opacity', 1);
    }
}

function mostrarChancesSorteo($parent, sorteo) {
  if (jQuery('#div_consulta_sorteos_chances_1').length) {
    document.getElementById("div_consulta_sorteos_chances_1").innerHTML='';
  }
  if (jQuery('#div_consulta_sorteos_chances_2').length) {
    document.getElementById("div_consulta_sorteos_chances_2").innerHTML='';
  }
  if (jQuery('#div_consulta_sorteos_chances_3').length) {
    document.getElementById("div_consulta_sorteos_chances_3").innerHTML='';
  }
  if (jQuery('#div_consulta_sorteos_chances_4').length) {
    document.getElementById("div_consulta_sorteos_chances_4").innerHTML='';
  }


  jQuery('.detail_ultimoSorteo.loteria .sorteo_id_0').attr('data-id', sorteo.numeroSorteo);

  $parent.find('.sorteo_id_0').html('Sorteo ' + sorteo.numeroSorteo);

  $parent.find('.sorteo_fecha_0').html(formatFecha(sorteo.fecha));

  jQuery('.detail_ultimoSorteo.chances .sorteo_id_0').attr('data-id', sorteo.numeroSorteo);

  if (sorteo.vigencia != null) {
    var hoy = new Date();
    var hoy_dia = hoy.getDate();
    var hoy_mes = hoy.getMonth();
    var hoy_year = hoy.getFullYear();
    var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
    /////////
    var vigencia = new Date(sorteo.vigencia);
    var vigencia_dia = vigencia.getDate();
    var vigencia_mes = vigencia.getMonth();
    var vigencia_year = vigencia.getFullYear();
    var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

    if (hoy_format > vigencia_format) {
      alert('Sorteo caducado. Esta búsqueda se ofrece únicamente como historial de los sorteos.')
    }

    $parent.find('.sorteo_fecha_fin_0').html('Vigente hasta: ' + formatFecha(sorteo.vigencia));
  } else {
    $parent.find('.sorteo_fecha_fin_0').html('La caducidad está descrita en cada fracción');
  }

  for (var i = 0; i < sorteo.premios.length; i++) {
    if (sorteo.premios[i].tipo == 1) {
      var numero1 = parseInt(sorteo.premios[i].numero);
      var numeroStr1 = numero1.toString();
      if (numero1 < 10) {
        numeroStr1 = "0" + numero1.toString();
      }
      var serie1 = parseInt(sorteo.premios[i].serie);
      var serieStr1 = serie1.toString();
      if (serie1 < 100) {
        serieStr1 = "0" + serie1.toString();
      }

      document.getElementById("div_consulta_sorteos_chances_resultados_1").innerHTML='';
      jQuery('#div_consulta_sorteos_chances_1').append('<label>Primer Premio</label><br/><span class="numero primero_0">'+numeroStr1+'</span><span class="serie primero_0">'+serieStr1+'</span><span class="premio primero_0">'+currencyFormat(sorteo.premios[i].monto)+'</span><span class="premio_label premio_label_0">Por entero</span>');
      jQuery('#div_consulta_sorteos_chances_resultados_1').append('<br/><p style="margin:0">Primer Premio</p><div class="numero primero_0">'+numeroStr1+'</div><div class="serie primero_0">'+serieStr1+'</div><div class="premio primero_0">'+currencyFormat(sorteo.premios[i].monto)+'</div><div class="premio_label premio_label_0">Por entero</div>');

    }else if (sorteo.premios[i].tipo == 2) {
      var numero2 = parseInt(sorteo.premios[i].numero);
      var numeroStr2 = numero2.toString();
      if (numero2 < 10) {
        numeroStr2 = "0" + numero2.toString();
      }
      var serie2 = parseInt(sorteo.premios[i].serie);
      var serieStr2 = serie2.toString();
      if (serie2 < 100) {
        serieStr2 = "0" + serie2.toString();
      }

      document.getElementById("div_consulta_sorteos_chances_resultados_2").innerHTML='';
      jQuery('#div_consulta_sorteos_chances_2').append('<label>Segundo Premio</label><br/><span class="numero segundo_0">'+numeroStr2+'</span><span class="serie segundo_0">'+serieStr2+'</span><span class="premio segundo_0">'+currencyFormat(sorteo.premios[i].monto)+'</span><span class="premio_label premio_label_0">Por entero</span>');
      jQuery('#div_consulta_sorteos_chances_resultados_2').append('<br/><p style="margin:0">Segundo Premio</p><div class="numero segundo_0">'+numeroStr2+'</div><div class="serie segundo_0">'+serieStr2+'</div><div class="premio segundo_0">'+currencyFormat(sorteo.premios[i].monto)+'</div><div class="premio_label premio_label_0">Por entero</div>');

    }else if (sorteo.premios[i].tipo == 3) {
      var numero3 = parseInt(sorteo.premios[i].numero);
      var numeroStr3 = numero3.toString();
      if (numero3 < 10) {
        numeroStr3 = "0" + numero3.toString();
      }
      var serie3 = parseInt(sorteo.premios[i].serie);
      var serieStr3 = serie3.toString();
      if (serie3 < 100) {
        serieStr3 = "0" + serie3.toString();
      }

      document.getElementById("div_consulta_sorteos_chances_resultados_3").innerHTML='';
      jQuery('#div_consulta_sorteos_chances_3').append('<label>Tercer Premio</label><br/><span class="numero tercero_0">'+numeroStr3+'</span><span class="serie tercero_0">'+serieStr3+'</span><span class="premio tercero_0">'+currencyFormat(sorteo.premios[i].monto)+'</span><span class="premio_label premio_label_0">Por entero</span>');
      jQuery('#div_consulta_sorteos_chances_resultados_3').append('<br/><p style="margin:0">Tercer Premio</p><div class="numero tercero_0">'+numeroStr3+'</div><div class="serie tercero_0">'+serieStr3+'</div><div class="premio tercero_0">'+currencyFormat(sorteo.premios[i].monto)+'</div><div class="premio_label premio_label_0">Por entero</div>');

    }



  }
  for (var i = 0; i < sorteo.premios.length; i++) {
    if (sorteo.premios[i].IN_EsEspecial == true) {
      var numero4 = parseInt(sorteo.premios[i].numero);
      var numeroStr4 = numero4.toString();
      if (numero4 < 10) {
        numeroStr4 = "0" + numero4.toString();
      }
      var serie4 = parseInt(sorteo.premios[i].serie);
      var serieStr4 = serie4.toString();
      if (serie4 < 100) {
        serieStr4 = "0" + serie4.toString();
      }
      jQuery('#div_consulta_sorteos_chances_4').append('<label>Premio Especial</label><br/><span class="numero especial_0">'+numeroStr4+'</span><span class="serie especial_0">'+serieStr4+'</span><span class="premio especial_0">'+currencyFormat(sorteo.premios[i].monto)+'</span><span class="premio_label premio_label_0">Por entero</span>');
    }
  }

  function currencyFormat(num) {
    return '₡' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  $parent.find('.premio').priceFormat({
    prefix: '₡ ',
    centsSeparator: ',',
    thousandsSeparator: '.',
    centsLimit: 0
  });
  $parent.find('.premio_label_0').html('por entero');
  $parent.find('.front .numero').css('display', 'inline-block');

}

function getChancesLastSorteos(par, request) {
    jQuery('.not-front.page-node-29 .sorteos_anteriores.chances').css('opacity', 0);

    var localO = sessionStorage['getChancesLastSorteosObject'];
    //if (!localO) {
        if(request == 'server'){



          var token_api = localStorage.getItem('token_api_integrations');
          var settings = {
            "url": integrations_api_url_new+"/api/App/chances/page",
            "method": "GET",
            "timeout": 0,
            "headers": {
              "Authorization": "Bearer "+token_api,
            },
          };

          jQuery.ajax(settings).done(function (data) {
            console.log('chances ultimos sorteos done');

            sessionStorage.setItem('getChancesLastSorteosObject', JSON.stringify(data));

            for (var i = 0; i < data.length; i++) {

                var value = data[i].numeroSorteo;
                var id = par;
                if (id == value) {
                    if (data[i].vigencia != null) {
                      var hoy = new Date();
                      var hoy_dia = hoy.getDate();
                      var hoy_mes = hoy.getMonth();
                      var hoy_year = hoy.getFullYear();
                      var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                       /////////
                      var vigencia = new Date(data[i].vigencia);
                      var vigencia_dia = vigencia.getDate();
                      var vigencia_mes = vigencia.getMonth();
                      var vigencia_year = vigencia.getFullYear();
                      var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                      if (hoy_format > vigencia_format) {
                            var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                            jQuery('select#chancesOtrosSorteos').append(a);
                        } else {
                            var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                            jQuery('select#chancesOtrosSorteos').append(a);
                        }
                    } else {
                        var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#chancesOtrosSorteos').append(a);
                    }
                } else {
                    if (data[i].vigencia != null) {
                      var hoy = new Date();
                      var hoy_dia = hoy.getDate();
                      var hoy_mes = hoy.getMonth();
                      var hoy_year = hoy.getFullYear();
                      var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                       /////////
                      var vigencia = new Date(data[i].vigencia);
                      var vigencia_dia = vigencia.getDate();
                      var vigencia_mes = vigencia.getMonth();
                      var vigencia_year = vigencia.getFullYear();
                      var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                      if (hoy_format > vigencia_format) {
                            var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                            jQuery('select#chancesOtrosSorteos').append(b);
                        } else {
                            var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                            jQuery('select#chancesOtrosSorteos').append(b);
                        }
                    } else {
                        var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#chancesOtrosSorteos').append(b);
                    }

                }

            }

            jQuery('.not-front.page-node-29 .sorteos_anteriores.chances').css('opacity', 1);
          });
          jQuery.ajax(settings).fail(function (response) {
            jQuery('.not-front.page-node-29 .sorteos_anteriores.chances').css('opacity', 1);
            console.log("get chances ultimos sorteos fail: " + errorThrown);
            jQuery('.not-front.page-node-29 .sorteos_anteriores.chances').html('<h3>Error cargando datos de sorteos anteriores, favor intente recargar la página nuevamente.</h3>');

          });


    } else {
        jQuery('.not-front.page-node-29 .sorteos_anteriores.chances').css('opacity', 1);
        console.log('LOCAL chances ultimos sorteos done');

        var data = JSON.parse(localO);
        for (var i = 0; i < data.length; i++) {




            var value = data[i].numeroSorteo;
            var id = par;



            if (id == value) {
                if (data[i].vigencia != null) {
                  var hoy = new Date();
                  var hoy_dia = hoy.getDate();
                  var hoy_mes = hoy.getMonth();
                  var hoy_year = hoy.getFullYear();
                  var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                   /////////
                  var vigencia = new Date(data[i].vigencia);
                  var vigencia_dia = vigencia.getDate();
                  var vigencia_mes = vigencia.getMonth();
                  var vigencia_year = vigencia.getFullYear();
                  var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                  if (hoy_format > vigencia_format) {
                        var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#chancesOtrosSorteos').append(a);
                    } else {
                        var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#chancesOtrosSorteos').append(a);
                    }
                } else {
                    var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                    jQuery('select#chancesOtrosSorteos').append(a);
                }
            } else {
                if (data[i].vigencia != null) {
                  var hoy = new Date();
                  var hoy_dia = hoy.getDate();
                  var hoy_mes = hoy.getMonth();
                  var hoy_year = hoy.getFullYear();
                  var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                   /////////
                  var vigencia = new Date(data[i].vigencia);
                  var vigencia_dia = vigencia.getDate();
                  var vigencia_mes = vigencia.getMonth();
                  var vigencia_year = vigencia.getFullYear();
                  var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                  if (hoy_format > vigencia_format) {
                        var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#chancesOtrosSorteos').append(b);
                    } else {
                        var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#chancesOtrosSorteos').append(b);
                    }
                } else {
                    var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                    jQuery('select#chancesOtrosSorteos').append(b);
                }

            }

        }

        jQuery('.not-front.page-node-29 .sorteos_anteriores.chances').css('opacity', 1);
    }
}

jQuery(document).on('change', 'select#chancesOtrosSorteos', function () {

    var id = jQuery(this).find("option:selected").attr('value');
    getSorteo(id);
});

