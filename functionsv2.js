	
	var directionsDisplay = null;
	var map;
	var markers = [], i;
	var currmarker;
	var partyUrl = "FuntimeParty.gpx";
	var studUrl = "Students.gpx";
	var awUrl = "AWD.gpx";
	var masterUrl = "Master.gpx";
	var ddUrl = "DrinkingAndDancing.gpx";
	var edUrl = "EatingAndDrinking.gpx";
	var lmUrl = "LiveMusic.gpx";
	var sbUrl = "SportsBar.gpx";
	var cUrl = "ChillingWithMates.gpx";
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
		
		afterworkM(awUrl);
		awC = parseInt(1);
	}
	if(chilling.checked == true && isNaN(cC)){
		chillingM(cUrl);
		cC = parseInt(1);
	}
	if(drinkdance.checked == true && isNaN(ddC)){
		drinkdanceM(ddUrl);
		ddC = parseInt(1);
	}
	if(eatdrink.checked == true && isNaN(edC)){
		eatdrinkM(edUrl);
			edC = parseInt(1);
	}
	if(funtime.checked == true && isNaN(ftC)){
		funtimeM(partyUrl);
		ftC = parseInt(1);
	}
	if(livemusic.checked == true && isNaN(lmC)){
		livemusicM(lmUrl);
		lmC = parseInt(1);
	}
	if(sportsbar.checked == true && isNaN(sbC)){
		sportsbarM(sbUrl);
		sbC = parseInt(1);
	}
	if(students.checked == true && isNaN(sC)){
		studentsM(studUrl);
		sC = parseInt(1);
		
	}
	
		
	}
	
	function getAllMark(){
		
		noPath(masterUrl);
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
	function afterworkM(URL){
		console.log("in");
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  
		  success: function(xml) {
			  
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	

			var latArr = [count+1];
			var lonArr = [count+1];	
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
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var secondlabel = 'AW'
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  label: secondlabel + labels[labelIndex++ % labels.length],
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
		
		function chillingM(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	

			var latArr = [count+1];
			var lonArr = [count+1];	
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
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var secondlabel = 'C'
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  label: secondlabel + labels[labelIndex++ % labels.length],
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
		
		function drinkdanceM(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	

			var latArr = [count+1];
			var lonArr = [count+1];	
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
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var secondlabel = 'DD';
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  label: secondlabel + labels[labelIndex++ % labels.length],
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
		
		function eatdrinkM(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	

			var latArr = [count+1];
			var lonArr = [count+1];	
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
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var secondlabel = 'ED';
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  label: secondlabel + labels[labelIndex++ % labels.length],
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
		
		function funtimeM(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	console.log(nameArray);
	console.log(imgArray);
	console.log(descArray);
	console.log(ratingArray);

			var latArr = [count+1];
			var lonArr = [count+1];	
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
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var secondlabel = 'FTP';
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  label: secondlabel + labels[labelIndex++ % labels.length],
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
		
		function livemusicM(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	

			var latArr = [count+1];
			var lonArr = [count+1];	
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
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var secondlabel = 'LM';
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  label: secondlabel + labels[labelIndex++ % labels.length],
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
		
		function sportsbarM(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	

			var latArr = [count+1];
			var lonArr = [count+1];	
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
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var secondlabel = 'SB';
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  label: secondlabel + labels[labelIndex++ % labels.length],
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
		
		function studentsM(URL){
        $.ajax({
		  type: "GET",
		  url: URL,
		  dataType: "xml",
		  success: function(xml) {
			var points = [];
			var bounds = new google.maps.LatLngBounds ();
			var count = parseInt($(xml).find('count').text());
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	

			var latArr = [count+1];
			var lonArr = [count+1];	
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
			

			var geocoder;

			var directionsService = new google.maps.DirectionsService();

			directionsDisplay = new google.maps.DirectionsRenderer({
						suppressMarkers: true,
						suppressInfoWindows: true
				   }); 

			directionsDisplay.setMap(map);
			  var infowindow = new google.maps.InfoWindow();
			var labels = '123456789';
			var secondlabel = 'ST';
			var labelIndex = 0;
			  
			  var request = {
				travelMode: google.maps.TravelMode.WALKING
			  };
			  for (i = 0; i < locations.length; i++) {
				var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				  				  label: secondlabel + labels[labelIndex++ % labels.length],
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
			var name = $(xml).find('pname').text();
			var img = $(xml).find('img').text();
			var description = $(xml).find('desc').text();
			var rating = $(xml).find('rating').text();
			console.log(rating);
			var imgArray = [count+1];
			var nameArray = [count+1];
			var descArray = [count+1];
			var ratingArray = [count+1];
			
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
		nameArray[1] = result[1].substring(5, 8);
		
		
	}
	nameArray.unshift("University of Glasgow");
	imgArray.unshift("uog.jpg");
	descArray.unshift("Best school ever");
	ratingArray.unshift("5.0");
	console.log(nameArray);
	

			var latArr = [count+1];
			var lonArr = [count+1];	
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
		
		
		
		
		
		
