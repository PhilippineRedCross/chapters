var chapterData = [];
var mapHeight = $(window).height() -90;
$("#map").height(mapHeight);
var chapterMap = L.map('map',{zoomControl:false}).setView([11, 121], 4);
var chapterLayer = L.featureGroup().addTo(chapterMap);  

L.control.zoom({position: 'topright'} ).addTo(chapterMap);


var chapterIcon = L.icon({
  iconUrl: 'images/redcross.png',
  iconSize:     [20, 20], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, -14] // point from which the popup should open relative to the iconAnchor
});
      
var tileLayerUrl = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
var attribution = 'Map data &copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a> | Map style by <a href="http://hot.openstreetmap.org" target="_blank">H.O.T.</a> | &copy; <a href="http://www.redcross.org.ph/" title="Philippine Red Cross" target="_blank">Philippine Red Cross</a> 2014 | <a title="Disclaimer" onClick="showDisclaimer();">Disclaimer</a>';

L.tileLayer(tileLayerUrl, {
  maxZoom: 18,
  attribution: attribution,
}).addTo(chapterMap);




        function getChapterData() {
          $.ajax({
            type: 'GET',
            url: 'data/PRC_Chapters/PRC_chapters.json',
            contentType: 'application/json',
            dataType: 'json',
            timeout: 10000,
            success: function(data) {
              console.log("Success!");
              chapterData = data;
              mapChapterdata();

            },
            error: function(e) {
              console.log(e);
            }
          });
        }

        function zoomOut(){
          var markersBounds = chapterLayer.getBounds();
          chapterMap.fitBounds(markersBounds);   
        }

        function mapChapterdata(){
          var chapterMarkers = L.geoJson(chapterData, {
            pointToLayer: function (feature, latlng) {
              return L.marker(latlng,{icon: chapterIcon});
            },  
            onEachFeature: onEachChapter         
          });

          chapterLayer.addLayer(chapterMarkers);

          var markersBounds = chapterLayer.getBounds();
          chapterMap.fitBounds(markersBounds);  
        };

        function onEachChapter(feature, layer){
          layer.bindPopup(feature.properties.Chapter);
        }

        getChapterData();

// show disclaimer text on click of dislcaimer link
function showDisclaimer() {
    window.alert("The maps on this page do not imply the expression of any opinion on the part of the Philippine Red Cross concerning the legal status of a territory or of its authorities.");
}
// adjust map div height on screen resize
$(window).resize(function(){
 mapHeight=$(window).height() -90;
$("#map").height(mapHeight);
});