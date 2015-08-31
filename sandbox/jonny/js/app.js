/*jslint browser: true, regexp: true, nomen: true, plusplus: true, continue: true */
/*global $, L */
$(function () {
    'use strict';
    
    var map = L.map('map', {
        zoomControl: false
    }).setView([58.45, 25.05], 12);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(map);
    
});