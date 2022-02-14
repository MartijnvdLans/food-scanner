 var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      video.facingMode = "environment"
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}