var fileInput = document.getElementById("fileInput");

var createQueue = function(length) {
  var pointer = 0,
    buffer = [];

  return {
    get: function(index) {
      return buffer[index];
    },
    push: function(item) {
      buffer[pointer] = item;
      pointer = (length + pointer + 1) % length;
    }
  };
};

fileInput.addEventListener("change", function(e) {
  var queue = createQueue(5);
  var file = fileInput.files[0];
  var fileType = ".gpx";
  if (file.name.includes(fileType)) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var dom = new DOMParser().parseFromString(reader.result, "text/xml");
      var json = toGeoJSON.gpx(dom);
      populateMap(json, 0);
    };

    reader.readAsBinaryString(file);
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }
});
