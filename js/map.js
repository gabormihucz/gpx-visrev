
  mapboxgl.accessToken = 'pk.eyJ1IjoicG9sYXJodW4iLCJhIjoiY2pvYTZhZWJ5MGIwZjNrbXBiNTd3amJnOSJ9.xIn7UgAKh1kF2zTRc6xnxA';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-8.044135, 37.063142],
    zoom: 16
  });

  function populateMap(data){
    var extracted = (data.features[0].geometry.coordinates[0]);
    console.log(extracted);
    map.flyTo({
          center: [extracted[0], extracted[1]]
      });
    // map.addLayer({
    //     "id": "route",
    //     "type": "line",
    //     "source": {
    //         "type": "geojson",
    //         "data": {
    //             "type": "Feature",
    //             "properties": {},
    //             "geometry": {
    //                 "type": "LineString",
    //                 "coordinates": coord
    //             }
    //         }
    //     },
    //     "layout": {
    //         "line-join": "round",
    //         "line-cap": "round"
    //     },
    //     "paint": {
    //         "line-color": "#ff69b4",
    //         "line-width": 8
    //     }
    // });
  }
