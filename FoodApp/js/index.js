window.onload = () => {
    detect();
  };
  
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
            }
          });
        })
        .catch(console.error);
    }

  
    (function renderLoop() {
      requestAnimationFrame(renderLoop);
      render();
    })();
  }
  
//   console.log('are we connected?')

// let barcode = '737628064502'
// const endpoint = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';


// async function fetchData(url) {
//     try {
//         const response = await fetch(url)
//         const data = await response.json()
//         return data;
//     } catch (err) {
//         console.log(err)
//     }
// }



// fetchData(endpoint).then(data => {
//     console.log(data)
//     // .insertAdjacentHTML('afterbegin', '<h1>' + data.product['nutriscore_data'] +'</h1>')

//     const markup = `
//     <img src="${data.product['image_front_url']}">
//     <h2>
//         ${data.product['product_name']}
//     </h2>
//     <ul>
//         <li>Kcal: ${data.product['nutriments'].energy}</li>
//         <li>Vetten: ${data.product['nutriments'].fat}</li>
//         <li>Vezels: ${data.product['nutriments'].fiber}</li>
//     </ul>
//     `;

//     document.body.querySelector('.app').innerHTML = markup;
// })