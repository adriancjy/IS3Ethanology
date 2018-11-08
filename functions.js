	var nameArray, imgArray, descArray, ratingArray, latArr, lonArr;
	var directionsDisplay = null;
	var map;
	var markers = [], i;
	var currmarker;
	var partyUrl = "http://localhost/FuntimeParty.gpx";
	var studUrl = "http://localhost/Students.gpx";
	var businessUrl = "http://localhost/AfterWorkDrinks.gpx";
	var globalUrl;
	
//Document ready
$(document).ready(function(){
    

	$('select').change(function(){
		
		var value = $('select').val();
		
		if(markers.length != 0){
		deleteMarkers();
		}
		if(value == 'party'){
			globalUrl = partyUrl;
		dynamicW(partyUrl);
		}else if(value == 'stud'){
			globalUrl = studUrl;
		dynamicW(studUrl);
		}else if(value == 'business'){
			globalUrl = businessUrl;
		dynamicW(businessUrl);
		}
		location.href = "#map";
		
	});
	

	});

//initialise map
function initMap() {
					map = new google.maps.Map(document.getElementById('map'), {
					  center: {lat: 55.8721, lng: -4.2882},
					  zoom: 14
					  
					});
					
					currmarker = new google.maps.Marker({
					position: {lat: 55.8721, lng: -4.2882},
					 draggable: true,
					animation: google.maps.Animation.DROP,
					map: map,
					
					});
					currmarker.addListener('click', toggleBounce);
				  }
				  function toggleBounce() {
				if (currmarker.getAnimation() !== null) {
				currmarker.setAnimation(null);
			  } else {
				currmarker.setAnimation(google.maps.Animation.BOUNCE);
			  }
			}
	
//Setting gpx according to the select option
	function dynamicW(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('name').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			imgArray = [count+1];
			nameArray = [count+1];
			descArray = [count+1];
			ratingArray = [count+1];
			
	for(var i = 0; i < count; i++){
		var result = name.split(',');
		var imgrs = img.split(',');
		var descrs = description.split('/');
		var ratingrs = rating.split(',');
		
		
		//array.push(result[i]);
		nameArray[i] = result[i];
		imgArray[i] = imgrs[i];
		descArray[i] = descrs[i];
		ratingArray[i] = ratingrs[i];
		
	}
	nameArray.push("University of Glasgow");
	imgArray.push("http://localhost/uog.jpg");
	descArray.push("Best school ever");
	ratingArray.push("5.0");

	

	

	
			latArr = [count];
			lonArr = [count];	
			var counter = 0;
				$(xml).find("trkpt").each(function() {
					var lat = parseFloat($(this).attr('lat'));
			var lon = parseFloat($(this).attr('lon'));


			latArr[counter] = $(this).attr('lat');
			lonArr[counter] = $(this).attr('lon');
			counter++;


				 
				});
				
				var locations = [count+1];
				
			
			for(var i = 0; i < count; i++){
			locations[i] =[
			nameArray[i], latArr[i], lonArr[i]
			];
			}
			locations.push(["University of Glasgow", "55.8721", "-4.2882"])
			console.log(locations);
			
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true

				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();

			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  map: map
				});
				markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker, i) {
				  return function() {
					  
					  
						  var html = "<div><h3>" + nameArray[i] + "</h3><br><img style='width:200px; height=100px;'src='" + imgArray[i] 
						  + "'></img><br><p>" + descArray[i] + "</p><br><p>" + ratingArray[i] + "</p></div>";
					  
					infowindow.setContent(html);
					infowindow.open(map, marker, html);
				  }
				})(marker, i));
				if (i == 0) request.origin = marker.getPosition();
				else if (i == locations.length - 1) request.destination = marker.getPosition();
				else {
				  if (!request.waypoints) request.waypoints = [];
				  request.waypoints.push({
					location: marker.getPosition(),
					stopover: true
				  });
				}

			  }
			  directionsService.route(request, function(result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
				  directionsDisplay.setDirections(result);
				}
			  });

	
		  }
		});
		}
		
		function dynamicD(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('name').text();
			var img = $(xml).find('img').text();
			nameArray = [count+1];
			
	for(var i = 0; i < count; i++){
		var result = name.split(',');
		
		
		//array.push(result[i]);
		nameArray[i] = result[i];
		
	}
	nameArray.push("University of Glasgow");
	console.log(nameArray);
	

	
			latArr = [count];
			lonArr = [count];	
			var counter = 0;
				$(xml).find("trkpt").each(function() {
					var lat = parseFloat($(this).attr('lat'));
			var lon = parseFloat($(this).attr('lon'));


			latArr[counter] = $(this).attr('lat');
			lonArr[counter] = $(this).attr('lon');
			counter++;


				 
				});
				
				var locations = [count+1];
				
			
			for(var i = 0; i < count; i++){
			locations[i] =[
			nameArray[i], latArr[i], lonArr[i]
			];
			}
			locations.push(["University of Glasgow", "55.8721", "-4.2882"])
			console.log(locations);
			
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true

				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();

			  
			  var request = {
				travelMode: google.maps.TravelMode.DRIVING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  map: map
				});
				markers.push(marker);

				google.maps.event.addListener(marker, 'click', (function(marker, i) {
				  return function() {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);
				  }
				})(marker, i));
				if (i == 0) request.origin = marker.getPosition();
				else if (i == locations.length - 1) request.destination = marker.getPosition();
				else {
				  if (!request.waypoints) request.waypoints = [];
				  request.waypoints.push({
					location: marker.getPosition(),
					stopover: true
				  });
				}

			  }
			  directionsService.route(request, function(result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
				  directionsDisplay.setDirections(result);
				}
			  });

	
		  }
		});
		}
//Set map = null
		function setMapOnAll(map) {

				for (var i = 0; i < markers.length; i++) {
				markers[i].setPosition(null);
				
				  markers[i].setMap(map);
				  
				}
				directionsDisplay.setMap(null);
				
				
			  }

// Removes the markers from the map, but keeps them in the array.
		function clearMarkers() {
				setMapOnAll(null);
			  }
			  
//Delete markers
			  function deleteMarkers() {
				clearMarkers();
				markers = [];
			  }
			  
			  

			
				  
				  window.onscroll = function() {scrollFunction()};

//detect how much user sc
		function scrollFunction() {
			if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
				document.getElementById("myBtn").style.display = "block";
			} else {
				document.getElementById("myBtn").style.display = "none";
			}
		}

		// When the user clicks on the button, scroll to the top of the document
		function topFunction() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}
		
		function wChecked(checkbox){
			if(checkbox.checked == true){
				if(markers.length != 0){
					deleteMarkers();
				}
				dynamicW(globalUrl);
				
				
			}
		}
		
		function dChecked(checkbox) {
			if(checkbox.checked == true){
				if(markers.length != 0){
					deleteMarkers();
				}
				dynamicD(globalUrl);
			}
		}
		
		
