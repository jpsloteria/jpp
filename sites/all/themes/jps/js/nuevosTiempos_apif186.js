function nuevosTiempos_CheckRefresh(par, refreshItem) {
    if (sessionStorage['nuevostiemposDateUpdated'] != refreshItem.date) {
        sessionStorage['nuevostiemposDateUpdated'] = refreshItem.date;
        return true;
    } else {
        return false;
    }
}

function getRecentsNuevosTiemposSorteos(request) {

    if (request == 'server') {

      var token_api = localStorage.getItem('token_api_integrations');
      var settings = {
        "url": integrations_api_url_new+"/api/App/nuevostiempos/page",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer "+token_api,
        },
      };

      jQuery.ajax(settings).done(function (data) {
        ////console.log(data);
        jQuery('.otros_resultado.nuevosTiempos .dropdown ul li').remove();
        console.log("GET nuevosTiempos/function/recent done");
        sessionStorage.setItem('getRecentsNuevosTiemposSorteosObject', JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
            var li = jQuery('<li role="presentation"></li>');
            var a = ""
            if (data[i].manana != null) {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/nuevos-tiempos?sorteoId=' + data[i].manana.numeroSorteo + '">' + formatFecha(data[i].manana.fecha) + '</a>');
            } else if (data[i].mediaTarde != null) {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/nuevos-tiempos?sorteoId=' + data[i].mediaTarde.numeroSorteo + '">' + formatFecha(data[i].mediaTarde.fecha) + '</a>');
            } else {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/nuevos-tiempos?sorteoId=' + data[i].tarde.numeroSorteo + '">' + formatFecha(data[i].tarde.fecha) + '</a>');
            }

            a.click(getSorteo);
            li.append(a);
            jQuery('.otros_resultado.nuevosTiempos .dropdown ul').append(li);
        }
      });
      jQuery.ajax(settings).fail(function (data) {
        console.log("Get nuevosTiempos recent sorteos fail: " + errorThrown);
    });

    } else {
        jQuery('.otros_resultado.nuevosTiempos .dropdown ul li').remove();
        console.log("GET LOCAL nuevosTiempos/function/recent done");

        var dataStr = sessionStorage.getItem('getRecentsNuevosTiemposSorteosObject');

        var data = JSON.parse(dataStr);

        for (var i = 0; i < data.length; i++) {
            var li = jQuery('<li role="presentation"></li>');
            var a = ""
            if (data[i].manana != null) {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/nuevos-tiempos?sorteoId=' + data[i].manana.numeroSorteo + '">' + formatFecha(data[i].manana.fecha) + '</a>');
            } else if (data[i].mediaTarde != null) {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/nuevos-tiempos?sorteoId=' + data[i].mediaTarde.numeroSorteo + '">' + formatFecha(data[i].mediaTarde.fecha) + '</a>');
            } else {
                a = jQuery('<a role="menuitem" style="cursor:pointer" href="/productos/nuevos-tiempos?sorteoId=' + data[i].tarde.numeroSorteo + '">' + formatFecha(data[i].tarde.fecha) + '</a>');
            }

            a.click(getSorteo);
            li.append(a);
            jQuery('.otros_resultado.nuevosTiempos .dropdown ul').append(li);
        }
    }
}

function getNuevosTiemposBySorteoId(id) {
    //debugger;
    jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 0);

    var token_api = localStorage.getItem('token_api_integrations');
    var settings = {
      "url": integrations_api_url_new+"/api/App/nuevostiempos/"+id,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token_api,
      },
    };

    jQuery.ajax(settings).done(function (data) {
      ////console.log(data);
      jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 1);
      console.log("GET nuevosTiempos/function/last done");
      if (data != null) {
          mostrarNuevosTiemposSorteo(jQuery(".detail_ultimoSorteo.nuevosTiempos"), data);
      } else {
          jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
      }

      // Mostrar detalle y ocultar loading
      jQuery('.detail_ultimoSorteo, .consultar_premios.nuevosTiempos').css('opacity', 1);
      jQuery('.page-node-33 .loading').hide();
    });
    jQuery.ajax(settings).fail(function (data) {
      jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 1);
      console.log("Get sorteobyId fail: " + errorThrown);
      jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

      // Mostrar detalle y ocultar loading
      jQuery('.detail_ultimoSorteo, .consultar_premios.nuevosTiempos').css('opacity', 1);
      jQuery('.page-node-33 .loading').hide();
    });
}

function getNuevosTiemposLast(par, request) {
    jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 0);

    if (request == 'server') {
    var token_api = localStorage.getItem('token_api_integrations');
    var settings = {
      "url": integrations_api_url_new+"/api/App/nuevostiempos/last",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token_api,
      },
    };

    jQuery.ajax(settings).done(function (data) {
      ////console.log(data);
      console.log("GET nuevosTiempos/function/last done jairo");

      jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 1);
      if (data != null) {
          sessionStorage.setItem('getNuevosTiemposLastObject', JSON.stringify(data));
          if (par == null || par == "") {
              mostrarNuevosTiemposSorteo(jQuery(".detail_ultimoSorteo.nuevosTiempos"), data);
              jQuery('.page-node-33 .loading').hide();
          } else {
              mostrarNuevosTiemposSorteo(jQuery(".front .detail_ultimoSorteo.nuevosTiempos"), data);
          }
          mostrarNuevosTiemposSorteo(jQuery(".sorteo_detail.nuevosTiempos"), data);

      } else {
          jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos').html('<h3>No hay datos de este sorteo por el momento, favor intente nuevamente en unos minutos.</h3>');
      }

      // Mostrar detalle y ocultar loading
      jQuery('.detail_ultimoSorteo, .consultar_premios.nuevosTiempos').css('opacity', 1);
      jQuery('.page-node-33 .loading').hide();
      jQuery('.front .loading').hide();
    });
    jQuery.ajax(settings).fail(function (response) {
      console.log("Get sorteo fail: " + errorThrown);

      jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 1);
      jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos').html('<h3>Error de conexión con el servidor, favor intente recargar la página nuevamente.</h3>');

      // Mostrar detalle y ocultar loading
      jQuery('.detail_ultimoSorteo, .consultar_premios.nuevosTiempos').css('opacity', 1);
      jQuery('.page-node-33 .loading').hide();
      jQuery('.front .loading').hide();
    });

    } else {
        console.log("GET LOCAL nuevosTiempos/function/last done");

        jQuery('.not-front.page-node-33 #block-system-main, .front .sorteo_detail.nuevosTiempos, .quick_sorteo .sorteo_detail.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 1);
        var dataStr = sessionStorage.getItem('getNuevosTiemposLastObject');
        var data = JSON.parse(dataStr);
        if (par == null || par == "") {
            mostrarNuevosTiemposSorteo(jQuery(".detail_ultimoSorteo.nuevosTiempos"), data);
        } else {
            mostrarNuevosTiemposSorteo(jQuery(".front .detail_ultimoSorteo.nuevosTiempos"), data);
        }
        mostrarNuevosTiemposSorteo(jQuery(".sorteo_detail.nuevosTiempos"), data);

        // Mostrar detalle y ocultar loading
        jQuery('.detail_ultimoSorteo, .consultar_premios.nuevosTiempos').css('opacity', 1);
        jQuery('.front .loading').hide();
        jQuery('.page-node-33 .loading').hide();
    }
}

function mostrarNuevosTiemposSorteo($parent, sorteo) {
    var d = new Date();
    var reventado_1_Aux = 0;
    var reventado_2_Aux = 0;
    var reventado_3_Aux = 0;
    //console.log("Sorteo: "+sorteo.manana.numero);
    if (sorteo.manana != null) {
        d = new Date(sorteo.manana.fecha);
        $parent.find('.sorteo_id_0').html('Sorteo: ' + sorteo.manana.numeroSorteo+' - Mediodía');
        $parent.find('.sorteo_fecha_0').html(formatFecha(sorteo.manana.fecha));

        if (sorteo.manana.vigencia != null) {
          var hoy = new Date();
          var hoy_dia = hoy.getDate();
          var hoy_mes = hoy.getMonth();
          var hoy_year = hoy.getFullYear();
          var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
           /////////
          var vigencia = new Date(sorteo.manana.vigencia);
          var vigencia_dia = vigencia.getDate();
          var vigencia_mes = vigencia.getMonth();
          var vigencia_year = vigencia.getFullYear();
          var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

          if (hoy_format > vigencia_format) {
                alert('Sorteo caducado. Esta búsqueda se ofrece únicamente como historial de los sorteos.')
            }
            $parent.find('.sorteo_fecha_fin_0').html('Vigente hasta: ' + formatFecha(sorteo.manana.vigencia));
        } else {
            $parent.find('.sorteo_fecha_fin_0').html('');
        }

        $parent.find('.div_premio.manana').show();
        var reventado_1 = sorteo.manana.in_reventado;
        reventado_1_Aux = reventado_1;
        if (reventado_1 == "1") {
            reventado_text_1 = "R";
        } else if (reventado_1 == "2") {
            reventado_text_1 = "R";
        } else {
            reventado_text_1 = "-";
        }
        //console.log("Reventado 1: "+reventado_1);
        //console.log("Reventado 1: "+reventado_text_1);
        var numero = parseInt(sorteo.manana.numero);
        var numeroStr = numero.toString();
        if (numero < 10) {
            numeroStr = "0" + numero.toString();
        }
        $parent.find('.numero.primero').html(numeroStr);
        $parent.find('.numero.primero_r').html(reventado_text_1);

        if (reventado_text_1 == "R" && reventado_1 == 1) {
          var color_bola_1 = document.getElementById("reventado_1");
          color_bola_1.classList.add("num_bola_roja");
          //color_bola_2_p.classList.add("num_bola_roja_pagina");
        } else if (reventado_text_1 == "R" && reventado_1 == 2) {
          var color_bola_1 = document.getElementById("reventado_1");
          color_bola_1.classList.add("num_bola_gris");
          //color_bola_2_p.classList.add("num_bola_gris_pagina");
        }
        /*
        //console.log("Reventado 2: "+reventado_text_2+" - "+reventado_2);
        if (reventado_text_1 == "R" && reventado_1 == 1) {
          var color_bola_1_p = document.getElementById("reventado_1_p");
          color_bola_1_p.classList.add("num_bola_roja_pagina");
        } else if (reventado_text_1 == "R" && reventado_1 == 2) {
          var color_bola_1_p = document.getElementById("reventado_1_p");
          color_bola_1_p.classList.add("num_bola_gris_pagina");
        }*/

    } else {
        $parent.find('.div_premio.manana').hide();
    }

    if (sorteo.mediaTarde != null) {
        d = new Date(sorteo.mediaTarde.fecha);
        $parent.find('.sorteo_id_1').html('Sorteo: ' + sorteo.mediaTarde.numeroSorteo+' - Tarde');
        $parent.find('.sorteo_fecha_0').html(formatFecha(sorteo.mediaTarde.fecha));

        if (sorteo.mediaTarde.vigencia != null) {
          var hoy = new Date();
          var hoy_dia = hoy.getDate();
          var hoy_mes = hoy.getMonth();
          var hoy_year = hoy.getFullYear();
          var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
           /////////
          var vigencia = new Date(sorteo.mediaTarde.vigencia);
          var vigencia_dia = vigencia.getDate();
          var vigencia_mes = vigencia.getMonth();
          var vigencia_year = vigencia.getFullYear();
          var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

          if (hoy_format > vigencia_format) {
                alert('Sorteo caducado. Esta búsqueda se ofrece únicamente como historial de los sorteos.')
            }
            $parent.find('.sorteo_fecha_fin_0').html('Vigente hasta: ' + formatFecha(sorteo.mediaTarde.vigencia));
        } else {
            $parent.find('.sorteo_fecha_fin_0').html('La caducidad está descrita en cada fracción');
        }

        $parent.find('.div_premio.mediaTarde').show();
        var reventado_2 = sorteo.mediaTarde.in_reventado;
        reventado_2_Aux = reventado_2;
        if (reventado_2 == "1") {
            reventado_text_2 = "R";
        } else if (reventado_2 == "2") {
            reventado_text_2 = "R";
        } else {
            reventado_text_2 = "-";
        }
        //console.log("Reventado 2: "+reventado_2);
        //console.log("Reventado 2: "+reventado_text_2);
        var numero = parseInt(sorteo.mediaTarde.numero);
        var numeroStr = numero.toString();
        if (numero < 10) {
            numeroStr = "0" + numero.toString();
        }
        $parent.find('.numero.segundo').html(numeroStr);
        $parent.find('.numero.segundo_r').html(reventado_text_2);

        //var color_bola_2 = document.getElementById("reventado_2");
        //console.log("Reventado 2: "+reventado_text_2+" - "+reventado_2);
        if (reventado_text_2 == "R" && reventado_2 == 1) {
          var color_bola_2 = document.getElementById("reventado_2");
          color_bola_2.classList.add("num_bola_roja");
          //color_bola_2_p.classList.add("num_bola_roja_pagina");
        } else if (reventado_text_2 == "R" && reventado_2 == 2) {
          var color_bola_2 = document.getElementById("reventado_2");
          color_bola_2.classList.add("num_bola_gris");
          //color_bola_2_p.classList.add("num_bola_gris_pagina");
        }
        /*
        //console.log("Reventado 2: "+reventado_text_2+" - "+reventado_2);
        if (reventado_text_2 == "R" && reventado_2 == 1) {
          var color_bola_2_p = document.getElementById("reventado_2_p");
          color_bola_2_p.classList.add("num_bola_roja_pagina");
        } else if (reventado_text_2 == "R" && reventado_2 == 2) {
          var color_bola_2_p = document.getElementById("reventado_2_p");
          color_bola_2_p.classList.add("num_bola_gris_pagina");
        }*/

    } else {
        $parent.find('.div_premio.mediaTarde').hide();
    }
    //console.log(sorteo.tarde);

    if (sorteo.tarde != null) {
        d = new Date(sorteo.tarde.fecha);
        $parent.find('.sorteo_id_2').html('Sorteo: ' + sorteo.tarde.numeroSorteo+' - Noche');
        $parent.find('.sorteo_fecha_0').html(formatFecha(sorteo.tarde.fecha));

        if (sorteo.tarde.vigencia != null) {
          var hoy = new Date();
          var hoy_dia = hoy.getDate();
          var hoy_mes = hoy.getMonth();
          var hoy_year = hoy.getFullYear();
          var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
           /////////
          var vigencia = new Date(sorteo.tarde.vigencia);
          var vigencia_dia = vigencia.getDate();
          var vigencia_mes = vigencia.getMonth();
          var vigencia_year = vigencia.getFullYear();
          var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

          if (hoy_format > vigencia_format) {
                alert('Sorteo caducado. Esta búsqueda se ofrece únicamente como historial de los sorteos.')
            }
            $parent.find('.sorteo_fecha_fin_0').html('Vigente hasta: ' + formatFecha(sorteo.tarde.vigencia));
        } else {
            $parent.find('.sorteo_fecha_fin_0').html('La caducidad está descrita en cada fracción');
        }

        $parent.find('.div_premio.tarde').show();
        var reventado_3 = sorteo.tarde.in_reventado;
        reventado_3_Aux = reventado_3;
        if (reventado_3 == "1") {
            reventado_text_3 = "R";
        } else if (reventado_3 == "2") {
            reventado_text_3 = "R";
        } else {
            reventado_text_3 = "-";
        }
        //console.log("Reventado 2: "+reventado_2);
        //console.log("Reventado 2: "+reventado_text_2);
        var numero = parseInt(sorteo.tarde.numero);
        var numeroStr = numero.toString();
        if (numero < 10) {
            numeroStr = "0" + numero.toString();
        }
        $parent.find('.numero.tercero').html(numeroStr);
        $parent.find('.numero.tercero_r').html(reventado_text_3);

        //var color_bola_2 = document.getElementById("reventado_2");
        //console.log("Reventado 2: "+reventado_text_2+" - "+reventado_2);
        if (reventado_text_3 == "R" && reventado_3 == 1) {
          var color_bola_3 = document.getElementById("reventado_3");
          color_bola_3.classList.add("num_bola_roja");
          //color_bola_2_p.classList.add("num_bola_roja_pagina");
        } else if (reventado_text_3 == "R" && reventado_3 == 2) {
          var color_bola_3 = document.getElementById("reventado_3");
          color_bola_3.classList.add("num_bola_gris");
          //color_bola_2_p.classList.add("num_bola_gris_pagina");
        }
        /*
        //console.log("Reventado 2: "+reventado_text_2+" - "+reventado_2);
        if (reventado_text_3 == "R" && reventado_3 == 1) {
          var color_bola_3_p = document.getElementById("reventado_3_p");
          color_bola_3_p.classList.add("num_bola_roja_pagina");
        } else if (reventado_text_3 == "R" && reventado_3 == 2) {
          var color_bola_3_p = document.getElementById("reventado_3_p");
          color_bola_3_p.classList.add("num_bola_gris_pagina");
        }*/

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
/*
    var re_1 = document.getElementById('reventado_1');
    var reventado_1_color = re_1.innerHTML;

    var re_2 = document.getElementById('reventado_2');
    var reventado_2_color = re_2.innerHTML;

    var re_3 = document.getElementById('reventado_3');
    var reventado_3_color = re_3.innerHTML;

    if (reventado_1_color == "R") {
        var color_bola = document.getElementById("reventado_1");
        color_bola.classList.add("num_bola_roja");
    } else {
        var color_bola = document.getElementById("reventado_1");
        color_bola.classList.add("num_bola_gris");
    }

    if (reventado_2_color == "R") {
        var color_bola_2 = document.getElementById("reventado_2");
        color_bola_2.classList.add("num_bola_roja");
    } else {
        var color_bola_2 = document.getElementById("reventado_2");
        color_bola_2.classList.add("num_bola_gris");
    }

    if (reventado_3_color == "R") {
        var color_bola_3 = document.getElementById("reventado_3");
        color_bola_3.classList.add("num_bola_roja");
    } else {
      var color_bola_3 = document.getElementById("reventado_3");
      color_bola_3.classList.add("num_bola_gris");
    }
    */
    var re_1_p = document.getElementById('reventado_1_p');
    var reventado_1_color_p = re_1_p.innerHTML;

    var re_2_p = document.getElementById('reventado_2_p');
    var reventado_2_color_p = re_2_p.innerHTML;

    var re_3_p = document.getElementById('reventado_3_p');
    var reventado_3_color_p = re_3_p.innerHTML;

    if (reventado_1_color_p == "R" && reventado_1_Aux == 1) {
        var color_bola_p = document.getElementById("reventado_1_p");
        color_bola_p.classList.add("num_bola_roja_pagina");
    } else if (reventado_1_color_p == "R" && reventado_1_Aux == 2) {
      var color_bola_p = document.getElementById("reventado_1_p");
      color_bola_p.classList.add("num_bola_gris_pagina");
    }

    if (reventado_2_color_p == "R" && reventado_2_Aux == 1) {
        var color_bola_2_p = document.getElementById("reventado_2_p");
        color_bola_2_p.classList.add("num_bola_roja_pagina");
    } else if (reventado_2_color_p == "R" && reventado_2_Aux == 2){
      var color_bola_2_p = document.getElementById("reventado_2_p");
      color_bola_2_p.classList.add("num_bola_gris_pagina");
    }

    if (reventado_3_color_p == "R" && reventado_3_Aux == 1) {
        var color_bola_3_p = document.getElementById("reventado_3_p");
        color_bola_3_p.classList.add("num_bola_roja_pagina");
    } else if (reventado_3_color_p == "R" && reventado_3_Aux == 2){
      var color_bola_3_p = document.getElementById("reventado_3_p");
      color_bola_3_p.classList.add("num_bola_gris_pagina");
    }

}

function getNuevosTiemposLastSorteos(par, request) {
    jQuery('.not-front.page-node-33 .sorteos_anteriores.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 0);

    if (request == 'server') {
    var token_api = localStorage.getItem('token_api_integrations');
    var settings = {
      "url": integrations_api_url_new+"/api/App/nuevostiempos/page",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer "+token_api,
      },
    };

    jQuery.ajax(settings).done(function (data) {
      ////console.log(data);
      console.log('nuevosTiempos ultimos sorteos done');
      jQuery('.not-front.page-node-33 .sorteos_anteriores.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 1);

      sessionStorage.setItem('getNuevosTiemposLastSorteosObject', JSON.stringify(data));

      for (var i = 0; i < data.length; i++) {

          if (data[i].tarde != null) {
              var value = data[i].tarde.numeroSorteo;
              var id = par;
              if (id == value) {
                  if (data[i].tarde.vigencia != null) {
                    var hoy = new Date();
                    var hoy_dia = hoy.getDate();
                    var hoy_mes = hoy.getMonth();
                    var hoy_year = hoy.getFullYear();
                    var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                     /////////
                    var vigencia = new Date(data[i].tarde.vigencia);
                    var vigencia_dia = vigencia.getDate();
                    var vigencia_mes = vigencia.getMonth();
                    var vigencia_year = vigencia.getFullYear();
                    var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                    if (hoy_format > vigencia_format) {
                          //var a = jQuery('<option selected="selected" value="' + data[i].tarde.sorteo_Id + '">' + data[i].tarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                          jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                      } else {
                          var a = jQuery('<option selected="selected" value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                          jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                      }
                  } else {
                      var a = jQuery('<option selected="selected" value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                      jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                  }

              } else {
                  if (data[i].tarde.vigencia != null) {
                    var hoy = new Date();
                    var hoy_dia = hoy.getDate();
                    var hoy_mes = hoy.getMonth();
                    var hoy_year = hoy.getFullYear();
                    var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                     /////////
                    var vigencia = new Date(data[i].tarde.vigencia);
                    var vigencia_dia = vigencia.getDate();
                    var vigencia_mes = vigencia.getMonth();
                    var vigencia_year = vigencia.getFullYear();
                    var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                    if (hoy_format > vigencia_format) {
                          //var b = jQuery('<option value="' + data[i].tarde.sorteo_Id + '">' + data[i].tarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                          jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                      } else {
                          var b = jQuery('<option value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                          jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                      }
                  } else {
                      var b = jQuery('<option value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                      jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                  }

              }
          } else {
              var value = data[i].manana.numeroSorteo;
              var id = par;
              if (id == value) {
                  if (data[i].manana.vigencia != null) {
                    var hoy = new Date();
                    var hoy_dia = hoy.getDate();
                    var hoy_mes = hoy.getMonth();
                    var hoy_year = hoy.getFullYear();
                    var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                     /////////
                    var vigencia = new Date(data[i].manana.vigencia);
                    var vigencia_dia = vigencia.getDate();
                    var vigencia_mes = vigencia.getMonth();
                    var vigencia_year = vigencia.getFullYear();
                    var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                    if (hoy_format > vigencia_format) {
                          //var a = jQuery('<option selected="selected" value="' + data[i].manana.sorteo_Id + '">' + data[i].manana.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].manana.fecha) + '</option>');
                          jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                      } else {
                          var a = jQuery('<option selected="selected" value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                          jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                      }
                  } else {
                      var a = jQuery('<option selected="selected" value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                      jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                  }

              } else {
                  if (data[i].manana.vigencia != null) {
                    var hoy = new Date();
                    var hoy_dia = hoy.getDate();
                    var hoy_mes = hoy.getMonth();
                    var hoy_year = hoy.getFullYear();
                    var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                     /////////
                    var vigencia = new Date(data[i].manana.vigencia);
                    var vigencia_dia = vigencia.getDate();
                    var vigencia_mes = vigencia.getMonth();
                    var vigencia_year = vigencia.getFullYear();
                    var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                    if (hoy_format > vigencia_format) {
                        //  var b = jQuery('<option value="' + data[i].manana.sorteo_Id + '">' + data[i].manana.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].manana.fecha) + '</option>');
                          jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                      } else {
                          var b = jQuery('<option value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                          jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                      }
                  } else {
                      var b = jQuery('<option value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                      jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                  }

              }
          }

      }



    });
    jQuery.ajax(settings).fail(function (data) {
      jQuery('.not-front.page-node-33 .sorteos_anteriores.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 1);
      console.log("Get nuevosTiempos sorteos fail: " + errorThrown);
      jQuery('.not-front.page-node-33 .sorteos_anteriores.nuevosTiempos').html('<h3>Error cargando datos de sorteos anteriores, favor intente recargar la página nuevamente.</h3>');

  });


    } else {
        console.log('LOCAL nuevosTiempos ultimos sorteos done');
        jQuery('.not-front.page-node-33 .sorteos_anteriores.nuevosTiempos, .consultar_premios.nuevosTiempos').css('opacity', 1);

        var dataStr = sessionStorage.getItem('getNuevosTiemposLastSorteosObject');

        var data = JSON.parse(dataStr);

        for (var i = 0; i < data.length; i++) {

            /*if (i < 4) {
             if (data[i].manana != null || data[i].tarde != null) {
             if (data[i].manana != null) {
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo_fecha_' + i).html(formatFecha(data[i].manana.fecha));
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo_fecha_' + i).attr('data-id', data[i].manana.sorteo_Id);
             var numero = parseInt(data[i].manana.numero);
             var numeroStr = numero.toString();
             if (numero < 10) {
             numeroStr = "0" + numero.toString();
             }
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo' + i + ' .numero.primero').html(numeroStr);
             } else {
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo' + i + ' .numero.primero').hide();
             }

             if (data[i].tarde != null) {
             if (data[i].manana == null) {
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo_fecha_' + i).html(formatFecha(data[i].tarde.fecha));
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo_fecha_' + i).attr('data-id', data[i].tarde.sorteo_Id);
             }

             var numero2 = parseInt(data[i].tarde.numero);
             var numero2Str = numero2.toString();
             if (numero2 < 10) {
             numero2Str = "0" + numero2.toString();
             }
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo' + i + ' .numero.segundo').html(numero2Str);
             } else {
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo' + i + ' .numero.segundo').hide();
             }
             } else {
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo' + i + ' .numero.primero').hide();
             jQuery('.sorteos_anteriores.nuevosTiempos .sorteo' + i + ' .numero.segundo').hide();
             }
             } else {*/
            if (data[i].tarde != null) {
                var value = data[i].tarde.numeroSorteo;
                var id = par;
                if (id == value) {
                    if (data[i].tarde.vigencia != null) {
                      var hoy = new Date();
                      var hoy_dia = hoy.getDate();
                      var hoy_mes = hoy.getMonth();
                      var hoy_year = hoy.getFullYear();
                      var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                       /////////
                      var vigencia = new Date(data[i].tarde.vigencia);
                      var vigencia_dia = vigencia.getDate();
                      var vigencia_mes = vigencia.getMonth();
                      var vigencia_year = vigencia.getFullYear();
                      var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                      if (hoy_format > vigencia_format) {
                          //  var a = jQuery('<option selected="selected" value="' + data[i].tarde.sorteo_Id + '">' + data[i].tarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                            jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                        } else {
                            var a = jQuery('<option selected="selected" value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                            jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                        }
                    }

                } else {
                    if (data[i].tarde.vigencia != null) {
                      var hoy = new Date();
                      var hoy_dia = hoy.getDate();
                      var hoy_mes = hoy.getMonth();
                      var hoy_year = hoy.getFullYear();
                      var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                       /////////
                      var vigencia = new Date(data[i].tarde.vigencia);
                      var vigencia_dia = vigencia.getDate();
                      var vigencia_mes = vigencia.getMonth();
                      var vigencia_year = vigencia.getFullYear();
                      var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                      if (hoy_format > vigencia_format) {
                          //  var b = jQuery('<option value="' + data[i].tarde.sorteo_Id + '">' + data[i].tarde.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                            jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                        } else {
                            var b = jQuery('<option value="' + data[i].tarde.numeroSorteo + '">' + data[i].tarde.numeroSorteo + ' - ' + formatFecha(data[i].tarde.fecha) + '</option>');
                            jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                        }
                    }

                }
            } else {
                var value = data[i].manana.numeroSorteo;
                var id = par;
                if (id == value) {
                    if (data[i].manana.vigencia != null) {
                      var hoy = new Date();
                      var hoy_dia = hoy.getDate();
                      var hoy_mes = hoy.getMonth();
                      var hoy_year = hoy.getFullYear();
                      var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                       /////////
                      var vigencia = new Date(data[i].manana.vigencia);
                      var vigencia_dia = vigencia.getDate();
                      var vigencia_mes = vigencia.getMonth();
                      var vigencia_year = vigencia.getFullYear();
                      var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                      if (hoy_format > vigencia_format) {
                          //  var a = jQuery('<option selected="selected" value="' + data[i].manana.sorteo_Id + '">' + data[i].manana.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].manana.fecha) + '</option>');
                            jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                        } else {
                            var a = jQuery('<option selected="selected" value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                            jQuery('select#nuevosTiemposOtrosSorteos').append(a);
                        }
                    }

                } else {
                    if (data[i].manana.vigencia != null) {
                      var hoy = new Date();
                      var hoy_dia = hoy.getDate();
                      var hoy_mes = hoy.getMonth();
                      var hoy_year = hoy.getFullYear();
                      var hoy_format = new Date(hoy_year, hoy_mes, hoy_dia);
                       /////////
                      var vigencia = new Date(data[i].manana.vigencia);
                      var vigencia_dia = vigencia.getDate();
                      var vigencia_mes = vigencia.getMonth();
                      var vigencia_year = vigencia.getFullYear();
                      var vigencia_format = new Date(vigencia_year, vigencia_mes, vigencia_dia);

                      if (hoy_format > vigencia_format) {
                        //    var b = jQuery('<option value="' + data[i].manana.sorteo_Id + '">' + data[i].manana.numeroSorteo + ' (no vigente) - ' + formatFecha(data[i].manana.fecha) + '</option>');
                            jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                        } else {
                            var b = jQuery('<option value="' + data[i].manana.numeroSorteo + '">' + data[i].manana.numeroSorteo + ' - ' + formatFecha(data[i].manana.fecha) + '</option>');
                            jQuery('select#nuevosTiemposOtrosSorteos').append(b);
                        }
                    }
                }
            }
        }
    }
}


jQuery(document).on('change', 'select#nuevosTiemposOtrosSorteos', function () {
    var id = jQuery(this).find("option:selected").attr('value');
    getSorteo(id);
});

