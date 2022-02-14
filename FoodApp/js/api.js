if (!('BarcodeDetector' in window)) {
    console.log('Barcode Detector is not supported by this browser.');
  } else {
    console.log('Barcode Detector supported!');
  
    // create new detector
    var barcodeDetector = new BarcodeDetector({formats: ['code_39', 'codabar', 'ean_13', 'ean_8']});
  }

  // check supported types
BarcodeDetector.getSupportedFormats()
.then(supportedFormats => {
  supportedFormats.forEach(format => console.log(format));
});

barcodeDetector.detect(imageEl)
    .then(barcodes => {
        var text = document.querySelector('h1')
      barcodes.forEach(barcode => console.log(barcode.rawData));
      text.content = barcode.rawData
    })
    .catch(err => {
      console.log(err);
    });
    
console.log('are we connected?')

let barcode = '737628064502'
const endpoint = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json';


async function fetchData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data;
    } catch (err) {
        console.log(err)
    }
}



fetchData(endpoint).then(data => {
    console.log(data)
    // .insertAdjacentHTML('afterbegin', '<h1>' + data.product['nutriscore_data'] +'</h1>')

    const markup = `
    <img src="${data.product['image_front_url']}">
    <h2>
        ${data.product['product_name']}
    </h2>
    <ul>
        <li>Kcal: ${data.product['nutriments'].energy}</li>
        <li>Vetten: ${data.product['nutriments'].fat}</li>
        <li>Vezels: ${data.product['nutriments'].fiber}</li>
    </ul>
    `;

    document.body.innerHTML = markup;
})