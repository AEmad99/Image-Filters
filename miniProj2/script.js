function doColor(){
	var canvas = document.getElementById("d1");
	var context = canvas.getContext("2d");

	var color = document.getElementById("clr1");
	var colorVal = color.value;

	canvas.style.backgroundColor = colorVal;
}

function doColor2(){
	var canvas = document.getElementById("d1");
	var context = canvas.getContext("2d");

	var color = document.getElementById("clr2");
	var colorVal = color.value;

	canvas.style.backgroundColor = colorVal;
}
function doSize(){
	var canvas = document.getElementById("d1");
	var context = canvas.getContext("2d");

	var sliderNabulsi = document.getElementById("nabulsi");
	var nabulsiSize = sliderNabulsi.value;

	context.clearRect(0,0,canvas.width,canvas.height);
	context.fillRect("0","0",nabulsiSize,nabulsiSize);
}
function doDisplay(){
	var canvas = document.getElementById("d1");
	var context = canvas.getContext("2d");

	var pic = document.getElementById("myFile");
	var picVal = pic.value;

	var img = new SimpleImage(pic);

	img.drawTo(canvas);
}