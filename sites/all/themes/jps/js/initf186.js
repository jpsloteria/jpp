
jQuery(document).ready(function () {




jQuery('.html').easyView({
increaseSelector: '.increase-me',
decreaseSelector: '.decrease-me',
normalSelector: '.reset-me',
contrastSelector: '.change-me',
step: 10,
bootstrap: true,
  container: 'body',

});

jQuery('.main-container').easyView({
increaseSelector: '.increase-me',
decreaseSelector: '.decrease-me',
normalSelector: '.reset-me',
contrastSelector: '.change-me',
step: 10,
bootstrap: true,
  container: 'body',

});


jQuery('#navbar, .main-container, .footer').removeClass('container');
jQuery('.front .panel-col-top .inside, .front .panel-col-bottom .inside, .region-footer, .not-front #block-system-main, .page-header, .tabs--primary.nav.nav-tabs').addClass('container');
jQuery('.page-page-archive .view-content').addClass('col-sm-8');
jQuery('.page-page-archive .view-footer').addClass('col-sm-4');

var ancho_slider = jQuery('.view-noticias.view-display-id-block_1').width();

if (jQuery('body').width() > 767) {
jQuery('.view-noticias.view-display-id-block_1 .view-content').hoverscroll({
width: ancho_slider, // Width of the list container
height: 400, // Height of the list container
arrowsOpacity: 0.5 // Max possible opacity of the arrows
});
}

jQuery('button.webform-submit').html('Enviar');

jQuery('li.expanded').hover(function () {
jQuery(this).addClass('open');
}, function () {
jQuery(this).removeClass('open');
});

jQuery('li.dropdown > a').click(function () {
window.location = jQuery(this).attr('href');
});

jQuery('#navbar .menu.navbar-nav > li.last').removeClass('active');
jQuery('#navbar .menu.navbar-nav > li.last a').removeAttr('href');

var ancho_navbar = jQuery('.navbar-collapse').width();

jQuery('#block-menu-menu-popup-menu').css('margin-left', ancho_navbar - 141);

var ancho_sorteo_detail = jQuery('.sorteo_detail').width();
ancho_sorteo_detail = (ancho_sorteo_detail / 7);
jQuery('.tipo-sorteo ul li').width(ancho_sorteo_detail);

jQuery(window).resize(function () {
var ancho_sorteo_detail = jQuery('.sorteo_detail').width();
ancho_sorteo_detail = (ancho_sorteo_detail / 5);
jQuery('.tipo-sorteo ul li').width(ancho_sorteo_detail);
var ancho_navbar = jQuery('.navbar-collapse').width();
jQuery('#block-menu-menu-popup-menu').css('margin-left', ancho_navbar - 141);
});

jQuery('#navbar .menu.navbar-nav > li.last a').click(function () {
if (jQuery('#block-menu-menu-popup-menu').css('display') == "none") {
jQuery('#navbar .menu.navbar-nav > li.last').addClass('active');
jQuery('#block-menu-menu-popup-menu').show();
} else {
jQuery('#block-menu-menu-popup-menu').hide();
jQuery('#navbar .menu.navbar-nav > li.last').removeClass('active');
}
});

jQuery('#block-block-8 a').click(function () {
jQuery('#block-block-7').show();
});

jQuery('#block-block-7').click(function () {
jQuery('#block-block-7').hide();
});

jQuery('.tipo_persona input#q128').click(function () {
jQuery('#persona-fisica').show();
jQuery('#persona-juridica').hide();
});

jQuery('.tipo_persona input#q129').click(function () {
jQuery('#persona-juridica').show();
jQuery('#persona-fisica').hide();
});

jQuery('.main-container #block-system-main, .page-header, footer, #navbar .container').click(function () {
jQuery('.quick_sorteo, #block-block-7').hide();
});

jQuery('.region-content, .page-header, footer').click(function () {
jQuery('#block-menu-menu-popup-menu').hide();
});

jQuery('.page-node-39 .field-name-field-video').addClass('col-sm-8');


jQuery('#searchFormElement').submit(function(e){
var target = jQuery('#searchForm input[type="text"]').val();
var url = encodeURI('/search/node/' + target);
window.location = url;
e.preventDefault();
});

});


function openNav() {
document.getElementById("mySidenav").style.width = "350px";
document.getElementById("abrir").style.marginLeft = "285px";
document.getElementById("abrir").style.display = 'none';
document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
document.getElementById("mySidenav").style.width = "0";
document.getElementById("abrir").style.display = 'block';
document.getElementById("abrir").style.marginLeft = "-96px";


}

jQuery(document).mouseup(function(e)
{

    var container = jQuery("#mySidenav");
    //
    // alert('Close');
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        closeNav();
    }
});


// document.getElementById('mySidenav').onclick = function(e) {
//     if(e.target != document.getElementById('mySidenav')) {
//      closeNav();
//     } else {
//         // document.getElementById('mySidenav').innerHTML = 'Display Contents';
//     }
// }

