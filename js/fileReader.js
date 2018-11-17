var fileInput = document.getElementById("fileInput");

var createQueue = function(length) {
  var pointer = 0,
    size = 0,
    current = 0,
    ll = [];

  return {
    getNext: function() {
      current = (size + current + 1) % size;
      var out = ll[current];
      return out;
    },
    push: function(item1) {
      current = pointer;
      ll[pointer] = item1;
      pointer = (length + pointer + 1) % length;
      if (size < length) {
        size++;
      }
    },
    getPointer: function() {
      return pointer;
    }
  };
};

var queue = createQueue(5);

fileInput.addEventListener("change", function(e) {
  var file = fileInput.files[0];
  var fileType = ".gpx";
  if (file.name.includes(fileType)) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var dom = new DOMParser().parseFromString(reader.result, "text/xml");
      var json = toGeoJSON.gpx(dom);
      var values = populateMap(json, queue.getPointer());
      queue.push(values);
    };

    reader.readAsBinaryString(file);
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }
});

document.getElementById("flyTo").addEventListener("click", function(e) {
  flyToNext(queue.getNext());
});
