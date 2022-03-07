window.onload = () => {
  detect();
};


async function detect() {
  const barcodeDetector = new BarcodeDetector();
  const list = document.getElementById("barcodes");
  const videoPlace = document.querySelector("main section:first-of-type div");
  let itemsFound = [];
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  });

  const video = document.createElement("video");
  video.srcObject = mediaStream;
  video.autoplay = true;
  video.videoWidth = "100vw";
  video.videoHeight = "200px"

  videoPlace.before(video);


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
            const getURL = 'https://world.openfoodfacts.org/api/v0/product/' + newBarcode + '.json'
            fetch(getURL).then(response => response.json())
            .then(response => {
        
                const product = {
                    name: response.product.product_name,
                    brand: response.product.brand_owner,
                    energy: response.product['nutriements'].energy_value,
                    carbo: response.product['nutriements'].carbohydrates,
                    fat: response.product['nutriements'].fat,
                    fiber: response.product['nutriements'].fiber,
                    proteins: response.product['nutriements'].proteins_value,
                    img: response.product.image_front_url
                }
        
                const markup = `
                <figure>
                   <img src=${product.img}>
                </figure>
                <h2>${product.name}</h2>
                <h3>${product.brand}</h3>
                <ul>
                  <li>${product.energy}<li>
                  <li>${product.carbo}<li>
                  <li>${product.fat}<li>
                  <li>${product.fiber}<li>
                  <li>${product.proteins}<li>
                </ul>
                `;
        
        document.querySelector("#content").innerHTML = markup;    
            })
            .catch(error => document.body.insertAdjacentHTML('beforebegin', error))
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