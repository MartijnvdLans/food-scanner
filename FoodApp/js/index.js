window.onload = () => {
  detect();
};


async function detect() {
  const barcodeDetector = new BarcodeDetector();
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
            const newBarcode = barcode.rawValue;
            const getURL = 'https://world.openfoodfacts.org/api/v0/product/' + newBarcode + '.json'
            fetch(getURL).then(response => response.json())
            .then(response => {
        
                const product = {
                    name: response.product.product_name,
                    brand: response.product.brand_owner,
                    energy: response.product['nutriments'].energy_value,
                    carbo: response.product['nutriments'].carbohydrates,
                    fat: response.product['nutriments'].fat,
                    fiber: response.product['nutriments'].fiber,
                    proteins: response.product['nutriments'].proteins_value,
                    img: response.product.image_front_url
                }
        
                const markup = `
                <figure>
                   <img src=${product.img}>
                </figure>
                <h2>${product.name}</h2>
                <h3>${product.brand}</h3>
                <ul>
                    <li>Kcal:  ${product.energy}</li>
                    <li>Koolhydraten  ${product.carbo}</li>
                    <li>Vetten  ${product.fat}</li>
                    <li>Eiwitten  ${product.proteins}</li>
                    <li>Vezels  ${product.fiber}</li>
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