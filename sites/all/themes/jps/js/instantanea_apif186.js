function getInstantaneaLast() {

  var instantanea_content = jQuery('#block-views-loteria-instantanea-block').html();

    jQuery('.instantanea .view-body').html(instantanea_content);
    jQuery('.front .loading').hide();

}

