function init(){
		var canvas = document.getElementById("game_canvas");
		var ctx = game_canvas.getContext("2d");


		var img1 = new Image();
		img1.src = 'pacman10-hp-sprite.png';

		ctx.drawImage(img1, 322, 1, 464, 137, 0, 0, 464, 137);
		ctx.drawImage(img1, 82, 23, 14, 14, 36, 32, 14, 14);
}