var scalex = Number(localStorage.getItem("scalex"));
var scaley = Number(localStorage.getItem("scaley"));
// canvas1 will be handled by the gpu
const canvas1 = document.createElement("canvas");
canvas1.className = "c1";
const context1 = canvas1.getContext("webgl2");
const gpu = new GPU({
  canvas: canvas1,
  webGl: context1
});
document.body.appendChild(canvas1);

// canvas2 will render the image
const canvas2 = document.createElement("canvas");
canvas2.className = "c2";
const context2 = canvas2.getContext("2d");
//document.body.appendChild(canvas2);
canvas2.style.transform = "scale(" + scalex + "," + scaley + ")";

// load the image
const image = new Image();
image.crossOrigin = "Anonymous";
image.src = localStorage.getItem("image");

image.onload = function() {
  // render image to canvas2
  canvas2.width = image.width;
  canvas2.height = image.height;
  context2.drawImage(image, 0, 0);
  const imgData = context2.getImageData(0, 0, image.width, image.height);
  for (var y = 0; y < imgData.height; y++) {
    for (var x = 0; x < imgData.width; x++) {
      var i = y * 4 * imgData.width + x * 4;
      var avg =
        (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
      imgData.data[i] = avg;
      imgData.data[i + 1] = avg;
      imgData.data[i + 2] = avg;
    }
  }
  const gpuRender = gpu
    .createKernel(
      function(sprite) {
        var x = floor(this.thread.x / this.constants.sx) * 4;
        var y =
          floor(this.constants.h - this.thread.y / this.constants.sy) *
          4 *
          this.constants.w;
        var index = x + y;
        var r = sprite[index] / 255;
        var g = sprite[index + 1] / 255;
        var b = sprite[index + 2] / 255;
        var a = sprite[index + 3] / 255;
        this.color(r, g, b, a);
      },
      {
        constants: {
          w: image.width,
          h: image.height,
          sx: scalex,
          sy: scaley
        }
      }
    )
    .setOutput([image.width * scalex, image.height * scaley])
    .setGraphical(true);

  gpuRender(imgData.data);
};
