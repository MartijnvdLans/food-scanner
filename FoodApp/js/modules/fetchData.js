import { errorState } from "./errorState.js";

export function getData(barcode) {
    const URL = 'https://world.openfoodfacts.org/api/v0/product/'

    return fetch(URL + barcode)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then((data) => {
        if (data.status) {
            const product = {
                name: data.product.product_name,
                brand: data.product.brand_owner,
                energy: data.product['nutriments'].energy_value,
                carbo: data.product['nutriments'].carbohydrates,
                fat: data.product['nutriments'].fat,
                fiber: data.product['nutriments'].fiber,
                proteins: data.product['nutriments'].proteins_value,
                img: data.product.image_front_url
            }
            return product;
        } else {
            errorState()
        }
    })
    .catch((err) => { 
        console.warn(err);
    });
}