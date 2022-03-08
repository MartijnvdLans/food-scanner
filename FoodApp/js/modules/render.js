export function showData(product) {
    const productMarkup = `
    <h1>${product.name}</h1>
    <img src="${product.img}" alt="${product.name}" />
    `;
    
    const content = document.querySelector('#content');
    content.innerHTML = productMarkup;
}