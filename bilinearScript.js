function ivect(ix, iy, w) {
      // byte array, r,g,b,a
      return (ix + w * iy) * 4;
    }

    function bilinear(srcImg, destImg, scalex, scaley) {
      function inner(f00, f10, f01, f11, x, y) {
        var un_x = 1.0 - x;
        var un_y = 1.0 - y;
        return (
          f00 * un_x * un_y + f10 * x * un_y + f01 * un_x * y + f11 * x * y
        );
      }
      var i, j;
      var iyv, iy0, iy1, ixv, ix0, ix1;
      var idxD, idxS00, idxS10, idxS01, idxS11;
      var dx, dy;
      var r, g, b, a;
      for (i = 0; i < destImg.height; ++i) {
        iyv = i / scaley;
        iy0 = Math.floor(iyv);
        iy1 =
          Math.ceil(iyv) > srcImg.height - 1
            ? srcImg.height - 1
            : Math.ceil(iyv);
        for (j = 0; j < destImg.width; ++j) {
          ixv = j / scalex;
          ix0 = Math.floor(ixv);
          ix1 =
            Math.ceil(ixv) > srcImg.width - 1
              ? srcImg.width - 1
              : Math.ceil(ixv);
          idxD = ivect(j, i, destImg.width);
          idxS00 = ivect(ix0, iy0, srcImg.width);
          idxS10 = ivect(ix1, iy0, srcImg.width);
          idxS01 = ivect(ix0, iy1, srcImg.width);
          idxS11 = ivect(ix1, iy1, srcImg.width);
          dx = ixv - ix0;
          dy = iyv - iy0;
          r = inner(
            srcImg.data[idxS00],
            srcImg.data[idxS10],
            srcImg.data[idxS01],
            srcImg.data[idxS11],
            dx,
            dy
          );
          destImg.data[idxD] = r;

          g = inner(
            srcImg.data[idxS00 + 1],
            srcImg.data[idxS10 + 1],
            srcImg.data[idxS01 + 1],
            srcImg.data[idxS11 + 1],
            dx,
            dy
          );
          destImg.data[idxD + 1] = g;

          b = inner(
            srcImg.data[idxS00 + 2],
            srcImg.data[idxS10 + 2],
            srcImg.data[idxS01 + 2],
            srcImg.data[idxS11 + 2],
            dx,
            dy
          );
          destImg.data[idxD + 2] = b;

          a = inner(
            srcImg.data[idxS00 + 3],
            srcImg.data[idxS10 + 3],
            srcImg.data[idxS01 + 3],
            srcImg.data[idxS11 + 3],
            dx,
            dy
          );
          destImg.data[idxD + 3] = a;
        }
      }
      for (var y = 0; y < destImg.height; y++) {
        for (var x = 0; x < destImg.width; x++) {
          var i = y * 4 * destImg.width + x * 4;
          var avg =
            (destImg.data[i] + destImg.data[i + 1] + destImg.data[i + 2]) / 3;
          destImg.data[i] = avg;
          destImg.data[i + 1] = avg;
          destImg.data[i + 2] = avg;
        }
      }
    }

    try {
      var loadCan = document.getElementById("load-canvas");
      var dispCan = document.getElementById("disp-canvas");

      var loadCtx = loadCan.getContext("2d");
      var dispCtx = dispCan.getContext("2d");

      var scalex = Number(localStorage.getItem("scalex"));
      var scaley = Number(localStorage.getItem("scaley"));

      var image_var = new Image();
      image_var.onload = function() {
        loadCan.setAttribute("width", image_var.width);
        loadCan.setAttribute("height", image_var.height);
        loadCan.style.position = "fixed";
        loadCan.width = image_var.width;
        loadCan.height = image_var.height;
        loadCtx.drawImage(image_var, 0, 0, image_var.width, image_var.height);

        var srcImg = loadCtx.getImageData(
          0,
          0,
          image_var.width,
          image_var.height
        );

        var newWidth = Math.ceil(image_var.width * scalex);
        var newHeight = Math.ceil(image_var.height * scaley);
        dispCan.width = newWidth;
        dispCan.height = newHeight;
        dispCan.setAttribute("width", newWidth);
        dispCan.setAttribute("height", newHeight);
        var destImg = dispCtx.createImageData(newWidth, newHeight);
        bilinear(srcImg, destImg, scalex, scaley);
        dispCtx.putImageData(destImg, 0, 0);
      };
      image_var.crossOrigin = "Anonymous";

      image_var.src = localStorage.getItem("image");
    } catch (error) {
      alert(error);
    }