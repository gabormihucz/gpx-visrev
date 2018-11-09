
  mapboxgl.accessToken = 'pk.eyJ1IjoicG9sYXJodW4iLCJhIjoiY2pvYTZhZWJ5MGIwZjNrbXBiNTd3amJnOSJ9.xIn7UgAKh1kF2zTRc6xnxA';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [8.9511, 46.0037],
    zoom: 16
  });

  var coord = [
      [8.95168307237327098846435546875, 46.003257147967815399169921875],
      [8.95168055780231952667236328125, 46.00324717350304126739501953125],
      [8.95173990167677402496337890625, 46.0030994005501270294189453125],
      [8.95151794888079166412353515625, 46.0030053555965423583984375],
      [8.95139238797128200531005859375, 46.002952717244625091552734375]
  ];
  map.on('load', function () {
  map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
          "type": "geojson",
          "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": coord
              }
          }
      },
      "layout": {
          "line-join": "round",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#ff69b4",
          "line-width": 8
      }
  });
});
