/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('.news-pagination a').click(function(e) {
    e.preventDefault();
    $(this.closest('.news-pagination')).find('li').removeClass('active');
    $(this.closest('li')).addClass('active');
    var list = $($(this.closest('.news')).find('.news-list'));
    var href = $(this).attr('href');
    var params = href.substr(href.indexOf("?"))
    $.ajax({
        url: 'news.ajax.html' + params,
        beforeSend:function(){
            list.fadeTo(1000, 0).prepend('<div class="news-loader"></div>');
        },
        error: function() {
            list.replaceWith('<div class="alert alert-danger news-list" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Erreur :</span> Impossible de charger les articles</div>');
        },
        success: function(data) {
            el = $(data);
            el.css({backgroundColor: "rgba(24, 48, 40, .5)"})
            // el.css({backgroundColor: "rgb(51,​22,183)"})
            list.replaceWith(el);
            el.animate({backgroundColor: "transparent"}, 2000);
      },
      type: 'GET'
   });

});

var customModal = $('<div class="actu-modal modal fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-content"><div class="close-modal" data-dismiss="modal"><div class="lr"><div class="rl"></div></div></div><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2"><div class="modal-body modal-loader"><h2>Chargement en cours</h2><button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Annuler</button></div></div></div></div></div></div>');

$('[data-toggle="modal"]').click(function(){
    var target = $(this).attr('data-target');
    if ($(target).length == 0) {
        var newModal = customModal.clone();
        $('body').append(newModal);
        $(newModal).attr('id', target.substr(1));
    }
});

$('body').on('loaded.bs.modal', '.actu-modal', function (e) {
    if ($(e.target).find('.modal-loader').length != 0) {
        $(e.target).find('> div').html('<div class="close-modal" data-dismiss="modal"><div class="lr"><div class="rl"></div></div></div><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2"><div class="modal-body"><p class="item-intro"><h2 class="text-danger">Erreur au chargement</h2><button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Fermer</button></div></div></div></div>');
    }
})