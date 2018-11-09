window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
      var fileType = ".gpx";
      if (file.name.includes(fileType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
          var dom = (new DOMParser()).parseFromString(reader.result, 'text/xml');
          console.log(JSON.stringify(toGeoJSON.gpx(dom)));
        }

        reader.readAsBinaryString(file);
      } else {
        fileDisplayArea.innerText = "File not supported!"
      }
    });
}
