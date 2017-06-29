var map;
var markers = [];
var locations = [
  {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

var locationsV = [];

// TODO: Complete the following function to initialize the map
var input;
var filterContent;
var largeInfowindow;
var highlightedIcon;
var defaultIcon;

function initMap() {
  var self = this;
  // TODO: use a constructor to create a new map JS object. You can use the coordinates
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.99802439999996},
    zoom: 13
  });
  // we used, 40.7413549, -73.99802439999996 or your own!


  largeInfowindow = new google.maps.InfoWindow();
  highlightedIcon = makeMarkerIcon('FFFF24');
  defaultIcon = makeMarkerIcon('0091ff');
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', markerClickListener);
    marker.addListener('mouseover', mouseOver);
    marker.addListener('mouseout', mouseOut);
    bounds.extend(markers[i].position);
  }
  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);
}

function markerClickListener () {
  var marker = this;
  populateInfoWindow(marker, largeInfowindow);
}

function mouseOver () {
  var marker = this;
  marker.setIcon(highlightedIcon);
}

function mouseOut () {
  var marker = this;
  marker.setIcon(defaultIcon);
}
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  }
}
function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function showInfo (place) {
  hideMarkers(markers);
  var marker = new google.maps.Marker({
    map: map,
    position: place.location,
    title: place.title,
    animation: google.maps.Animation.DROP,
  });
  var largeInfowindow = new google.maps.InfoWindow();
  var highlightedIcon = makeMarkerIcon('FFFF24');
  marker.setIcon(highlightedIcon);
  populateInfoWindow(marker, largeInfowindow);
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

function showFilter() {
  input = filterContent.toLowerCase();
  if (!input) {
    hideMarkers(markers);
    document.getElementById("lst").innerHTML = "<p>no results found</p>";
  } else {
    document.getElementById("lst").innerHTML = "<p></p>";
    hideMarkers(markers);
    var num = 0;
    var ind = 0;
    for (var i = 0; i < locations.length; i++) {
      if (locations[i].title.toLowerCase().indexOf(input) != -1) {
        var marker = new google.maps.Marker({
          map: map,
          position: locations[i].location,
          title: locations[i].title,
          animation: google.maps.Animation.DROP,
        });
        var largeInfowindow = new google.maps.InfoWindow();
        var highlightedIcon = makeMarkerIcon('FFFF24');
        marker.setIcon(highlightedIcon);
        populateInfoWindow(marker, largeInfowindow);
        locationsV[ind] = locations[i];
        ind++;
      } else {
        num++;
      }
    }
    if (num == locations.length) {
      document.getElementById("filter-lst").innerHTML = "<p>no results found</p>";
      return;
    }
    var htmlContent = "";
    for (var j = 0; j < locationsV.length; j++) {
      var loc = locationsV[j];
      htmlContent += '<button class="places" value="' + loc.title +
       '" data-bind="click: showInfo"></button><br>';
    }
    document.getElementById("filter-lst").innerHTML = htmlContent;
  }


}

var ViewModel = function() {

};

ko.applyBindings(new ViewModel());
