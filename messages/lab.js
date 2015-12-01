function parse(){

	var data = new XMLHttpRequest();

	data.onreadystatechange = function()
	{
		try{
			if(data.readyState == 4 && data.status == 200)
			{
				var messages = JSON.parse(data.responseText);
				display_messages(messages);
			}
		}
		catch(msg){
			console.log(msg);
		}
	}

	try{
		data.open("GET", "data.json", true);	
		data.send(null);
	}
	catch(msg){
		console.log(msg);
	}
}

function display_messages(messages){
		var element = document.getElementById("messages");
		element.className = "messages";

		for(var i = 0; i < messages.length; i++){
			var li = document.createElement("li");
			li.className = "messages";
			element.appendChild(li);
			li.innerHTML = messages[i].content + " " + messages[i].username + "</br>";

		}
}