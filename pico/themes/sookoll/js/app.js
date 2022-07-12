/*jslint browser: true, regexp: true, nomen: true, plusplus: true, continue: true */
/*global $, L */
$(function () {
    'use strict';

    /* map */

    var p1 = [58.45, 25.05],
        p2 = [58.37498, 26.73256],
        c_map,
        map = L.map('map', {
            zoomControl: false,
            attributionControl: false
        }).setView(p1, 12);

    var tms1 = new L.TileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/hallkaart@GMC/{z}/{x}/{y}.png&ASUTUS=MAAAMET&KESKKOND=EXAMPLES', {
        continuousWorld: true,
        tms: true
    }).addTo(map);

    var tms2 = new L.TileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/hallkaart@GMC/{z}/{x}/{y}.png&ASUTUS=MAAAMET&KESKKOND=EXAMPLES', {
        continuousWorld: true,
        tms: true
    });



    //L.tileLayer('https://maps.omniscale.net/v2/{id}/style.grayscale/{z}/{x}/{y}.png').addTo(map);

    if ($('#contact-map').length > 0) {
        c_map = L.map('contact-map', {
            attributionControl: false
        }).setView(p2, 12);
        tms2.addTo(c_map);
        c_map.scrollWheelZoom.disable();
    }

    /* header */

    var h = $("#hamburger"),
        t = $("#dropdown");

    h.click(function (e) {
        e.preventDefault();
        t.slideToggle("fast");
    });

    t.on('click', 'a', function () {
        $(t).slideToggle();
    });

    var header = $('header'),
        nav = header.find('nav'),
        anchor = $('main .page:first').offset().top - 100,
        fixed = false;

    $(window).scroll(function () {

        if ($(this).scrollTop() >= anchor) {
            if (!fixed) {
                header.css('padding-top', nav.outerHeight(true));
                nav.stop().fadeTo(0, 0).addClass('navbar-fixed-top').fadeTo(500, 1);
                fixed = true;
            }
        } else {
            if (fixed) {
                nav.stop().fadeTo(500, 0, function(){
                    header.css('padding-top', '0px');
                    nav.removeClass('navbar-fixed-top').fadeTo(0, 1);
                    fixed = false;
                });
            }
        }

    });

    $('a.nav-link[href^=#]').click(function (e) {
        e.preventDefault();
        var hash = $.attr(this, "href");
        if (hash.length > 1) {
            $("html, body").stop().animate({
                scrollTop: $($.attr(this, "href")).offset().top
            }, 750);
        }
    });

    $('article:odd').find('.col-md-7').addClass('col-md-push-5');
    $('article:odd').find('.col-md-5').addClass('col-md-pull-7');

    hljs.initHighlightingOnLoad();

});
