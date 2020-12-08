function readURL(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      localStorage.setItem("image", e.target.result);

      $(".image-upload-wrap").hide();

      $(".file-upload-image").attr("src", e.target.result);

      $(".file-upload-content").show();

      $(".image-title").html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}

function nextPage() {
  window.location.href = "main.html";
}

function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $(".file-upload-content").hide();
  $(".image-upload-wrap").show();
}
$(".image-upload-wrap").bind("dragover", function() {
  $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function() {
  $(".image-upload-wrap").removeClass("image-dropping");
});

function loadImage() {
  var image = localStorage.getItem("image");

  $(".image").attr("src", image);
}

function Bilinear() {
  var scalex = prompt(
    "Please enter horizontal factor"
  );
  var scaley = prompt(
    "Please enter vertical factor"
  );
  if (scalex != null && scaley != null) {
    localStorage.setItem("scalex", scalex);
    localStorage.setItem("scaley", scaley);
    window.location.href = "bilinear.html";
  }
}
function nearest() {
  var scalex = prompt(
    "Please enter horizontal factor"
  );
  var scaley = prompt(
    "Please enter vertical factor"
  );
  if (scalex != null && scaley != null) {
    localStorage.setItem("scalex", scalex);
    localStorage.setItem("scaley", scaley);
    window.location.href = "nearest.html";
  }
}
