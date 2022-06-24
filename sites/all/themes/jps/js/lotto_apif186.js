function lotto_init() {
    window.lotto_panel = jQuery('.not-front.page-node-32 #block-system-main, .front .sorteo_detail.lotto, .quick_sorteo .sorteo_detail.lotto');
}

function lotto_CheckRefresh(par, refreshItem) {
    if (sessionStorage['lottoDateUpdated'] != refreshItem.date) {
        sessionStorage['lottoDateUpdated'] = refreshItem.date;
        sessionStorage.removeItem('getLottoLastObject');
        sessionStorage.removeItem('getRecentsLottoSorteosObject');
        sessionStorage.removeItem('getLottoLastSorteosObject');
        return true;
    } else {
        return false;
    }
}
function getRecentsLottoSorteos(request) {
    var localO = sessionStorage['getRecentsLottoSorteosObject'];
    //if (!localO) {
    if (request == 'server') {


      var token_api = localStorage.getItem('token_api_integrations');
      var settings = {
        "url": integrations_api_url_new+"/api/App/lotto/page",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+token_api,
        },
      };

      jQuery.ajax(settings).done(function (data) {
        //console.log(data);
        jQuery('.otros_resultado.lotto .dropdown ul li').remove();
        console.log("GET lotto/function/recent done");

        sessionStorage.setItem('getRecentsLottoSorteosObject', JSON.stringify(data));

        for (var i = 0; i < data.length; i++) {
            var li = jQuery('<li role="presentation"></li>');
            var a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/lotto?sorteoId=' + data[i].numeroSorteo + '">' + formatFecha(data[i].fecha) + '</a>');

            a.click(getSorteo);
            li.append(a);
            jQuery('.otros_resultado.lotto .dropdown ul').append(li);
        }
      });
      jQuery.ajax(settings).fail(function (response) {
      console.log("Get lotto recent sorteos fail: " + errorThrown);
      });

    } else {
        jQuery('.otros_resultado.lotto .dropdown ul li').remove();
        console.log("GET LOCAL lotto/function/recent done");

        var data = JSON.parse(localO);
        for (var i = 0; i < data.length; i++) {
            var li = jQuery('<li role="presentation"></li>');
            var a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/lotto?sorteoId=' + data[i].numeroSorteo + '">' + formatFecha(data[i].fecha) + '</a>');

            a.click(getSorteo);
            li.append(a);
            jQuery('.otros_resultado.lotto .dropdown ul').append(li);
        }
    }
}

function getLottoBySorteoId(id) {
    lotto_panel.css('opacity', 0);

    var token_api = localStorage.getItem('token_api_integrations');
    var settings = {
      "url": integrations_api_url_new+"/api/App/lotto/"+id,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token_api,
      },
    };

    jQuery.ajax(settings).done(function (data) {
      //console.log(data);
      jQuery('.page-node-32 .loading').hide();
      jQuery('.detail_ultimoSorteo, .consultar_premios.lotto').css('opacity', 1);
      lotto_panel.css('opacity', 1);
      console.log("GET lotto/function/last done");
      if (data != null) {
          mostrarLottoSorteo(jQuery(".detail_ultimoSorteo.lotto"), data);
      } else {
          lotto_panel.html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
      }
    });
    jQuery.ajax(settings).fail(function (response) {
      jQuery('.page-node-32 .loading').hide();
      jQuery('.detail_ultimoSorteo, .consultar_premios.lotto').css('opacity', 1);
      lotto_panel.css('opacity', 1);
      console.log("Get sorteobyId fail: " + errorThrown);
      lotto_panel.html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');
    });


}

function getLottoLast(par, request) {
    lotto_panel.css('opacity', 0);

    var localO = sessionStorage['getLottoLastObject'];
    //if (!localO) {

    if (request == 'server') {

      var token_api = localStorage.getItem('token_api_integrations');
      var settings = {
        "url": integrations_api_url_new+"/api/App/lotto/last",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+token_api,
        },
      };

      jQuery.ajax(settings).done(function (data) {
        //console.log(data);
        console.log("GET lotto/function/last done");

        lotto_panel.css('opacity', 1);
        if (data != null) {
            sessionStorage.setItem('getLottoLastObject', JSON.stringify(data));
            if (par == null || par == "") {
                mostrarLottoSorteo(jQuery(".detail_ultimoSorteo.lotto"), data);
                jQuery('.page-node-32 .loading').hide();
            } else {
                mostrarLottoSorteo(jQuery(".front .detail_ultimoSorteo.lotto"), data);
            }
            mostrarLottoSorteo(jQuery(".sorteo_detail.lotto"), data);
        } else {
            lotto_panel.html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
        }

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo, .consultar_premios.lotto').css('opacity', 1);
        jQuery('.front .loading').hide();
        jQuery('.page-node-32 .loading').hide();
      });
      jQuery.ajax(settings).fail(function (data) {
        console.log("Get sorteo fail: " + errorThrown);

        lotto_panel.css('opacity', 1);
        lotto_panel.html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo, .consultar_premios.lotto').css('opacity', 1);
        jQuery('.page-node-32 .loading, .front .loading').hide();
      });

    } else {
        lotto_panel.css('opacity', 1);
        console.log("GET LOCAL lotto/function/last done");
        var data = JSON.parse(localO);

        if (par == null || par == "") {
            mostrarLottoSorteo(jQuery(".detail_ultimoSorteo.lotto"), data);
        } else {
            mostrarLottoSorteo(jQuery(".front .detail_ultimoSorteo.lotto"), data);
        }
        mostrarLottoSorteo(jQuery(".sorteo_detail.lotto"), data);

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo, .consultar_premios.lotto').css('opacity', 1);
        jQuery('.page-node-32 .loading').hide();
        jQuery('.front .loading').hide();
    }
}

function mostrarLottoSorteo($parent, sorteo) {
    $parent.find('.sorteo_id_0').html('Sorteo ' + sorteo.numeroSorteo);

    $parent.find('.sorteo_fecha_0').html(formatFecha(sorteo.fecha));

    if (sorteo.vigencia != null) {
        var hoy = new Date();
        var vigencia = new Date(sorteo.vigencia);

        if (hoy > vigencia) {
            alert('Sorteo caducado. Esta búsqueda se ofrece únicamente como historial de los sorteos.')
        }
        $parent.find('.sorteo_fecha_fin_0').html('Vigente hasta: ' + formatFecha(sorteo.vigencia));
    } else {
        $parent.find('.sorteo_fecha_fin_0').html('La caducidad está descrita en cada fracción');
    }

    console.log("ejemplo: "+sorteo.numeros[0]);
    var numero1 = parseInt(sorteo.numeros[0]);

    var numeroStr1 = numero1.toString();
    if (numero1 < 10) {
        numeroStr1 = "0" + numero1.toString();
    }

    var numero2 = parseInt(sorteo.numeros[1]);
    var numeroStr2 = numero2.toString();
    if (numero2 < 10) {
        numeroStr2 = "0" + numero2.toString();
    }

    var numero3 = parseInt(sorteo.numeros[2]);
    var numeroStr3 = numero3.toString();
    if (numero3 < 10) {
        numeroStr3 = "0" + numero3.toString();
    }

    var numero4 = parseInt(sorteo.numeros[3]);
    var numeroStr4 = numero4.toString();
    if (numero4 < 10) {
        numeroStr4 = "0" + numero4.toString();
    }

    var numero5 = parseInt(sorteo.numeros[4]);
    var numeroStr5 = numero5.toString();
    if (numero5 < 10) {
        numeroStr5 = "0" + numero5.toString();
    }

    $parent.find('.numero.primero_0').html(numeroStr1);
    $parent.find('.numero.segundo_0').html(numeroStr2);
    $parent.find('.numero.tercero_0').html(numeroStr3);
    $parent.find('.numero.cuarto_0').html(numeroStr4);
    $parent.find('.numero.quinto_0').html(numeroStr5);


    $parent.find('.premio.primero_0').html(parseInt(sorteo.premiosLotto.cincoAciertos));

    $parent.find('.premioLotto.segundo_0').html(parseInt(sorteo.premiosLotto.cuatroAciertos));
    $parent.find('.premioLotto.tercero_0').html(parseInt(sorteo.premiosLotto.tresAciertos));
    $parent.find('.premioLotto.cuarto_0').html(parseInt(sorteo.premiosLotto.dosAciertos));

    var acumuladoNext = parseInt(sorteo.premiosLotto.acumulado);

    if (acumuladoNext != null && acumuladoNext != 0 && acumuladoNext != "") {
        $parent.find('.premio.primero_next').html(parseInt(sorteo.premiosLotto.acumulado));
        $parent.find('#acumulado-next').show();
    }

    $parent.find('.premio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.',
        centsLimit: 0
    });

    $parent.find('.premioLotto').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.',
        centsLimit: 0
    });




    // Inicio revancha

        jQuery('.detail-lotto-revancha').hide();
        jQuery('.sidebar-lotto-revancha').hide();

        if ( sorteo.numerosRevancha != null)   {



        var numero1 = parseInt(sorteo.numerosRevancha[0]);
        var numeroStr1 = numero1.toString();
        if (numero1 < 10) {
            numeroStr1 = "0" + numero1.toString();
        }

        var numero2 = parseInt(sorteo.numerosRevancha[1]);
        var numeroStr2 = numero2.toString();
        if (numero2 < 10) {
            numeroStr2 = "0" + numero2.toString();
        }

        var numero3 = parseInt(sorteo.numerosRevancha[2]);
        var numeroStr3 = numero3.toString();
        if (numero3 < 10) {
            numeroStr3 = "0" + numero3.toString();
        }

        var numero4 = parseInt(sorteo.numerosRevancha[3]);
        var numeroStr4 = numero4.toString();
        if (numero4 < 10) {
            numeroStr4 = "0" + numero4.toString();
        }

        var numero5 = parseInt(sorteo.numerosRevancha[4]);
        var numeroStr5 = numero5.toString();
        if (numero5 < 10) {
            numeroStr5 = "0" + numero5.toString();
        }

        $parent.find('.numero.primero_0_revancha').html(numeroStr1);
        $parent.find('.numero.segundo_0_revancha').html(numeroStr2);
        $parent.find('.numero.tercero_0_revancha').html(numeroStr3);
        $parent.find('.numero.cuarto_0_revancha').html(numeroStr4);
        $parent.find('.numero.quinto_0_revancha').html(numeroStr5);


        $parent.find('.premioLotto.segundo_0_revancha').html(parseInt(sorteo.premiosLotto.cuatroAciertosRevancha));
        $parent.find('.premioLotto.tercero_0_revancha').html(parseInt(sorteo.premiosLotto.tresAciertosRevancha));
        $parent.find('.premioLotto.cuarto_0_revancha').html(parseInt(sorteo.premiosLotto.dosAciertosRevancha));

        $parent.find('.premio.primero_0_revancha').html(parseInt(sorteo.premiosLotto.cincoAciertosRevancha));

        jQuery('.detail-lotto-revancha').show();
        jQuery('.sidebar-lotto-revancha').show();



        var acumuladoNext = parseInt(sorteo.premiosLotto.acumuladoRevancha);



        if (acumuladoNext != null && acumuladoNext != 0 && acumuladoNext != "") {
            $parent.find('.premio.primero_next_revancha').html(parseInt(sorteo.premiosLotto.acumuladoRevancha));
            $parent.find('#acumulado-next_revancha').show();
        }


            $parent.find('.premio').priceFormat({
            prefix: '₡ ',
            centsSeparator: ',',
            thousandsSeparator: '.',
            centsLimit: 0
        });

        $parent.find('.premioLotto').priceFormat({
            prefix: '₡ ',
            centsSeparator: ',',
            thousandsSeparator: '.',
            centsLimit: 0
        });


        } // fin if revancha



    $parent.find('.front .numero').css('display', 'inline-block');

}

function getLottoLastSorteos(par, request) {
    jQuery('.not-front.page-node-32 .sorteos_anteriores.lotto, .consultar_premios.lotto').css('opacity', 0);

    var localO = sessionStorage['getLottoLastSorteosObject'];
    //if (!localO) {
    if (request == 'server') {

      var token_api = localStorage.getItem('token_api_integrations');
      var settings = {
        "url": integrations_api_url_new+"/api/App/lotto/page",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+token_api,
        },
      };

      jQuery.ajax(settings).done(function (data) {
        //console.log(data);
        console.log('lotto ultimos sorteos done');
        jQuery('.not-front.page-node-32 .sorteos_anteriores.lotto, .consultar_premios.lotto').css('opacity', 1);

        sessionStorage.setItem('getLottoLastSorteosObject', JSON.stringify(data));

        for (var i = 0; i < data.length; i++) {
            /*if (i < 4) {
             jQuery('.sorteos_anteriores.lotto .sorteo_id_' + i).html('Sorteo ' + data[i].numeroSorteo);

             jQuery('.sorteos_anteriores.lotto .sorteo_fecha_' + i).html(formatFecha(data[i].fecha));
             jQuery('.sorteos_anteriores.lotto .sorteo_fecha_' + i).attr('data-id', data[i].sorteo_Id);

             if (data[i].numeros == null) {
             jQuery('.sorteos_anteriores.lotto .sorteo' + i + ' .numero').css('background', 'transparent').html();
             jQuery('.sorteos_anteriores.lotto .sorteo' + i + ' .numero.primero_' + i).html('<p style="font-size: 12px; position:absolute">Error descargando los datos de este sorteo</p>');
             } else {
             var numero1 = parseInt(data[i].numeros[0]);
             var numeroStr1 = numero1.toString();
             if (numero1 < 10) {
             numeroStr1 = "0" + numero1.toString();
             }

             var numero2 = parseInt(data[i].numeros[1]);
             var numeroStr2 = numero2.toString();
             if (numero2 < 10) {
             numeroStr2 = "0" + numero2.toString();
             }

             var numero3 = parseInt(data[i].numeros[2]);
             var numeroStr3 = numero3.toString();
             if (numero3 < 10) {
             numeroStr3 = "0" + numero3.toString();
             }

             var numero4 = parseInt(data[i].numeros[3]);
             var numeroStr4 = numero4.toString();
             if (numero4 < 10) {
             numeroStr4 = "0" + numero4.toString();
             }

             var numero5 = parseInt(data[i].numeros[4]);
             var numeroStr5 = numero5.toString();
             if (numero5 < 10) {
             numeroStr5 = "0" + numero5.toString();
             }


             jQuery('.sorteos_anteriores.lotto .numero.primero_' + i).html(numeroStr1);
             jQuery('.sorteos_anteriores.lotto .numero.segundo_' + i).html(numeroStr2);
             jQuery('.sorteos_anteriores.lotto .numero.tercero_' + i).html(numeroStr3);
             jQuery('.sorteos_anteriores.lotto .numero.cuarto_' + i).html(numeroStr4);
             jQuery('.sorteos_anteriores.lotto .numero.quinto_' + i).html(numeroStr5);
             }
             } else {*/
            var value = data[i].numeroSorteo;
            var id = par;
            if (id == value) {
                if (data[i].vigencia != null) {
                    var hoy = new Date();
                    var vigencia = new Date(data[i].vigencia);

                    if (hoy > vigencia) {
                        var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#lottoOtrosSorteos').append(a);
                    } else {
                        var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#lottoOtrosSorteos').append(a);
                    }
                } else {
                    var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                    jQuery('select#lottoOtrosSorteos').append(a);
                }

            } else {
                if (data[i].vigencia != null) {
                    var hoy = new Date();
                    var vigencia = new Date(data[i].vigencia);

                    if (hoy > vigencia) {
                        var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#lottoOtrosSorteos').append(b);
                    } else {
                        var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#lottoOtrosSorteos').append(b);
                    }
                } else {
                    var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                    jQuery('select#lottoOtrosSorteos').append(b);
                }

            }

        }
      });
      jQuery.ajax(settings).fail(function (data) {
        jQuery('.not-front.page-node-32 .sorteos_anteriores.lotto, .consultar_premios.lotto').css('opacity', 1);
        console.log("Get lotto sorteos fail: " + errorThrown);
        jQuery('.not-front.page-node-32 .sorteos_anteriores.lotto').html('<h3>Error cargando datos de sorteos anteriores, favor intente recargar la página nuevamente.</h3>');
      });

    } else {
        console.log('LOCAL lotto ultimos sorteos done');
        jQuery('.not-front.page-node-32 .sorteos_anteriores.lotto, .consultar_premios.lotto').css('opacity', 1);

        var data = JSON.parse(localO);
        for (var i = 0; i < data.length; i++) {
            /*if (i < 4) {
             jQuery('.sorteos_anteriores.lotto .sorteo_id_' + i).html('Sorteo ' + data[i].numeroSorteo);

             jQuery('.sorteos_anteriores.lotto .sorteo_fecha_' + i).html(formatFecha(data[i].fecha));
             jQuery('.sorteos_anteriores.lotto .sorteo_fecha_' + i).attr('data-id', data[i].sorteo_Id);

             if (data[i].numeros == null) {
             jQuery('.sorteos_anteriores.lotto .sorteo' + i + ' .numero').css('background', 'transparent').html();
             jQuery('.sorteos_anteriores.lotto .sorteo' + i + ' .numero.primero_' + i).html('<p style="font-size: 12px; position:absolute">Error descargando los datos de este sorteo</p>');
             } else {
             var numero1 = parseInt(data[i].numeros[0]);
             var numeroStr1 = numero1.toString();
             if (numero1 < 10) {
             numeroStr1 = "0" + numero1.toString();
             }

             var numero2 = parseInt(data[i].numeros[1]);
             var numeroStr2 = numero2.toString();
             if (numero2 < 10) {
             numeroStr2 = "0" + numero2.toString();
             }

             var numero3 = parseInt(data[i].numeros[2]);
             var numeroStr3 = numero3.toString();
             if (numero3 < 10) {
             numeroStr3 = "0" + numero3.toString();
             }

             var numero4 = parseInt(data[i].numeros[3]);
             var numeroStr4 = numero4.toString();
             if (numero4 < 10) {
             numeroStr4 = "0" + numero4.toString();
             }

             var numero5 = parseInt(data[i].numeros[4]);
             var numeroStr5 = numero5.toString();
             if (numero5 < 10) {
             numeroStr5 = "0" + numero5.toString();
             }


             jQuery('.sorteos_anteriores.lotto .numero.primero_' + i).html(numeroStr1);
             jQuery('.sorteos_anteriores.lotto .numero.segundo_' + i).html(numeroStr2);
             jQuery('.sorteos_anteriores.lotto .numero.tercero_' + i).html(numeroStr3);
             jQuery('.sorteos_anteriores.lotto .numero.cuarto_' + i).html(numeroStr4);
             jQuery('.sorteos_anteriores.lotto .numero.quinto_' + i).html(numeroStr5);
             }
             } else {*/
            //debugger;
            var value = data[i].numeroSorteo;
            var id = par;
            if (id == value) {
                if (data[i].vigencia != null) {
                    var hoy = new Date();
                    var vigencia = new Date(data[i].vigencia);

                    if (hoy > vigencia) {
                        var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#lottoOtrosSorteos').append(a);
                    } else {
                        var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#lottoOtrosSorteos').append(a);
                    }
                } else {
                    var a = jQuery('<option selected="selected" value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                    jQuery('select#lottoOtrosSorteos').append(a);
                }

            } else {
                if (data[i].vigencia != null) {
                    var hoy = new Date();
                    var vigencia = new Date(data[i].vigencia);

                    if (hoy > vigencia) {
                        var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#lottoOtrosSorteos').append(b);
                    } else {
                        var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#lottoOtrosSorteos').append(b);
                    }

                } else {
                    var b = jQuery('<option value="' + data[i].numeroSorteo + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                    jQuery('select#lottoOtrosSorteos').append(b);
                }

            }

        }
    }
}


jQuery(document).on('change', 'select#lottoOtrosSorteos', function () {
    var id = jQuery(this).find("option:selected").attr('value');
    getSorteo(id);
});

