function tresMonazos_CheckRefresh(par, refreshItem) {
    if (sessionStorage['tresMonazosDateUpdated'] != refreshItem.date) {
        sessionStorage['tresMonazosDateUpdated'] = refreshItem.date;
        return true;
    } else {
        return false;
    }
}

function getRecentsTresMonazosSorteos(request) {

  if (request == 'server') {
  var token_api = localStorage.getItem('token_api_integrations');
  var settings = {
    "url": integrations_api_url_new+"/api/App/tresmonazos/page",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer "+token_api,
    },
  };

  jQuery.ajax(settings).done(function (data) {
    //console.log(data);
    jQuery('.otros_resultado.tresMonazos .dropdown ul li').remove();
    console.log("GET tres_monazos/function/recent done");
    sessionStorage.setItem('getRecentsTresMonazosSorteosObject', JSON.stringify(data));
    for (var i = 0; i < data.length; i++) {
        var li = jQuery('<li role="presentation"></li>');
        var a = ""
        if (data[i].manana != null) {
            a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/3-monazos?sorteoId=' + data[i].manana.numeroSorteo + '">' + formatFecha(data[i].manana.fecha) + '</a>');
        }
        else if (data[i].mediaTarde != null)
        {
            a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/3-monazos?sorteoId=' + data[i].mediaTarde.numeroSorteo + '">' + formatFecha(data[i].mediaTarde.fecha) + '</a>');
        }
        else
        {
            a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/3-monazos?sorteoId=' + data[i].tarde.numeroSorteo + '">' + formatFecha(data[i].tarde.fecha) + '</a>');
        }

        a.click(getSorteo);
        li.append(a);
        jQuery('.otros_resultado.tresMonazos .dropdown ul').append(li);
    }
  });
  jQuery.ajax(settings).fail(function (response) {
    console.log("Get tres_monazos recent sorteos fail: " + errorThrown);
  });

    } else {
        jQuery('.otros_resultado.tresMonazos .dropdown ul li').remove();
        console.log("GET LOCAL tres_monazos/function/recent done");

        var dataStr = sessionStorage.getItem('getRecentsTresMonazosSorteosObject');

        var data = JSON.parse(dataStr);

        for (var i = 0; i < data.length; i++) {
            var li = jQuery('<li role="presentation"></li>');
            var a = ""
            if (data[i].manana != null) {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/3-monazos?sorteoId=' + data[i].manana.numeroSorteo + '">' + formatFecha(data[i].manana.fecha) + '</a>');
            } else if (data[i].mediaTarde != null) {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/3-monazos?sorteoId=' + data[i].mediaTarde.numeroSorteo + '">' + formatFecha(data[i].mediaTarde.fecha) + '</a>');
            } else {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/3-monazos?sorteoId=' + data[i].tarde.numeroSorteo + '">' + formatFecha(data[i].tarde.fecha) + '</a>');
            }

            a.click(getSorteo);
            li.append(a);
            jQuery('.otros_resultado.tresMonazos .dropdown ul').append(li);
        }
    }
}

function getTresMonazosBySorteoId(id) {
    //debugger;
    jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 0);

    var token_api = localStorage.getItem('token_api_integrations');
    var settings = {
      "url": integrations_api_url_new+"/api/App/tresmonazos/"+id,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token_api,
      },
    };

    jQuery.ajax(settings).done(function (data) {
      //console.log(data);
      jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 1);
      console.log("GET tres_monazos/function/last done");
      if (data != null) {
          mostrarTresMonazosSorteo(jQuery(".detail_ultimoSorteo.tresMonazos"), data);
      } else {
          jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
      }

      // Mostrar detalle y ocultar loading
      jQuery('.detail_ultimoSorteo, .consultar_premios.tresMonazos').css('opacity', 1);
      jQuery('.page-node-688 .loading').hide();
    });
    jQuery.ajax(settings).fail(function (response) {
      jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 1);
      console.log("Get sorteobyId fail: " + errorThrown);
      jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

      // Mostrar detalle y ocultar loading
      jQuery('.detail_ultimoSorteo, .consultar_premios.tresMonazos').css('opacity', 1);
      jQuery('.page-node-688 .loading').hide();
    });
}

function getTresMonazosLast(par, request) {
    jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 0);


    if (request == 'server') {
    var token_api = localStorage.getItem('token_api_integrations');
    var settings = {
      "url": integrations_api_url_new+"/api/App/tresmonazos/last",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token_api,
      },
    };

    jQuery.ajax(settings).done(function (data) {
      //console.log(data);
      console.log("GET tres_monazos/function/last done");

      jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 1);
      if (data != null) {
          sessionStorage.setItem('getTresMonazosLastObject', JSON.stringify(data));
          if (par == null || par == "") {
              mostrarTresMonazosSorteo(jQuery(".detail_ultimoSorteo.tresMonazos"), data);
              jQuery('.page-node-688 .loading').hide();
          } else {
              mostrarTresMonazosSorteo(jQuery(".front .detail_ultimoSorteo.tresMonazos"), data);
          }
          mostrarTresMonazosSorteo(jQuery(".sorteo_detail.tresMonazos"), data);

      } else {
          jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
      }

      // Mostrar detalle y ocultar loading
      jQuery('.detail_ultimoSorteo, .consultar_premios.tresMonazos').css('opacity', 1);
      jQuery('.page-node-688 .loading').hide();
      jQuery('.front .loading').hide();
    });
    jQuery.ajax(settings).fail(function (response) {
      console.log("Get sorteo fail: " + errorThrown);

      jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 1);
      jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

      // Mostrar detalle y ocultar loading
      jQuery('.detail_ultimoSorteo, .consultar_premios.tresMonazos').css('opacity', 1);
      jQuery('.page-node-688 .loading').hide();
      jQuery('.front .loading').hide();
    });



    } else {
        console.log("GET LOCAL tres_monazos/function/last done");

        jQuery('.not-front.page-node-688 #block-system-main, .front .sorteo_detail.tresMonazos, .quick_sorteo .sorteo_detail.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 1);
        var dataStr = sessionStorage.getItem('getTresMonazosLastObject');
        var data = JSON.parse(dataStr);
        if (par == null || par == "") {
            mostrarTresMonazosSorteo(jQuery(".detail_ultimoSorteo.tresMonazos"), data);
        } else {
            mostrarTresMonazosSorteo(jQuery(".front .detail_ultimoSorteo.tresMonazos"), data);
        }
        mostrarTresMonazosSorteo(jQuery(".sorteo_detail.tresMonazos"), data);

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo, .consultar_premios.tresMonazos').css('opacity', 1);
        jQuery('.front .loading').hide();
        jQuery('.page-node-688 .loading').hide();
    }
}

function mostrarTresMonazosSorteo($parent, sorteo) {
    var d = new Date();

    if (sorteo.manana != null) {
        d = new Date(sorteo.manana.fecha);
        $parent.find('.sorteo_id_0').html('Sorteo ' + sorteo.manana.numeroSorteo);
        $parent.find('.sorteo_fecha_0').html(formatFecha(sorteo.manana.fecha));

        if (sorteo.manana.vigencia != null) {
            var hoy = new Date();
            var vigencia = new Date(sorteo.manana.vigencia);

            if (hoy > vigencia) {
               // alert('Sorteo caducado. Esta búsqueda se ofrece únicamente como historial de los sorteos.')
            }
            $parent.find('.sorteo_fecha_fin_0').html('Vigente hasta: ' + formatFecha(sorteo.manana.vigencia));
        } else {
            $parent.find('.sorteo_fecha_fin_0').html('');
        }

        $parent.find('.div_premio.manana').show();
        $parent.find('.div_premio.manana').html("<h2>Sorteo " + sorteo.manana.numeroSorteo+" - Mediodía</h2><span class='numero primero1'></span><span class='numero primero2'></span><span class='numero primero3'></span>");
       var numeros =  JSON.parse("[" + sorteo.manana.numeros + "]");
       var numeroStr1 = numeros[0];
       var numeroStr2 = numeros[1];
       var numeroStr3 = numeros[2];

        $parent.find('.numero.primero1').html(numeroStr1);
        $parent.find('.numero.primero2').html(numeroStr2);
        $parent.find('.numero.primero3').html(numeroStr3);



    } else {
        $parent.find('.div_premio.manana').hide();
    }

    if (sorteo.mediaTarde != null) {
        d = new Date(sorteo.mediaTarde.fecha);
        $parent.find('.sorteo_id_1').html('Sorteo ' + sorteo.mediaTarde.numeroSorteo);
        $parent.find('.sorteo_fecha_0').html(formatFecha(sorteo.mediaTarde.fecha));

        if (sorteo.mediaTarde.vigencia != null) {
            var hoy = new Date();
            var vigencia = new Date(sorteo.mediaTarde.vigencia);

            if (hoy > vigencia) {
               // alert('Sorteo caducado. Esta búsqueda se ofrece únicamente como historial de los sorteos.')
            }
            $parent.find('.sorteo_fecha_fin_0').html('Vigente hasta: ' + formatFecha(sorteo.mediaTarde.vigencia));
        } else {
            $parent.find('.sorteo_fecha_fin_0').html('La caducidad está descrita en cada fracción');
        }

        $parent.find('.div_premio.mediaTarde').show();


            $parent.find('.div_premio.mediaTarde').html("<h2>Sorteo " + sorteo.mediaTarde.numeroSorteo+" - Tarde</h2><span class='numero segundo1'></span><span class='numero segundo2'></span><span class='numero segundo3'></span>");



            var numeros =  JSON.parse("[" + sorteo.mediaTarde.numeros + "]");
            var numeroStr1 = numeros[0];
            var numeroStr2 = numeros[1];
            var numeroStr3 = numeros[2];

            $parent.find('.numero.segundo1').html(numeroStr1);
            $parent.find('.numero.segundo2').html(numeroStr2);
            $parent.find('.numero.segundo3').html(numeroStr3);


    } else {
        $parent.find('.div_premio.mediaTarde').hide();
    }

    if (sorteo.tarde != null) {
        d = new Date(sorteo.tarde.fecha);
        $parent.find('.sorteo_id_2').html('Sorteo ' + sorteo.tarde.numeroSorteo);
        $parent.find('.sorteo_fecha_0').html(formatFecha(sorteo.tarde.fecha));

        if (sorteo.tarde.vigencia != null) {
            var hoy = new Date();
            var vigencia = new Date(sorteo.tarde.vigencia);

            if (hoy > vigencia) {
               // alert('Sorteo caducado. Esta búsqueda se ofrece únicamente como historial de los sorteos.')
            }
            $parent.find('.sorteo_fecha_fin_0').html('Vigente hasta: ' + formatFecha(sorteo.tarde.vigencia));
        } else {
            $parent.find('.sorteo_fecha_fin_0').html('La caducidad está descrita en cada fracción');
        }

        $parent.find('.div_premio.tarde').show();


            $parent.find('.div_premio.tarde').html("<h2>Sorteo " + sorteo.tarde.numeroSorteo+" - Noche</h2><span class='numero tercero1'></span><span class='numero tercero2'></span><span class='numero tercero3'></span>");



            var numeros =  JSON.parse("[" + sorteo.tarde.numeros + "]");
            var numeroStr1 = numeros[0];
            var numeroStr2 = numeros[1];
            var numeroStr3 = numeros[2];

            $parent.find('.numero.tercero1').html(numeroStr1);
            $parent.find('.numero.tercero2').html(numeroStr2);
            $parent.find('.numero.tercero3').html(numeroStr3);


    } else {
        $parent.find('.div_premio.tarde').hide();
    }

    $parent.find('.premio').priceFormat({
        prefix: '¢ ',
        centsSeparator: ',',
        thousandsSeparator: '.',
        centsLimit: 0
    });

    $parent.find('.premio_label_0').html('por entero');
    $parent.find('.front .numero').css('display', 'inline-block');

}

function getTresMonazosLastSorteos(par, request) {
    jQuery('.not-front.page-node-688 .sorteos_anteriores.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 0);

    if (request == 'server') {
    var token_api = localStorage.getItem('token_api_integrations');
    var settings = {
      "url": integrations_api_url_new+"/api/App/tresmonazos/page",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token_api,
      },
    };

    jQuery.ajax(settings).done(function (data) {
      //console.log(data);

          console.log('tresMonazos ultimos sorteos done ---');
          jQuery('.not-front.page-node-688 .sorteos_anteriores.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 1);

          sessionStorage.setItem('getTresMonazosLastSorteosObject', JSON.stringify(data));
          //console.log(data.length);
          for (var i = 0; i < data.length; i++) {
            //console.log(data[i].tarde);
              if (data[i] != null){

              }

              //Cambios
              if (data[i].tarde != null) {

                  var value = data[i].tarde.numeroSorteo;
                  var id = par;

                  if (id == value) {
                      if (data[i].tarde.vigencia != null) {
                          var hoy = new Date();
                          var vigencia = new Date(data[i].tarde.vigencia);

                          if (hoy > vigencia) {
                              var a = jQuery('<option selected="selected" value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(a);
                          } else {
                              var a = jQuery('<option selected="selected" value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(a);
                          }
                      } else {
                          var a = jQuery('<option selected="selected" value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                          jQuery('select#tresMonazosOtrosSorteos').append(a);
                      }

                  } else {
                      if (data[i].tarde.vigencia != null) {

                          var hoy = new Date();
                          var vigencia = new Date(data[i].tarde.vigencia);

                          if (hoy > vigencia) {
                              var b = jQuery('<option value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(b);

                          } else {
                              var b = jQuery('<option value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(b);

                          }
                      } else {
                          var b = jQuery('<option value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                          jQuery('select#tresMonazosOtrosSorteos').append(b);
                      }

                  }
              } else if (data[i].mediaTarde != null) {
                  var value = data[i].mediaTarde.numeroSorteo;
                  var id = par;
                  if (id == value) {
                      if (data[i].mediaTarde.vigencia != null) {
                          var hoy = new Date();
                          var vigencia = new Date(data[i].mediaTarde.vigencia);

                          if (hoy > vigencia) {
                              var a = jQuery('<option selected="selected" value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(a);
                          } else {
                              var a = jQuery('<option selected="selected" value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(a);
                          }
                      } else {
                          var a = jQuery('<option selected="selected" value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                          jQuery('select#tresMonazosOtrosSorteos').append(a);
                      }

                  } else {
                      if (data[i].mediaTarde.vigencia != null) {
                          var hoy = new Date();
                          var vigencia = new Date(data[i].mediaTarde.vigencia);

                          if (hoy > vigencia) {
                              var b = jQuery('<option value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(b);
                          } else {
                              var b = jQuery('<option value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(b);
                          }
                      } else {
                          var b = jQuery('<option value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                          jQuery('select#tresMonazosOtrosSorteos').append(b);
                      }

                  }
              }
              else
              {
                  var value = data[i].manana.numeroSorteo;
                  var id = par;
                  if (id == value) {
                      if (data[i].manana.vigencia != null) {
                          var hoy = new Date();
                          var vigencia = new Date(data[i].manana.vigencia);

                          if (hoy > vigencia) {
                              var a = jQuery('<option selected="selected" value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].manana.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(a);
                          } else {
                              var a = jQuery('<option selected="selected" value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(a);
                          }
                      } else {
                          var a = jQuery('<option selected="selected" value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                          jQuery('select#tresMonazosOtrosSorteos').append(a);
                      }

                  } else {
                      if (data[i].manana.vigencia != null) {
                          var hoy = new Date();
                          var vigencia = new Date(data[i].manana.vigencia);

                          if (hoy > vigencia) {
                              var b = jQuery('<option value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].manana.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(b);
                          } else {
                              var b = jQuery('<option value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                              jQuery('select#tresMonazosOtrosSorteos').append(b);
                          }
                      } else {
                          var b = jQuery('<option value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                          jQuery('select#tresMonazosOtrosSorteos').append(b);
                      }

                  }
              }
              //Fin Cambios

          }



    });

    jQuery.ajax(settings).fail(function (data) {
      jQuery('.not-front.page-node-688 .sorteos_anteriores.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 1);
      console.log("Get tresMonazos sorteos fail: " + errorThrown);
      jQuery('.not-front.page-node-688 .sorteos_anteriores.tresMonazos').html('<h3>Error cargando datos de sorteos anteriores, favor intente recargar la página nuevamente.</h3>');

    });


    } else {
        console.log('LOCAL tresMonazos ultimos sorteos done');
        jQuery('.not-front.page-node-688 .sorteos_anteriores.tresMonazos, .consultar_premios.tresMonazos').css('opacity', 1);

        var dataStr = sessionStorage.getItem('getTresMonazosLastSorteosObject');

        var data = JSON.parse(dataStr);

        for (var i = 0; i < data.length; i++) {

            if (data[i].tarde != null) {
                var value = data[i].tarde.numeroSorteo;
                var id = par;
                if (id == value) {
                    if (data[i].tarde.vigencia != null) {
                        var hoy = new Date();
                        var vigencia = new Date(data[i].tarde.vigencia);

                        if (hoy > vigencia) {
                            var a = jQuery('<option selected="selected" value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(a);
                        } else {
                            var a = jQuery('<option selected="selected" value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(a);
                        }
                    }



                } else {

                    if (data[i].tarde.vigencia != null) {
                        var hoy = new Date();
                        var vigencia = new Date(data[i].tarde.vigencia);

                        if (hoy > vigencia) {
                            var b = jQuery('<option value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(b);
                        } else {
                            var b = jQuery('<option value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(b);
                        }
                    }

                }

            } else if (data[i].mediaTarde != null) {
                var value = data[i].mediaTarde.numeroSorteo;
                var id = par;
                if (id == value) {
                    if (data[i].mediaTarde.vigencia != null) {
                        var hoy = new Date();
                        var vigencia = new Date(data[i].mediaTarde.vigencia);

                        if (hoy > vigencia) {
                            var a = jQuery('<option selected="selected" value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(a);
                        } else {
                            var a = jQuery('<option selected="selected" value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(a);
                        }
                    }



                } else {

                    if (data[i].mediaTarde.vigencia != null) {
                        var hoy = new Date();
                        var vigencia = new Date(data[i].mediaTarde.vigencia);

                        if (hoy > vigencia) {
                            var b = jQuery('<option value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(b);
                        } else {
                            var b = jQuery('<option value="' + data[i].mediaTarde.numeroSorteo + '">' + data[i].mediaTarde.numeroSorteo + ' - ' + formatFecha(data[i].mediaTarde.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(b);
                        }
                    }

                }

            }

            else {
                var value = data[i].manana.numeroSorteo;
                var id = par;
                if (id == value) {
                    if (data[i].manana.vigencia != null) {
                        var hoy = new Date();
                        var vigencia = new Date(data[i].manana.vigencia);

                        if (hoy > vigencia) {
                            var a = jQuery('<option selected="selected" value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].manana.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(a);
                        } else {
                            var a = jQuery('<option selected="selected" value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(a);
                        }
                    }ç

                } else {

                    if (data[i].manana.vigencia != null) {
                        var hoy = new Date();
                        var vigencia = new Date(data[i].manana.vigencia);

                        if (hoy > vigencia) {

                            var b = jQuery('<option value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].manana.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(b);

                        } else {

                            var b = jQuery('<option value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                            jQuery('select#tresMonazosOtrosSorteos').append(b);

                        }
                    }

                }
            }


        }
    }
}


jQuery(document).on('change', 'select#tresMonazosOtrosSorteos', function () {
    var id = jQuery(this).find("option:selected").attr('value');
    getSorteo(id);
});



/*jQuery(document).ready(function () {





});*/

