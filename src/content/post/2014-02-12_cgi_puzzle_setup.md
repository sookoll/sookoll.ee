Date: 2014-02-12
Title: Geopusle mängu andmete ettevalmistamine
Published: true
Tags: postgis, qgis, ogr, geojson, shp
Excerpt:

Täna avame natuke [Geopusle](http://sookoll.ee/geopusle) mängu loomise telgitaguseid. Valmistame ette ühe uue mängu (CGI Euroopa riigid) geoandmed. Ühest küljest on see rohkem mulle endale tegevuste dokumenteerimiseks (no et ei peaks iga kord netis tuhlama :)  
Teiseks on tegevused üsna universaalsed ja võivad sobida suvaliste geoandmete töötluseks.

## Tööriistad
Kasutame siin juhendis töökeskkonnana [Ubuntu 13.10](http://ubuntu.com) op-süsteemi.  
Andmebaasiks [PostgreSQL 9.1](http://postgresql.org) koos [PostGIS 2.1](http://postgis.net/) laiendusega.  
Andmete laadimiseks PostgreSQL andmebaasi shp2pgsql (tuleb koos PostGIS'iga) ja [OGR](http://www.gdal.org/ogr/)  
Kergeks töötluseks ja visuaalseks valideerimiseks [QGIS](http://www.qgis.org/)

## Andmete leidmine
Vabade litsentsidega või tasuta jagatavaid andmeid on praeguseks võimalik üsna lihtsasti leida. Reeglina on mingi piirkonna geoandmete allikaks riiklikud asutused, Eestis näiteks [Maa-amet](http://www.maaamet.ee), Soomes [Maanmittauslaitos](http://www.maanmittauslaitos.fi/en/file_download_service). Tihtilugu on riiklikud andmekogud liiga detailsed või liiga keerulise struktuuriga, et mõne lihtsa probleemi jaoks neid kasutada. Ja kui probleem on piiriülene, siis ühe riigi andmetest ei piisa ja 99% erinevate riikide andmed omavahel kuidagi ka kokku ei käi.  
Õnneks pakuvad tasuta geoandmeid ka kogukonnapõhised ühendused nagu [OpenStreetMap](http://openstreetmap.org) (OSM andmete allalaadimise on teinud lihtsaks [geofabrik.de](http://www.geofabrik.de/)), [Natural Earth](http://www.naturalearthdata.com/), [GeoNames](http://www.geonames.org/).

Kuna hetkel on vaja Euroopa riikide pindasid, siis kõige lihtsam viis on kasutada [Natural Earth](http://www.naturalearthdata.com/) andmeid.

Laeme alla keskmise detailsusega riikide andmestiku:

	$ wget http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_countries.zip


## Andmete laadimine andmebaasi
Teeme PostgreSQL uue andmebaasi "dbname", lisame PostGIS laienduse (pgAdmin III):
	
	create extension postgis;

Pakime arhiivi  lahti ja laeme andmebaasi:
	
	$ unzip ne_50m_admin_0_countries.zip  
	$ shp2pgsql -s 4326 -W LATIN1 ne_50m_admin_0_countries.shp ne_50m_admin_0_countries | psql -h dbhost -d dbname -U dbuser
	
## Andmete töötlus
Selekteerime välja CGI riigid ja teisendame koordinaatsüsteemi [EPSG:3034](http://spatialreference.org/ref/epsg/3034/):

	create table cgi_europa_multi as  
	select gid,admin as country, ST_Transform(geom,3034) as geom from  
	ne_50m_admin_0_countries where adm0_a3 in  
	('EST','FIN','SWE','NOR','GBR','PRT','ESP','DNK','FRA','ITA','CHE','LUX','BEL','NLD','DEU','HUN','SVK','CZE','POL','UKR');  
	alter table cgi_europa_multi add primary key (gid);

Avame QGISi ja vaatame kuidas meie euroopa välja näeb:

![](https://dl.dropboxusercontent.com/u/36271555/scriptogram/2014.02.12.cgi_puzzle1.png)

Et riigid oleksid kompaktsed ja selgelt tuvastatavad, siis oleks vaja mõndadel riikidel väga perifeersed osad eemaldada (Prantsusmaa, Hispaania, Portugali, Hollandi, Norra kaugemal asuvad osad). Lammutame riikide pinnad lihtpindadeks:

	create table cgi_europa_simple as select gid, ST_GeometryN(geom,generate_series(1,ST_NumGeometries(geom))) AS geom FROM cgi_europa_multi;

Lisame tabeli cgi_europa_simple QGISi kihina, aktiveerime kihi muutmise, kustutame käsitsi üleliigsed pinnad ära, salvestame.  
Ühendame järgi jäänud pinnad riikideks uuesti kokku (et Saaremaa ikka Eesti saar oleks :)

	create table cgi_europa as  
	select t2.gid,t2.country,(  
	select ST_Multi(ST_Collect(geom)) from cgi_europa_simple t1 where t1.gid=t2.gid) AS geom from cgi_europa_multi t2;

Nüüd näeb meie kiht välja nii:

![](https://dl.dropboxusercontent.com/u/36271555/scriptogram/2014.02.12.cgi_puzzle2.png)

See on tulemus, mida soovisime. Geopusle mäng kasutab andmeallikana MySQL andmebaasi või GeoJSON faili, seega on vajalik konverteerida tulemus lihtsasti käsitletavasse vaheformaati. Ekspordime tabeli andmebaasist GeoJSON failiks:

	$ ogr2ogr -f "GeoJSON" cgi_eu_countries.json PG:"host=dbhost dbname=dbname user=dbuser port=dbport" "cgi_europa"

Nüüd on olemas fail, mille saab laadida pusle mängu.

