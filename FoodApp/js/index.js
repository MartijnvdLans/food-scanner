window.onload = () => {
  detect();
};


async function detect() {
  const barcodeDetector = new BarcodeDetector();
  const list = document.getElementById("barcodes");
  let itemsFound = [];
  // const mediaStream = await navigator.mediaDevices.getUserMedia({
  //   video: {facingMode: { ideal: "environment"}, zoom: true}
  // });

  // const video = document.createElement("video");
  // video.srcObject = mediaStream;
  // video.autoplay = true;
  // video.videoWidth = "300px";
  // video.videoHeight = "300px"

  // list.before(video);

  let videoSourcesSelect = document.getElementById("video-source");
let videoPlayer = document.getElementById("player");

// Create Helper to ask for permission and list devices
let MediaStreamHelper = {
    // Property of the object to store the current stream
    _stream: null,
    // This method will return the promise to list the real devices
    getDevices: function() {
        return navigator.mediaDevices.enumerateDevices();
    },
    // Request user permissions to access the camera and video
    requestStream: function() {
        if (this._stream) {
            this._stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        const videoSource = videoSourcesSelect.value;
        const constraints = {
            video: {
                deviceId: videoSource ? {exact: videoSource} : undefined
            }
        };
    
        return navigator.mediaDevices.getUserMedia(constraints);
    }
};

// Request streams (audio and video), ask for permission and display streams in the video element
MediaStreamHelper.requestStream().then(function(stream){
  console.log(stream);
  // Store Current Stream
  MediaStreamHelper._stream = stream;

  // Select the Current Streams in the list of devices
  videoSourcesSelect.selectedIndex = [...videoSourcesSelect.options].findIndex(option => option.text === stream.getVideoTracks()[0].label);

  // Play the current stream in the Video element
  videoPlayer.srcObject = stream;
  
  // You can now list the devices using the Helper
  MediaStreamHelper.getDevices().then((devices) => {
      // Iterate over all the list of devices (InputDeviceInfo and MediaDeviceInfo)
      devices.forEach((device) => {
          let option = new Option();
          option.value = device.deviceId;

          // According to the type of media device
          switch(device.kind){
              // Append device to list of Cameras
              case "videoinput":
                  option.text = device.label || `Camera ${videoSourcesSelect.length + 1}`;
                  videoSourcesSelect.appendChild(option);
                  break;
          }

          console.log(device);
      });
  }).catch(function (e) {
      console.log(e.name + ": " + e.message);
  });
}).catch(function(err){
  console.error(err);
}); 


  function render() {
    barcodeDetector
      .detect(video)
      .then((barcodes) => {
        barcodes.forEach((barcode) => {
          if (!itemsFound.includes(barcode.rawValue)) {
            itemsFound.push(barcode.rawValue);
            const li = document.createElement("li");
            li.innerHTML = barcode.rawValue;
            const newBarcode = barcode.rawValue; 
            list.appendChild(li);
            const getURL = 'https://world.openfoodfacts.org/api/v0/product/' + newBarcode+ '.json'
            fetch(getURL).then(response => response.json())
            .then(response => {
                console.log(response.product)
        
                const product = {
                    name: response.product.product_name,
                    brand: response.product.brand_owner,
                    nutriscore: response.product.nutrient_levels.fat,
                    img: response.product.image_front_url
                }
        
                const markup = `
         <div class="person">
                <img src=${product.img}>
                <h2>${product.name} </h2>
            <h3>
                ${product.brand}
            </h3>
            <p class="location">${product.nutriscore}</p>
         </div>
        `;
        
        document.querySelector("main section:nth-of-type(2)").innerHTML = markup;    
            })
            .catch(error => document.body.insertAdjacentHTML('beforebegin', error))
          }
        });
      })
      .catch(console.error);
  }

// barcode getter

// const barcode = "li.innerHTML";

  (function renderLoop() {
    requestAnimationFrame(renderLoop);
    render();
  })();
}