var loc_data;
var marker;
var infowindow;

function map(){

	navigator.geolocation.getCurrentPosition(post_loc);
}

function print_data(){

for(var i = 0; i < loc_data.length; i++){
		 	var entry = loc_data[i].login + " checked in at " + loc_data[i].lat + ", " + loc_data[i].lng 
		 								  + " on " + loc_data[i].created_at;
        	$("#login_sheet").prepend('<p>' + entry + '</p>');
			}
}


function post_loc(loc){

	var resp = new XMLHttpRequest();

	try{
		resp.onreadystatechange=function()
  		{
  			if (resp.readyState==4 && resp.status==200)
    		{
    			document.getElementById("login_sheet").innerHTML=resp.responseText;
    		}
  		}
		resp.open("POST", "https://calm-oasis-4814.herokuapp.com/sendlocation", true);	
		resp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		resp.setRequestHeader('Accept', 'application/json');
		resp.send("login=RichRumfelt&lat=" + loc.coords.latitude + "&lng=" + loc.coords.longitude);
	}
	catch(msg){
		console.log(msg);
	}
}