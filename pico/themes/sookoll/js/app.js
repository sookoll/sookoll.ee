/*jslint browser: true, regexp: true, nomen: true, plusplus: true, continue: true */
/*global $, L */
$(function () {
    'use strict';
    
    /* map */
    
    var p1 = [58.45, 25.05],
        p2 = [58.37498, 26.73256],
        map = L.map('map', {
            zoomControl: false,
            attributionControl: false
        }).setView(p1, 12),
        c_map = L.map('contact-map', {
            attributionControl: false
        }).setView(p2, 12);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(map);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.bc17bb2a/{z}/{x}/{y}.png').addTo(c_map);
    c_map.scrollWheelZoom.disable();
    
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
        anchor = $('main .page:first').offset().top - 100;
    
    $(window).scroll(function () {
        
        if ($(this).scrollTop() >= anchor) {
            header.css('padding-top', nav.outerHeight(true));
            nav.addClass('navbar-fixed-top');
        } else {
            header.css('padding-top', '0px');
            nav.removeClass('navbar-fixed-top');
        }
        
    });
    
    $('a.nav-link').click(function () {
        $("html, body").stop().animate({
            scrollTop: $($.attr(this, "href")).offset().top
        }, 750);
    });
    
    
    
});