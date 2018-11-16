	var nameArray, imgArray, descArray, ratingArray, latArr, lonArr;
	var directionsDisplay = null;
	var map;
	var markers = [], i;
	var currmarker;
	var partyUrl = "http://localhost/FuntimeParty.gpx";
	var studUrl = "http://localhost/Students.gpx";
	var businessUrl = "http://localhost/AfterWorkDrinks.gpx";
	var globalUrl;
	var awC, cC, ddC, edC, ftC, lmC, sbC, sC;
	var afterwork = document.getElementById("afterwork");
	var chilling = document.getElementById('chilling');
	var drinkdance = document.getElementById('drinkdance');
	var eatdance = document.getElementById('eatdrink');
	var funtime = document.getElementById('funtime');
	var livemusic = document.getElementById('livemusic');
	var sportsbar = document.getElementById("sportsbar");
	var students = document.getElementById('students');
	var routeArr;
	
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
		location.href = "#mapPlace";
		
	});
	
	
	

	});
	
	function check(){
		
	
	if(afterwork.checked == true && isNaN(awC)){
		dynamicW(businessUrl);
		awC = parseInt(1);
		alert(awC);
	}
	if(chilling.checked == true && isNaN(cC)){
		
		cC = parseInt(1);
	}
	if(drinkdance.checked == true && isNaN(ddC)){
		ddC = parseInt(ddC);
	}
	if(eatdrink.checked == true && isNaN(edC)){
			edC = parseInt(1);
	}
	if(funtime.checked == true && isNaN(ftC)){
		dynamicW(partyUrl);
		ftC = parseInt(1);
	}
	if(livemusic.checked == true && isNaN(lmC)){
		lmC = parseInt(1);
	}
	if(sportsbar.checked == true && isNaN(sbC)){
		sbC = parseInt(1);
	}
	if(students.checked == true && isNaN(sC)){
		dynamicW(studUrl);
		sC = parseInt(1);
		
	}
	
		
	}
	
	function getAllMark(){
		
		noPath(partyUrl);
	}

//initialise map
function initMap() {
					map = new google.maps.Map(document.getElementById('mapPlace'), {
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
	nameArray.unshift("University of Glasgow");
	imgArray.unshift("http://localhost/uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	console.log(imgArray);
	console.log(nameArray);

	

	

	
			latArr = [count+1];
			lonArr = [count+1];	
			var counter = 0;
				$(xml).find("trkpt").each(function() {
					var lat = parseFloat($(this).attr('lat'));
			var lon = parseFloat($(this).attr('lon'));


			latArr[counter] = $(this).attr('lat');
			lonArr[counter] = $(this).attr('lon');
			counter++;
			

				 
				});
				latArr.unshift("55.8721");
				lonArr.unshift("-4.2882");
				
				var locations = [count+1];
				
			
			for(var i = 0; i < count+1; i++){
			locations[i] =[
			nameArray[i], latArr[i], lonArr[i]
			];
			}
			//locations.unshift(["University of Glasgow", "55.8721", "-4.2882"])
			console.log(locations);
			
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
						

				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  //label: labels[labelIndex++ % labels.length],
				  map: map
				});
				markers.push(marker);
				
				var html;
				
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					infowindow.close();
				  return function() {
					  var r = Math.max(0, (Math.min(5, ratingArray[i])));
                          var z;
                          var starRating;
                          for (z = 0; z < r; z++){
                              starRating += "&#9733;";
                         }
					  
						  html = "<div><h3>" + nameArray[i] + "</h3><br><img style='width:200px; height=100px;'src='" + imgArray[i]
                              + "'></img><br><p>" + descArray[i] + "<br>"//<div style='display: inline-block; width: auto; white - space: nowrap;'>" 
                              + "<span style='color: #d3d3d3; position: absolute;'> &#9733;&#9733;&#9733;&#9733;&#9733;</span> "
                              + "<span style='color:#e9ce18; white-space: nowrap; overflow: hidden;position: absolute; width:65px;'>"
                              + starRating + "</span><br>" // </div >"
                                                            + "</div > ";
					  
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
			  
			  
			  //Draw paths
			  directionsService.route(request, function(result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					
				  directionsDisplay.setDirections(result);
				  
				}
			  });

	
		  }
		});
		}
		
		//Display all without route
		function noPath(URL){
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
	nameArray.unshift("University of Glasgow");
	imgArray.unshift("http://localhost/uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	console.log(imgArray);

	

	

	
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
			locations.unshift(["University of Glasgow", "55.8721", "-4.2882"])
			console.log(locations);
			
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true

				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  //label: labels[labelIndex++ % labels.length],
				  map: map
				});
				markers.push(marker);
				
				var html;
				
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
				  return function() {
					  var r = Math.max(0, (Math.min(5, ratingArray[i])));
                          var z;
                          var starRating;
                          for (z = 0; z < r; z++){
                              starRating += "&#9733;";
                         }
					  
						  html = "<div><h3>" + nameArray[i] + "</h3><br><img style='width:200px; height=100px;'src='" + imgArray[i]
                              + "'></img><br><p>" + descArray[i] + "<br>"//<div style='display: inline-block; width: auto; white - space: nowrap;'>" 
                              + "<span style='color: #d3d3d3; position: absolute;'> &#9733;&#9733;&#9733;&#9733;&#9733;</span> "
                              + "<span style='color:#e9ce18; white-space: nowrap; overflow: hidden;position: absolute; width:65px;'>"
                              + starRating + "</span><br>" // </div >"
                                                            + "</div > ";
															console.log(starRating);
					  
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
			  
			  
			  //Draw paths
			 

	
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
				directionsDisplay = null;
				
				
			  }

// Removes the markers from the map, but keeps them in the array.
		function clearMarkers() {
				setMapOnAll(null);
			  }
			  
//Delete markers
			  function deleteMarkers() {
				//clearMarkers();
				awC = undefined;
				cC = undefined;
				ddC = undefined;
				edC = undefined;
				ftC = undefined;
				lvC = undefined;
				sbC = undefined;
				sC = undefined;
				
				
				afterwork.checked = false;
				chilling.checked = false;
				drinkdance.checked = false;
				eatdrink.checked = false;
				funtime.checked = false;
				livemusic.checked = false;
				sportsbar.checked = false;
				students.checked = false;
				initMap();
				//markers = [];
				
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
		
		
		
		
		
		
