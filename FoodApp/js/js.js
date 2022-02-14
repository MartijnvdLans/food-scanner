 var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

window.onload = () => {
    detect();
}

async function detect() {
    const barcodeDetector = new BarcodeDetector();
        const list = document.getElementById("barcodes");
        let itemsFound = [];
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
    
        const video = document.createElement("video");
        video.srcObject = mediaStream;
        video.autoplay = true;
    
        list.before(video);
}

function render() {
          barcodeDetector
            .detect(video)
            .then((barcodes) => {
              barcodes.forEach((barcode) => {
                if (!itemsFound.includes(barcode.rawValue)) {
                  itemsFound.push(barcode.rawValue);
                  const li = document.createElement("li");
                  li.innerHTML = barcode.rawValue;
                  list.appendChild(li);
                }
              });
            })
            .catch(console.error);
        }

        (function renderLoop() {
            requestAnimationFrame(renderLoop);
            render();
          })();

// window.onload = () => {
    //     detect();
    //   };
    
    //   async function detect() {
        // const barcodeDetector = new BarcodeDetector();
        // const list = document.getElementById("barcodes");
        // let itemsFound = [];
        // const mediaStream = await navigator.mediaDevices.getUserMedia({
        //   video: { facingMode: "environment" }
        // });
    
        // const video = document.createElement("video");
        // video.srcObject = mediaStream;
        // video.autoplay = true;
    
        // list.before(video);
    
    //     function render() {
    //       barcodeDetector
    //         .detect(video)
    //         .then((barcodes) => {
    //           barcodes.forEach((barcode) => {
    //             if (!itemsFound.includes(barcode.rawValue)) {
    //               itemsFound.push(barcode.rawValue);
    //               const li = document.createElement("li");
    //               li.innerHTML = barcode.rawValue;
    //               list.appendChild(li);
    //             }
    //           });
    //         })
    //         .catch(console.error);
    //     }
    
    //     (function renderLoop() {
    //       requestAnimationFrame(renderLoop);
    //       render();
    //     })();
    //   }