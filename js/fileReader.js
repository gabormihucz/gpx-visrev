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
    isFull: function() {
      return size === length;
    },
    getCurrent: function() {
      return current;
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
      var check = true;
      if (queue.isFull()) {
        var retVal = confirm(
          "You will overwrite a preivous route.\nDo you wish to continue?"
        );
        if (retVal == true) {
          check = true;
        } else {
          check = false;
        }
      }
      if (check) {
        var dom = new DOMParser().parseFromString(reader.result, "text/xml");
        var json = toGeoJSON.gpx(dom);
        var colour = getColour();
        var values = populateMap(json, queue.getPointer(), colour);
        handleBoxes(queue.getPointer(), colour);
        populateChart(json);
        queue.push(values);
      }
    };

//Seems like readAsText() works with .gpx, and this way special characters remain
    reader.readAsText(file);
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }
});

document.getElementById("flyTo").addEventListener("click", function(e) {
  flyToNext(queue.getNext());
  if ($(".selected")[0]) {
    $(".selected").removeClass("selected");
  }
  $("#square" + queue.getCurrent()).addClass("selected");
});

function getColour() {
  var letters = "23456789ABCD";
  var colour = "#";
  for (var i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * letters.length)];
  }
  return colour;
}

function handleBoxes(index, colour) {
  if ($(".selected")[0]) {
    $(".selected").removeClass("selected");
  }
  var square = $("#square" + index);
  square.css("background-color", colour);
  square.addClass("selected");
}
