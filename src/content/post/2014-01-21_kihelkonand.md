Date: 2014-01-21
Title: D3.js kasutamine Eesti Kihelkondade kujutamisel
Published: false
Tags: d3, coding, javascript
Excerpt:

Juhend, kuidas kasutada D3.js raamistikku Eesti Kihelkondade kujutamisel

## Andmetöötlus

* Lae alla kihelkondade andmed
* Teisenda projektsioon L-EST -> WGS-84

```
$ ogr2ogr -t_srs EPSG:4326 kih1897_wgs.shp kih1897.shp
```

* Kääna shp -> topojson

```

$ topojson -o kih1897.json /home/mihkelo/Downloads/ee_admin_fix/kih1897_wgs.shp -p --shapefile-encoding utf8

```
