
var markers = [];
var pixelx = screen.width;
var pixely = screen.height;
var map;
var flightPath;

var ib;

function initialize() {

	var myOptions = {
		zoom: 3,
		center: new google.maps.LatLng(49.2611, -123.2531),
		//mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
 	ib = new InfoBox();
 	google.maps.event.addListener(map, "click", function() { ib.close() });

	infowindow = new google.maps.InfoWindow({
    	content: "loading..."
	});

	flightPath = new google.maps.Polyline({
		path: [],
		strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3,
		geodesic: true
	});
	flightPath.setMap(map);


}

//(new google.maps.LatLng(venues[i].lat, venues[i].lng)


function drop() {
	clearMarkers();
	flightPath.setMap(map);
	for (var i = 0; i < dataSet.length; i++) {
		addMarkerWithTimeout(dataSet[i].latlng, i * 200, i);
	}

	for (var i = 0; i < dataSet.length; i++) {
		addLatLng(dataSet[i].latlng, i);
	}
}

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(location, i) {
	var path = flightPath.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.

  window.setTimeout(function() {
  	path.push(new google.maps.LatLng(location.lat, location.lng));
  },i * 200);

}

function addMarkerWithTimeout(location, timeout, index) {
	window.setTimeout(function() {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			//animation: google.maps.Animation.DROP,
			clickable: true,
			title: "Click for more info - STEVEN",
			//region may be weird, so we need a try catch
			html: "<p>" + dataSet[index].venueName + "</p>" + "<p>" + dataSet[index].venueDate + "</p>" + "<p>" + dataSet[index].venueCity + ", " + dataSet[index].venueRegion + ", " + dataSet[index].venueCountry + "</p>"

		});
		// Begin example code to get custom infobox
		var boxText = document.createElement("div");
		boxText.style.cssText = "color: white; border: 1px solid black; margin-top: 2px; background: grey; padding: 5px;";
		boxText.innerHTML = marker.html;


		var myOptions = {
			content: boxText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: {
				background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.1.12/examples/tipbox.gif') no-repeat"
				,opacity: 0.75
				,width: "280px"
			}
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size((pixelx-280)/2,pixely/2)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};
    // end example code for custom infobox

    google.maps.event.addListener(marker, "click", function (e) {
    	ib.setOptions(myOptions);
    	ib.open(map, this);
    });
    markers.push(marker);
}, timeout);


}

function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
	flightPath.setMap(null);
	flightPath.getPath().clear();

}

google.maps.event.addDomListener(window, 'load', initialize);
