window.onload = function() {
  var fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", function(e) {
    var file = fileInput.files[0];
    var fileType = ".gpx";
    if (file.name.includes(fileType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var dom = new DOMParser().parseFromString(reader.result, "text/xml");
        var json = toGeoJSON.gpx(dom);
        populateMap(json);
      };

      reader.readAsBinaryString(file);
    } else {
      fileDisplayArea.innerText = "File not supported!";
    }
  });
};
