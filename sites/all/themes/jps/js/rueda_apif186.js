function getRuedaLast(request) {
    jQuery('.not-front.page-node-39 #block-system-main, .front .sorteo_detail.rueda, .quick_sorteo .sorteo_detail.rueda').css('opacity', 0);

    if (request == 'server') {
        jQuery.ajax({
            type: "GET",
            url: integrations_api_url + "ruedafortuna/ganadores",
            crossDomain: true,
            dataType: 'json',
            headers: {
                'X-Loteria-ApiKey': 'aQhzlkTdEFL9k2TByJ1G'
            }
        }).done(function (data, textStatus, jqXHR) {
            console.log("GET ruedafortuna/ganadores done");

            jQuery('.not-front.page-node-39 #block-system-main, .front .sorteo_detail.rueda, .quick_sorteo .sorteo_detail.rueda').css('opacity', 1);
            if (data != null) {
                sessionStorage.setItem('getRuedaLastObject', JSON.stringify(data));
                mostrarRuedaSorteo(data);
            } else {
                jQuery('.not-front.page-node-39 #block-system-main, .front .sorteo_detail.rueda, .quick_sorteo .sorteo_detail.rueda').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
            }
            // Mostrar detalle y ocultar loading
            jQuery('.detail_ultimoSorteo').css('opacity', 1);
            jQuery('.page-node-39 .loading, .front .loading').hide();
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Get sorteo fail: " + errorThrown);

            jQuery('.not-front.page-node-39 #block-system-main, .front .sorteo_detail.rueda, .quick_sorteo .sorteo_detail.rueda').css('opacity', 1);
            jQuery('.not-front.page-node-39 #block-system-main, .front .sorteo_detail.rueda, .quick_sorteo .sorteo_detail.rueda').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

            // Mostrar detalle y ocultar loading
            jQuery('.detail_ultimoSorteo').css('opacity', 1);
            jQuery('.page-node-39 .loading, .front .loading').hide();
        });
    } else {
        console.log("GET LOCAL ruedafortuna/ganadores done");

        jQuery('.not-front.page-node-39 #block-system-main, .front .sorteo_detail.rueda, .quick_sorteo .sorteo_detail.rueda').css('opacity', 1);
        
        var dataStr = sessionStorage.getItem('getRuedaLastObject');
        var data = JSON.parse(dataStr);
        mostrarRuedaSorteo(data);

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo').css('opacity', 1);
        jQuery('.page-node-39 .loading, .front .loading').hide();
       
    }
}

function mostrarRuedaSorteo(sorteo) {

    jQuery('.rueda tbody tr').remove();

    if (sorteo.result != null) {
        if (sorteo.result.length > 0) {
            jQuery('.rueda .sorteo_fecha_0').html(formatFecha(sorteo.result[0].fechaJuego));

            for (var i = 0; i < sorteo.result.length; i++) {
                var tr = jQuery('<tr><td>' + (i + 1) + '</td><td>' + sorteo.result[i].nombre + '</td><td>' + sorteo.result[i].cedula + '</td></tr>');

                jQuery('.rueda tbody').append(tr);
            }
        } else {
            jQuery('.not-front.page-node-39 #block-system-main, .front .sorteo_detail.rueda, .quick_sorteo .sorteo_detail.rueda').html('<h3>No hay datos de ganadores por el momento.</h3>');
        }
    } else {
        jQuery('.not-front.page-node-39 #block-system-main, .front .sorteo_detail.rueda, .quick_sorteo .sorteo_detail.rueda').html('<h3>No hay datos de ganadores por el momento.</h3>');
    }

    jQuery('.not-front.page-node-39 .loading').hide();
}
