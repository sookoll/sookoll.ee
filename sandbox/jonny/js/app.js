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
    
    var e = $("#hamburger"),
        t = $("#dropdown");
    
    e.click(function () {
        t.slideToggle("fast")
    });
    t.find("a").on("click", function () {
        $(t).slideToggle()
    });
    var hero = $("#row-hero"),
        header = $("#header"),
        clients = $("#clients"),
        projects = $("#projects"),
        projectsOffset = projects.offset(),
        clientsOffset = clients.offset(),
        contactOffset = $("#contact").offset(),
        mapCanvasOffset = $("#contact-map").offset(),
        heightDifference = $(window).height() - (hero.outerHeight() + header.outerHeight() + clients.outerHeight());
    $(window).scroll(function () {
        if ($(this).scrollTop() >= projectsOffset.top) {
            if ($(this).scrollTop() < mapCanvasOffset.top - 200) {
                header.find(".active").removeClass("active");
                header.find("[data-nav='projects']").addClass("active");
            }
            if (header.hasClass("default")) {
                header.hide().removeClass("default").addClass("nav-fixed").fadeIn();
            }
        } else {
            header.removeClass("nav-fixed").addClass("default");
            header.find(".active").removeClass("active");
            header.find("[data-nav='home']").addClass("active");
        }
        
        if ($(this).scrollTop() > mapCanvasOffset.top - 200) {
            header.find(".active").removeClass("active");
            header.find("[data-nav='contact']").addClass("active");
        }
    });
    
    $("#header a, #row-hero a").click(function () {
        $("html, body").stop().animate({
            scrollTop: $($.attr(this, "href")).offset().top
        }, 750);
        var e = $(this).attr("href");
        return e.indexOf("#contact") >= 0 && $("#field1").focus(), !1
    });
    
    
    
});