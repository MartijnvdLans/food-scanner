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
      barcodes.forEach(barcode => console.log(barcode.rawData));
    })
    .catch(err => {
      console.log(err);
    })