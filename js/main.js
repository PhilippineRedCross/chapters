      var chapterData = [];
      var chapterMap = L.map('map').setView([14, 122], 5);
      var chapterLayer = L.featureGroup().addTo(chapterMap);  
      var chapterIcon = L.icon({
        iconUrl: 'images/redcross.png',
        iconSize:     [20, 20], // size of the icon
        iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -14] // point from which the popup should open relative to the iconAnchor
      });
        L.tileLayer('https://{s}.tiles.mapbox.com/v3/examples.map-9ijuk24y/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>'
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
