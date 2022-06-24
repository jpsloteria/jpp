currentView = '';

function validateConsultarFields() {
if (jQuery('input#serie').val() != "" && jQuery('input#number').val() != "" && jQuery('input#fraccion').val() != "") {
jQuery('.consultar_premios button').show();
} else {
jQuery('.consultar_premios button').hide();
}
}



function getLoteriaLastOffcanvas( request) {

var par = gup('sorteoId');

//jQuery('.not-front.page-node-28 #block-system-main, .front .sorteo_detail.loteria, .quick_sorteo .sorteo_detail.loteria').css('opacity', 0);

if (request == 'server') {





// Loteria Nacional

//var token_api = localStorage.getItem('token_api_integrations');
var settings = {
  "url": "https://integration.jps.go.cr/api/App/loterianacional/last",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE2MDUzMDM1MTQsImV4cCI6MTYwNTM4OTkxNCwiaWF0IjoxNjA1MzAzNTE0fQ.Od5yFnftpAtfP0NkoWhsRimmLqKdvgh3gXUhhvHAk4E",
  },
};

jQuery.ajax(settings).done(function (response) {
  mostrarLoteriaSorteo( jQuery(".sidenav .detail_ultimoSorteo.loteria") , response);
});

// Chances

//var token_api = localStorage.getItem('token_api_integrations');
var settings = {
  "url": "https://integration.jps.go.cr/api/App/chances/last",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE2MDUzMDM1MTQsImV4cCI6MTYwNTM4OTkxNCwiaWF0IjoxNjA1MzAzNTE0fQ.Od5yFnftpAtfP0NkoWhsRimmLqKdvgh3gXUhhvHAk4E",
  },
};

jQuery.ajax(settings).done(function (response) {
  mostrarChancesSorteo( jQuery(".sidenav .detail_ultimoSorteo.chances") , response);
  jQuery('.front .loading').hide();
});


// Tiempos
/*jQuery.ajax({
type: "GET",
url: static_api_url + "tiempos/function/last.json",
crossDomain: true,
dataType: 'json',
headers: {
//'X-Loteria-ApiKey': api_key
}
}).done(function (data, textStatus, jqXHR) {

  mostrarTiemposSorteo( jQuery(".sidenav .detail_ultimoSorteo.tiempos") , data);

}).fail(function (jqXHR, textStatus, errorThrown) {


});*/


// Nuevos tiempos


//var token_api = localStorage.getItem('token_api_integrations');
var settings = {
  "url": "https://integration.jps.go.cr/api/App/nuevostiempos/last",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE2MDUzMDM1MTQsImV4cCI6MTYwNTM4OTkxNCwiaWF0IjoxNjA1MzAzNTE0fQ.Od5yFnftpAtfP0NkoWhsRimmLqKdvgh3gXUhhvHAk4E",
  },
};

jQuery.ajax(settings).done(function (response) {
  mostrarNuevosTiemposSorteo( jQuery(".sidenav .detail_ultimoSorteo.nuevosTiempos") , response);
});

// Lotto

//var token_api = localStorage.getItem('token_api_integrations');
var settings = {
  "url": "https://integration.jps.go.cr/api/App/lotto/last",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE2MDUzMDM1MTQsImV4cCI6MTYwNTM4OTkxNCwiaWF0IjoxNjA1MzAzNTE0fQ.Od5yFnftpAtfP0NkoWhsRimmLqKdvgh3gXUhhvHAk4E",
  },
};

jQuery.ajax(settings).done(function (response) {
  mostrarLottoSorteo( jQuery(".sidenav .detail_ultimoSorteo.lotto") , response);
});



// Tres Monazos
//var token_api = localStorage.getItem('token_api_integrations');
var settings = {
  "url": "https://integration.jps.go.cr/api/App/tresmonazos/last",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE2MDUzMDM1MTQsImV4cCI6MTYwNTM4OTkxNCwiaWF0IjoxNjA1MzAzNTE0fQ.Od5yFnftpAtfP0NkoWhsRimmLqKdvgh3gXUhhvHAk4E",
  },
};

jQuery.ajax(settings).done(function (response) {
  mostrarTresMonazosSorteo( jQuery(".sidenav .detail_ultimoSorteo.tresMonazos") , response);
});



// Rueda de la fortuna
jQuery.ajax({
type: "GET",
url: static_api_url + "ruedafortuna/ganadores",
crossDomain: true,
dataType: 'json',
headers: {
//'X-Loteria-ApiKey': api_key
}
}).done(function (data, textStatus, jqXHR) {

  mostrarLottoSorteo( jQuery(".sidenav .detail_ultimoSorteo.rueda") , data);

}).fail(function (jqXHR, textStatus, errorThrown) {


});



} else {

}

} // fin consulta offcanvas




jQuery(document).ready(function () {

  jQuery('.footer').append('<div class="copy col-sm-12 text-center"><h5>Diseño Web por: &nbsp;&nbsp; <a href="https://www.pixelcr.com/" target="_blank"><img src="https://www.jps.go.cr/sites/default/files/logo-pixel.png"> </a></h5></div>');


if(jQuery('.html').hasClass('.front')) {
  getLoteriaLastOffcanvas('server');
}

// Se abre al cargar el home
if (jQuery(".front")[0]){

   getLoteriaLastOffcanvas('server');

   jQuery(".abrir").trigger("click");

 // alert('test');


}


jQuery('.abrir').click(function () {

 getLoteriaLastOffcanvas('server');

});


jQuery("#ref").hide();

jQuery("#ref").click( function() {

location.reload(window.location.href);

});

var $submit = jQuery("#consultar");
var $submit2 = jQuery("#consultar-chances");
$inputs = jQuery('input[type=number]');

function checkEmpty() {

return $inputs.filter(function() {
return !jQuery.trim(this.value);
}).length === 0;
}

$inputs.on('blur', function() {

// $submit.setAttribute('disabled', 'disabled');
$submit.prop("disabled", !checkEmpty());
$submit2.prop("disabled", !checkEmpty());
}).blur(); // trigger an initial blur



jQuery(".positive-integer").numeric({decimal: false, negative: false}, function () {
alert("El valor de fracciones debe ser un número mayor a 0");
this.value = "";
this.focus();
});

jQuery('input#fraccion').blur(function () {
if(jQuery('input#fraccion').val() <= 0){
jQuery('input#fraccion').val(1);
}
});


window.premios = "";
window.infopremios = "";
window.refresh = "";

var tipo = gup('tipo');
var par = gup('sorteoId');

if (jQuery('body').hasClass('page-node-29'))
currentView = 'chances';


// Init all
lotto_init();


jQuery('.loading').show();
if (jQuery('body').hasClass('front')) {
// Home, mostrar bloques
var update = checkRefreshState('loteria', null);
if (update == true) {
getLoteriaLast(par, 'server');
} else {
if (sessionStorage['getLoteriaLastObject'] != null) {
    getLoteriaLast(par, 'server');
} else {
    getLoteriaLast(par, 'server');
}
}
jQuery('.tipo-sorteo span').click(function () {
jQuery('.loading').show();
var id = jQuery(this).attr('id');
showProductInfo(id, par);
});
} else {
checkRefreshState('', par);
// Pantalla interna, mostrar sidebar
jQuery('.quick_menu span').click(function () {
var id = jQuery(this).attr('id');
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').removeClass('loteria chances instantanea tiempos nuevosTiempos lotto pitazo rueda');
showProductInfo(id, par);
jQuery('.quick_sorteo').show();
});

// Revisa en cual pantalla se está
if (jQuery('body').hasClass('page-node-28')) {
if (par != null & par != "") {
    getLoteriaBySorteoId(par);
    var update = checkRefreshState('loteria', par);
    if (update == true) {
        getLoteriaLastSorteos(par, 'server');
        ////getRecentsLoteriaSorteos('server');
    } else {
        if (sessionStorage['getLoteriaSorteosObject'] != null) {
            getLoteriaLastSorteos(par, 'server');
        } else {
            getLoteriaLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsLoteriaSorteosObject'] != null) {
            //getRecentsLoteriaSorteos('local');
        } else {
            //getRecentsLoteriaSorteos('server');
        }
    }
} else {
    var update = checkRefreshState('loteria', par);
    if (update == true) {
        getLoteriaLast(par, 'server');
        getLoteriaLastSorteos(par, 'server');
        getRecentsLoteriaSorteos('server');
    } else {
        if (sessionStorage['getLoteriaLastObject'] != null) {
            getLoteriaLast(par, 'server');
        } else {
            getLoteriaLast(par, 'server');
        }

        if (sessionStorage['getLoteriaLastSorteosObject'] != null) {
            getLoteriaLastSorteos(par, 'server');
        } else {
            getLoteriaLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsLoteriaSorteosObject'] != null) {
            //getRecentsLoteriaSorteos('local');
        } else {
            //getRecentsLoteriaSorteos('server');
        }
    }
}
} else if (jQuery('body').hasClass('page-node-29')) {
if (par != null & par != "") {
    getChancesBySorteoId(par);
    var update = checkRefreshState('chances', par);
    if (update == true) {
        getChancesLastSorteos(par, 'server');
        //getRecentsChancesSorteos('server');
    } else {
        if (sessionStorage['getChancesSorteosObject'] != null) {
            getChancesLastSorteos(par, 'server');
        } else {
            getChancesLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsChancesSorteosObject'] != null) {
            //getRecentsChancesSorteos('local');
        } else {
            //getRecentsChancesSorteos('server');
        }
    }
} else {
    var update = checkRefreshState('chances', par);
    if (update == true) {
        getChancesLast(par, 'server');
        getChancesLastSorteos(par, 'server');
        //getRecentsChancesSorteos('server');
    } else {
        if (sessionStorage['getChancesLastObject'] != null) {
            getChancesLast(par, 'server');
        } else {
            getChancesLast(par, 'server');
        }

        if (sessionStorage['getChancesLastSorteosObject'] != null) {
            getChancesLastSorteos(par, 'server');
        } else {
            getChancesLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsChancesSorteosObject'] != null) {
            //getRecentsChancesSorteos('local');
        } else {
            //getRecentsChancesSorteos('server');
        }
    }
}

} else if (jQuery('body').hasClass('page-node-30')) {
if (par != null & par != "") {
    getTiemposBySorteoId(par);
    var update = checkRefreshState('tiempos', par);
    if (update == true) {
        getTiemposLastSorteos(par, 'server');
        //getRecentsTiemposSorteos('server');
    } else {
        if (sessionStorage['getTiemposLastSorteosObject'] != null) {
            getTiemposLastSorteos(par, 'server');
        } else {
            getTiemposLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsTiemposSorteosObject'] != null) {
            //getRecentsTiemposSorteos('local');
        } else {
            //getRecentsTiemposSorteos('server');
        }
    }
} else {
    var update = checkRefreshState('tiempos', par);
    if (update == true) {
        getTiemposLast(par, 'server');
        getTiemposLastSorteos(par, 'server');
        //getRecentsTiemposSorteos('server');
    } else {
        if (sessionStorage['getTiemposLastObject'] != null) {
            getTiemposLast(par, 'server');
        } else {
            getTiemposLast(par, 'server');
        }

        if (sessionStorage['getTiemposLastSorteosObject'] != null) {
            getTiemposLastSorteos(par, 'server');
        } else {
            getTiemposLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsTiemposSorteosObject'] != null) {
            //getRecentsTiemposSorteos('local');
        } else {
            //getRecentsTiemposSorteos('server');
        }
    }
}

} else if (jQuery('body').hasClass('page-node-307')) {
getInstantaneaLast();
} else if (jQuery('body').hasClass('page-node-32')) {
if (par != null & par != "") {
    getLottoBySorteoId(par);
    var update = checkRefreshState('lotto', par);
    if (update == true) {
        getLottoLastSorteos(par, 'server');
        //getRecentsLottoSorteos('server');
    } else {
        if (sessionStorage['getLottoSorteosObject'] != null) {
            getLottoLastSorteos(par, 'server');
        } else {
            getLottoLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsLottoSorteosObject'] != null) {
            //getRecentsLottoSorteos('local');
        } else {
            //getRecentsLottoSorteos('server');
        }
    }
} else {
    var update = checkRefreshState('lotto', par);
    if (update == true) {
        getLottoLast(par, 'server');
        getLottoLastSorteos(par, 'server');
        //getRecentsLottoSorteos('server');
    } else {
        if (sessionStorage['getLottoLastObject'] != null) {
            getLottoLast(par, 'server');
        } else {
            getLottoLast(par, 'server');
        }

        if (sessionStorage['getLottoLastSorteosObject'] != null) {
            getLottoLastSorteos(par, 'server');
        } else {
            getLottoLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsLottoSorteosObject'] != null) {
            //getRecentsLottoSorteos('local');
        } else {
            //getRecentsLottoSorteos('server');
        }
    }
}

} else if (jQuery('body').hasClass('page-node-33')) {
if (par != null & par != "") {
    getNuevosTiemposBySorteoId(par);
    var update = checkRefreshState('nuevostiempos', par);
    if (update == true) {
        getNuevosTiemposLastSorteos(par, 'server');
        //getRecentsNuevosTiemposSorteos('server');
    } else {
        if (sessionStorage['getNuevosTiemposLastSorteosObject'] != null) {
            getNuevosTiemposLastSorteos(par, 'server');
        } else {
            getNuevosTiemposLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsNuevosTiemposSorteosObject'] != null) {
            //getRecentsNuevosTiemposSorteos('local');
        } else {
            //getRecentsNuevosTiemposSorteos('server');
        }
    }
} else {
    var update = checkRefreshState('nuevostiempos', par);
    if (update == true) {
        getNuevosTiemposLast(par, 'server');
        getNuevosTiemposLastSorteos(par, 'server');
        //getRecentsNuevosTiemposSorteos('server');
    } else {
        if (sessionStorage['getNuevosTiemposLastObject'] != null) {
            getNuevosTiemposLast(par, 'server');
        } else {
            getNuevosTiemposLast(par, 'server');
        }

        if (sessionStorage['getNuevosTiemposLastSorteosObject'] != null) {
            getNuevosTiemposLastSorteos(par, 'server');
        } else {
            getNuevosTiemposLastSorteos(par, 'server');
        }

        if (sessionStorage['getRecentsNuevosTiemposSorteosObject'] != null) {
            //getRecentsNuevosTiemposSorteos('local');
        } else {
            //getRecentsNuevosTiemposSorteos('server');
        }
    }
}

}  else if (jQuery('body').hasClass('page-node-688')) {
if (par != null & par != "") {
        getTresMonazosBySorteoId(par);
        var update = checkRefreshState('tresmonazos', par);
    if (update == true) {
        getTresMonazosLastSorteos(par, 'server');
    } else {
       if (sessionStorage['getTresMonazosLastSorteosObject'] != null) {
       //if ( sessionStorage['getTresMonazosLastSorteosObject'] !== 'undefined') {
            getTresMonazosLastSorteos(par, 'server');
        } else {
            getTresMonazosLastSorteos(par, 'server');
        }
        if (sessionStorage['getRecentsTresMonazosSorteosObject'] != null) {
            //getTresMonazosLastSorteos('local');
        } else {
            //getTresMonazosLastSorteos('server');
        }
    }
} else {
    var update = checkRefreshState('tresmonazos', par);
    if (update == true) {
        getTresMonazosLast(par, 'server');
        getTresMonazosLastSorteos(par, 'server');
        //getRecentsNuevosTiemposSorteos('server');
    } else {
        if ( sessionStorage['getTresMonazosObject'] != null) {
            getTresMonazosLast(par, 'server');
        } else {
            getTresMonazosLast(par, 'server');
        }

        if ( sessionStorage['getTresMonazosLastSorteosObject'] != null) {
        //if ( sessionStorage['getTresMonazosLastSorteosObject'] !== 'undefined') {
            getTresMonazosLastSorteos(par, 'server');
        } else {
            getTresMonazosLastSorteos(par, 'server');
        }

        if ( sessionStorage['getRecentsTresMonazosSorteosObject'] != null) {
            //getRecentsNuevosTiemposSorteos('local');
        } else {
            //getRecentsNuevosTiemposSorteos('server');
        }
    }
}

} else if (jQuery('body').hasClass('page-node-39')) {
validateRuedaFortuna();
}

// Bind events
jQuery('.sorteos_anteriores.loteria .fecha_sorteo').click(function () {
var id = jQuery(this).data('id');
window.location = "/productos/loteria-nacional?sorteoId=" + id;
});

jQuery('.sorteos_anteriores.chances .fecha_sorteo').click(function () {
var id = jQuery(this).data('id');
window.location = "/productos/chances?sorteoId=" + id;
});

jQuery('.sorteos_anteriores.nuevosTiempos .fecha_sorteo').click(function () {
var id = jQuery(this).data('id');
window.location = "/productos/nuevos-tiempos?sorteoId=" + id;
});

jQuery('.sorteos_anteriores.lotto .fecha_sorteo').click(function () {
var id = jQuery(this).data('id');
window.location = "/productos/lotto?sorteoId=" + id;
});

jQuery('.sorteos_anteriores.tiempos .fecha_sorteo').click(function () {
var id = jQuery(this).data('id');
window.location = "/productos/tiempos?sorteoId=" + id;
});

jQuery('.sorteos_anteriores.tresMonazos .fecha_sorteo').click(function () {
var id = jQuery(this).data('id');
window.location = "/productos/3-monazos?sorteoId=" + id;
});

jQuery(".consultar_premios input").keypress(function (e) {
if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
    jQuery('.consultar_premios .form button').click();
    return false;
} else {
    return true;
}
});

// jQuery('.consultar_premios .form button').click(function () {
//     if (jQuery('input#serie').val() != "" && jQuery('input#number').val() != "" && jQuery('input#fraccion').val() != "") {
//         jQuery('.resultado_mensaje strong, .resultado_mensaje .premios_ganados').hide();
//         var id = jQuery(this).data('id');
//         jQuery('.loading-consultar').show();
//         var numero = parseInt(jQuery('.consultar_premios #number').val());
//         var serie = parseInt(jQuery('.consultar_premios #serie').val());
//         var fraccion = parseInt(jQuery('.consultar_premios #fraccion').val());
//         jQuery('.resultado_mensaje strong').html("");
//         jQuery('.resultado_mensaje .premios_ganados li').remove();
//         calcularPremio(numero, serie, fraccion, id, par);
//     }
// });
}

});




function showProductInfo(id, par) {
switch (id) {
case 'btn-loteria':
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').addClass('loteria');
jQuery('.sorteo_logo img').attr('src', '/sites/all/themes/jps/images/logo_loteria.jpg');
jQuery('.sorteo_detail, .otros_resultado').hide();
jQuery('.sorteo_detail.loteria, .otros_resultado.loteria').show();
var update = checkRefreshState('loteria', par);
if (update == true) {
    getLoteriaLast(par, 'server');
} else {
    if (sessionStorage['getLoteriaLastObject'] != null) {
        getLoteriaLast(par, 'server');
    } else {
        getLoteriaLast(par, 'server');
    }
}
break;

case 'btn-chances':
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').addClass('chances');
jQuery('.sorteo_logo img').attr('src', '/sites/all/themes/jps/images/logo_chances.jpg');
jQuery('.sorteo_detail, .otros_resultado').hide();
jQuery('.sorteo_detail.chances, .otros_resultado.chances').show();
var update = checkRefreshState('chances', par);
if (update == true) {
    getChancesLast(par, 'server');
} else {
    if (sessionStorage['getChancesLastObject'] != null) {
        getChancesLast(par, 'server');
    } else {
        getChancesLast(par, 'server');
    }
}
break;

case 'btn-tiempos':
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').addClass('tiempos');
jQuery('.sorteo_logo img').attr('src', '/sites/all/themes/jps/images/logo_tiempos.jpg');
jQuery('.sorteo_detail, .otros_resultado').hide();
jQuery('.sorteo_detail.tiempos, .otros_resultado.tiempos').show();
var update = checkRefreshState('tiempos', par);
if (update == true) {
    getTiemposLast(par, 'server');
} else {
    if (sessionStorage['getTiemposLastObject'] != null) {
        getTiemposLast(par, 'server');
    } else {
        getTiemposLast(par, 'server');
    }
}
break;

case 'btn-instantanea':
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').addClass('instantanea');
jQuery('.sorteo_logo img').attr('src', '/sites/all/themes/jps/images/logo_instantanea.jpg');
jQuery('.sorteo_detail, .otros_resultado').hide();
jQuery('.sorteo_detail.instantanea, .otros_resultado.instantanea').hide();
jQuery('.sorteo_detail.instantanea, .otros_resultado.instantanea').show();
getInstantaneaLast();
break;

case 'btn-lotto':
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').addClass('lotto');
jQuery('.sorteo_logo img').attr('src', '/sites/all/themes/jps/images/logo_lotto.png');
jQuery('.sorteo_detail, .otros_resultado').hide();
jQuery('.sorteo_detail.lotto, .otros_resultado.lotto').show();
var update = checkRefreshState('lotto', par);
if (update == true) {
    getLottoLast(par, 'server');
} else {
    if (sessionStorage['getLottoLastObject'] != null) {
        getLottoLast(par, 'server');
    } else {
        getLottoLast(par, 'server');
    }
}
break;

case 'btn-nuevosTiempos':
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').addClass('nuevosTiempos');
jQuery('.sorteo_logo img').attr('src', '/sites/all/themes/jps/images/logo_nuevosTiempos.png');
jQuery('.sorteo_detail, .otros_resultado').hide();
jQuery('.sorteo_detail.nuevosTiempos, .otros_resultado.nuevosTiempos').show();
var update = checkRefreshState('nuevostiempos', par);
if (update == true) {
    getNuevosTiemposLast(par, 'server');
} else {
    if (sessionStorage['getNuevosTiemposLastObject'] != null) {
        getNuevosTiemposLast(par, 'server');
    } else {
        getNuevosTiemposLast(par, 'server');
    }
}
break;

case 'btn-tresMonazos':
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').addClass('tresMonazos');
jQuery('.sorteo_logo img').attr('src', '/sites/all/themes/jps/images/logo_tresMonazos.png');
jQuery('.sorteo_detail, .otros_resultado').hide();
jQuery('.sorteo_detail.tresMonazos, .otros_resultado.tresMonazos').show();
var update = checkRefreshState('tresMonazos', par);
if (update == true) {
    getTresMonazosLast(par, 'server');
} else {
    if (sessionStorage['getTresMonazosLastObject'] != null) {
        getTresMonazosLast(par, 'server');
    } else {
        getTresMonazosLast(par, 'server');
    }
}
break;

case 'btn-rueda':
jQuery('.quick_sorteo, .quick_sorteo input[type="submit"]').addClass('rueda');
jQuery('.sorteo_logo img').attr('src', '/sites/all/themes/jps/images/logo_rueda.png');
jQuery('.sorteo_detail, .otros_resultado').hide();
jQuery('.sorteo_detail.rueda, .otros_resultado.rueda').show();
validateRuedaFortuna();
break;

default:
break;
}
}

//------------------------------------------------
//  RESFRESH
// -----------------------------------------------
function checkRefreshState(tipo, par) {
if (window.refresh == "") {
jQuery.ajax({
type: "GET",
url: api_url + 'refresh',
crossDomain: true,
dataType: 'json',
headers: {
    'X-Loteria-ApiKey': api_key
}
}).done(function (data, textStatus, jqXHR) {
console.log("GET refresh done");
window.refresh = data;
var result = loadSorteos(tipo, par);
return result;
}).fail(function (jqXHR, textStatus, errorThrown) {
console.log("Get refresh fail: " + errorThrown);


jQuery('.loading').hide();



});
} else {
var result = loadSorteos(tipo, par);
return result;
}
}


function getRefreshDate(tipo) {
if (window.refresh == "")
return null;

for (var i = 0; i < window.refresh.length; i++) {
var refreshItem = window.refresh[i];
var tipoSorteo = refreshItem.sorteo;
if (tipoSorteo == tipo) {
return refreshItem.date;
}
}
return null;
}

function loadSorteos(tipo, par) {
var data = window.refresh;
for (var i = 0; i < data.length; i++) {
var refreshItem = data[i];
var tipoSorteo = data[i].sorteo;
if (tipoSorteo == tipo) {
switch (tipo) {
    case 'loteria':
        var result = loteria_CheckRefresh(par, refreshItem);
        return result;
        break;

    case 'chances':
        var result = chances_CheckRefresh(par, refreshItem);
        return result;
        break;

    case 'tiempos':
        var result = tiempos_CheckRefresh(par, refreshItem);
        return result;
        break;

    case 'nuevostiempos':
        var result = nuevosTiempos_CheckRefresh(par, refreshItem);
        return result;
        break;

    case 'lotto':
        var result = lotto_CheckRefresh(par, refreshItem);
        return result;
        break;

    case 'tresmonazos':
        var result = tresMonazos_CheckRefresh(par, refreshItem);
        return result;
        break;

    default:
        break;
}
}
}
}


function validateRuedaFortuna() {
var today = new Date();
var diaActual = today.getDate();
var numeroSemana = today.getDay();
if (numeroSemana == 0 && sessionStorage['lastRuedaUpdate'] != diaActual) {
getRuedaLast('server');
sessionStorage['lastRuedaUpdate'] = diaActual;
} else {
if (sessionStorage['getRuedaLastObject'] != null) {
getRuedaLast('local');
} else {
getRuedaLast('server');
}
}
}

