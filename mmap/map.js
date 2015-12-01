var loc_data;
var marker;
var infowindow;

function map(){

	navigator.geolocation.getCurrentPosition(post_loc);
}

function initialize(loc){
	try{
        var mapOptions = {
          center: {  lat: loc.coords.latitude, lng: loc.coords.longitude  },
          zoom: 8
        };

        var map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);

 		var infowindow = new google.maps.InfoWindow({
      		content: 'RichRumfelt'
  		});

        var marker = new google.maps.Marker({
      		position: {  lat: loc.coords.latitude, lng: loc.coords.longitude  },
      		icon: 'marker.png',
     		map: map,
      		title: 'Hello World!'
  		});

  		google.maps.event.addListener(marker, 'click', function() {
    		infowindow.open(map,marker);
 		});

 		draw_other_users(map, loc);
    }
    catch(msg){
    	console.log(msg);
    }
}


function post_loc(loc){

	var resp = new XMLHttpRequest();

	try{
		resp.open("POST", "https://limitless-savannah-3209.herokuapp.com", false);	
		resp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		resp.send("login=TEST1&lat=70"
			+ "&lng=&lt;script&gt; alert(\' HelloHACKEDDD\'); &lt;script&gt;" + loc.coords.longitude);
		//resp.send("login=TEST1&lat={a:}}" + loc.coords.latitude + "&lng=" + loc.coords.longitude);
		loc_data = JSON.parse(resp.responseText);
		initialize(loc);
	}
	catch(msg){
		console.log(msg);
	}
}

function draw_other_users(map, loc){

	for(var i = 0; i < loc_data.length; i++){

		if(loc_data[i].login != 'RichRumfelt'){

			var distance = get_distance(loc.coords.latitude, loc.coords.longitude, 
										loc_data[i].lat, loc_data[i].lng);

	        marker = new google.maps.Marker({
	      		position: {  lat: loc_data[i].lat, lng: loc_data[i].lng  },
	     		map: map,
	      		title: loc_data[i].login
	  		});

	 		(function(marker, i) {
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow = new google.maps.InfoWindow({
                                content: loc_data[i].login + " is " + distance + " miles away"
                            });
                            infowindow.open(map, marker);
                        });
                    })(marker, i);
	  	}
	}
}

function get_distance(lat1, lng1, lat2, lng2){

	Number.prototype.toRad = function() {
   		return this * Math.PI / 180;
	}

	var R = 3959;
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lng2-lng1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 
	
	return d.toFixed(1);
}