function tiempos_CheckRefresh(par, refreshItem) {
    if (sessionStorage['tiemposDateUpdated'] != refreshItem.date) {
        sessionStorage['tiemposDateUpdated'] = refreshItem.date;
        return true;
    } else {
        return false;
    }
}

function getRecentsTiemposSorteos(request) {

    if (request == 'server') {
        jQuery.ajax({
            type: "GET",
            url: static_api_url + "tiempos/function/recent.json",
            crossDomain: true,
            dataType: 'json',
            headers: {
                //'X-Loteria-ApiKey': api_key
            }
        }).done(function (data, textStatus, jqXHR) {
            jQuery('.otros_resultado.tiempos .dropdown ul li').remove();
            console.log("GET tiempos/function/recent done");

            sessionStorage.setItem('getRecentsTiemposSorteosObject', JSON.stringify(data));

            for (var i = 0; i < data.length; i++) {

                var li = jQuery('<li role="presentation"></li>');
                var a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/tiempos?sorteoId=' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</a>');

                a.click(getSorteo);
                li.append(a);
                jQuery('.otros_resultado.tiempos .dropdown ul').append(li);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Get tiempos recent sorteos fail: " + errorThrown);
        });
    } else {
        jQuery('.otros_resultado.tiempos .dropdown ul li').remove();
        console.log("GET LOCAL tiempos/function/recent done");

        var dataStr = sessionStorage.getItem('getRecentsTiemposSorteosObject');

        var data = JSON.parse(dataStr);

        for (var i = 0; i < data.length; i++) {
            var li = jQuery('<li role="presentation"></li>');
            var a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/tiempos?sorteoId=' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</a>');

            a.click(getSorteo);
            li.append(a);
            jQuery('.otros_resultado.tiempos .dropdown ul').append(li);
        }
    }
}

function getTiemposBySorteoId(id) {
    //debugger;
    jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos, .consultar_premios.tiempos').css('opacity', 0);
    jQuery.ajax({
        type: "GET",
        url: static_api_url + "tiempos/" + id + ".json",
        crossDomain: true,
        dataType: 'json',
        headers: {
            //'X-Loteria-ApiKey': api_key
        }
    }).done(function (data, textStatus, jqXHR) {
        jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos, .consultar_premios.tiempos').css('opacity', 1);
        console.log("GET tiempos/function/last done");
        if (data != null) {
            mostrarTiemposSorteo(jQuery(".detail_ultimoSorteo.tiempos"), data);
        } else {
            jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
        }

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo, .consultar_premios.tiempos').css('opacity', 1);
        jQuery('.page-node-30 .loading').hide();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos').css('opacity', 1);
        console.log("Get sorteobyId fail: " + errorThrown);
        jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo, .consultar_premios.tiempos').css('opacity', 1);
        jQuery('.page-node-30 .loading').hide();
    });
}


function getTiemposLast(par, request) {
    jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos, .consultar_premios.tiempos').css('opacity', 0);

    if (request == 'server') {
        jQuery.ajax({
            type: "GET",
            url: static_api_url + "tiempos/function/last.json",
            crossDomain: true,
            dataType: 'json',
            headers: {
                //'X-Loteria-ApiKey': api_key
            }
        }).done(function (data, textStatus, jqXHR) {
            jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos, .consultar_premios.tiempos').css('opacity', 1);
            console.log("GET tiempos/function/last done");
            if (data != null) {

                sessionStorage.setItem('getTiemposLastObject', JSON.stringify(data));
                if (par == null || par == "") {
                    mostrarTiemposSorteo(jQuery(".detail_ultimoSorteo.tiempos"), data);
                } else {
                    mostrarTiemposSorteo(jQuery(".front .detail_ultimoSorteo.tiempos"), data);
                }
                mostrarTiemposSorteo(jQuery(".sorteo_detail.tiempos"), data);
                jQuery('.page-node-30 .loading').hide();
            } else {
                jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
            }

            // Mostrar detalle y ocultar loading
            jQuery('.detail_ultimoSorteo, .consultar_premios.tiempos').css('opacity', 1);
            jQuery('.page-node-30 .loading').hide();
            jQuery('.front .loading').hide();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos, .consultar_premios.tiempos').css('opacity', 1);
            console.log("Get sorteo fail: " + errorThrown);
            jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

            // Mostrar detalle y ocultar loading
            jQuery('.detail_ultimoSorteo, .consultar_premios.tiempos').css('opacity', 1);
            jQuery('.page-node-30 .loading, .front .loading').hide();
        });
    } else {
        console.log("GET LOCAL tiempos/function/last done");

        jQuery('.not-front.page-node-30 #block-system-main, .front .sorteo_detail.tiempos, .quick_sorteo .sorteo_detail.tiempos, .consultar_premios.tiempos').css('opacity', 1);

        var dataStr = sessionStorage.getItem('getTiemposLastObject');
        var data = JSON.parse(dataStr);

        if (par == null || par == "") {
            mostrarTiemposSorteo(jQuery(".detail_ultimoSorteo.tiempos"), data);
            jQuery('.page-node-30 .loading').hide();
        } else {
            mostrarTiemposSorteo(jQuery(".front .detail_ultimoSorteo.tiempos"), data);
        }
        mostrarTiemposSorteo(jQuery(".sorteo_detail.tiempos"), data);

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo, .consultar_premios.tiempos').css('opacity', 1);
        jQuery('.front .loading').hide();
        jQuery('.page-node-30 .loading').hide();
    }
}

function mostrarTiemposSorteo($parent, sorteo) {

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


    var numero = parseInt(sorteo.numero);
    var numeroStr = numero.toString();
    if (numero < 10) {
        numeroStr = "0" + numero.toString();
    }


    $parent.find('.numero.primero_0').html(numeroStr);
    $parent.find('.premio.primero_0').html(parseInt(sorteo.montoPorEntero));

    $parent.find('.premio').priceFormat({
        prefix: '₡ ',
        centsSeparator: ',',
        thousandsSeparator: '.',
        centsLimit: 0
    });
    $parent.find('.premio_label_0').html('por entero');
    $parent.find('.front .numero').css('display', 'inline-block');

}

function getTiemposLastSorteos(par, request) {
    jQuery('.not-front.page-node-30 .sorteos_anteriores.tiempos, .consultar_premios.tiempos').css('opacity', 0);

    if (request == 'server') {
        jQuery.ajax({
            type: "GET",
            url: static_api_url + "tiempos/page.json",
            crossDomain: true,
            dataType: 'json',
            headers: {
                //'X-Loteria-ApiKey': api_key
            }
        }).done(function (data, textStatus, jqXHR) {
            console.log('tiempos ultimos sorteos done');
            jQuery('.not-front.page-node-30 .sorteos_anteriores.tiempos, .consultar_premios.tiempos').css('opacity', 1);

            sessionStorage.setItem('getTiemposLastSorteosObject', JSON.stringify(data));

            for (var i = 0; i < data.length; i++) {

                /*if (i < 4) {
                 jQuery('.sorteos_anteriores.tiempos .sorteo_id_' + i).html('Sorteo ' + data[i].numeroSorteo);
                 
                 jQuery('.sorteos_anteriores.tiempos .sorteo_fecha_' + i).html(formatFecha(data[i].fecha));
                 jQuery('.sorteos_anteriores.tiempos .sorteo_fecha_' + i).attr('data-id', data[i].sorteo_Id);
                 
                 if (data[i].numero == null) {
                 jQuery('.sorteos_anteriores.tiempos .sorteo' + i + ' .numero').css('background', 'transparent').html();
                 jQuery('.sorteos_anteriores.tiempos .sorteo' + i + ' .numero.primero_' + i).html('<p style="font-size: 12px; position:absolute">Error descargando los datos de este sorteo</p>');
                 } else {
                 var numero = parseInt(data[i].numero);
                 var numeroStr = numero.toString();
                 if (numero < 10) {
                 numeroStr = "0" + numero.toString();
                 }
                 jQuery('.sorteos_anteriores.tiempos .numero.primero_' + i).html(numeroStr);
                 }
                 } else {*/

                var value = data[i].sorteo_Id;
                var id = par;
                if (id == value) {
                    if (data[i].vigencia != null) {
                        var hoy = new Date();
                        var vigencia = new Date(data[i].vigencia);

                        if (hoy > vigencia) {
                            var a = jQuery('<option selected="selected" value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                            jQuery('select#tiemposOtrosSorteos').append(a);
                        } else {
                            var a = jQuery('<option selected="selected" value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                            jQuery('select#tiemposOtrosSorteos').append(a);
                        }
                    } else {
                        var a = jQuery('<option selected="selected" value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#tiemposOtrosSorteos').append(a);
                    }

                } else {
                    if (data[i].vigencia != null) {
                        var hoy = new Date();
                        var vigencia = new Date(data[i].vigencia);

                        if (hoy > vigencia) {
                            var b = jQuery('<option value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                            jQuery('select#tiemposOtrosSorteos').append(b);
                        } else {
                            var b = jQuery('<option value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                            jQuery('select#tiemposOtrosSorteos').append(b);
                        }
                    } else {
                        var b = jQuery('<option value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#tiemposOtrosSorteos').append(b);
                    }

                }

            }



        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("tiempos ultimos sorteos fail: " + errorThrown);
            jQuery('.not-front.page-node-30 .sorteos_anteriores.tiempos').html('<h3>Error cargando datos de sorteos anteriores, favor intente recargar la página nuevamente.</h3>');
        });
    } else {
        console.log('LOCAL tiempos ultimos sorteos done');
        jQuery('.not-front.page-node-30 .sorteos_anteriores.tiempos, .consultar_premios.tiempos').css('opacity', 1);

        var dataStr = sessionStorage.getItem('getTiemposLastSorteosObject');

        var data = JSON.parse(dataStr);

        for (var i = 0; i < data.length; i++) {

            /*if (i < 4) {
             jQuery('.sorteos_anteriores.tiempos .sorteo_id_' + i).html('Sorteo ' + data[i].numeroSorteo);
             
             jQuery('.sorteos_anteriores.tiempos .sorteo_fecha_' + i).html(formatFecha(data[i].fecha));
             jQuery('.sorteos_anteriores.tiempos .sorteo_fecha_' + i).attr('data-id', data[i].sorteo_Id);
             
             if (data[i].numero == null) {
             jQuery('.sorteos_anteriores.tiempos .sorteo' + i + ' .numero').css('background', 'transparent').html();
             jQuery('.sorteos_anteriores.tiempos .sorteo' + i + ' .numero.primero_' + i).html('<p style="font-size: 12px; position:absolute">Error descargando los datos de este sorteo</p>');
             } else {
             var numero = parseInt(data[i].numero);
             var numeroStr = numero.toString();
             if (numero < 10) {
             numeroStr = "0" + numero.toString();
             }
             jQuery('.sorteos_anteriores.tiempos .numero.primero_' + i).html(numeroStr);
             }
             } else {*/
            var value = data[i].sorteo_Id;
            var id = par;
            if (id == value) {
                if (data[i].vigencia != null) {
                    var hoy = new Date();
                    var vigencia = new Date(data[i].vigencia);

                    if (hoy > vigencia) {
                        var a = jQuery('<option selected="selected" value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#tiemposOtrosSorteos').append(a);
                    } else {
                        var a = jQuery('<option selected="selected" value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#tiemposOtrosSorteos').append(a);
                    }
                } else {
                    var a = jQuery('<option selected="selected" value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                    jQuery('select#tiemposOtrosSorteos').append(a);
                }

            } else {
                if (data[i].vigencia != null) {
                    var hoy = new Date();
                    var vigencia = new Date(data[i].vigencia);

                    if (hoy > vigencia) {
                        var b = jQuery('<option value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#tiemposOtrosSorteos').append(b);
                    } else {
                        var b = jQuery('<option value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                        jQuery('select#tiemposOtrosSorteos').append(b);
                    }
                } else {
                    var b = jQuery('<option value="' + data[i].sorteo_Id + '">' + data[i].numeroSorteo + ' - ' + formatFecha(data[i].fecha) + '</option>');
                    jQuery('select#tiemposOtrosSorteos').append(b);
                }

            }

        }
    }
}


jQuery(document).on('change', 'select#tiemposOtrosSorteos', function () {
    var id = jQuery(this).find("option:selected").attr('value');
    getSorteo(id);
});
