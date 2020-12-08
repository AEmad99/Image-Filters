var image = new SimpleImage(document.getElementById("upld"));
function upload(){
	var canvas = document.getElementById("can");
	image.drawTo(canvas);
}
function doRed(){
	var canvas = document.getElementById("can");
	var context = canvas.getContext("2d");
	for(var pixel of context.values()){

	}
}
function doGray(){

}
function doRainbow(){

}