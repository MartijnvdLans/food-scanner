export function loadingState() {
    const loadMarkup = `
            <figure class="mockup">
            </figure>
            <h2 class="mockup">${product.name}</h2>
            <h3 class="mockup">${product.brand}</h3>
            <ul>
               <li class="mockup">Kcal:  ${product.energy}</li>
               <li class="mockup">Koolhydraten  ${product.carbo}</li>
               <li class="mockup">Vetten  ${product.fat}</li>
               <li class="mockup">Eiwitten  ${product.proteins}</li>
               <li class="mockup">Vezels  ${product.fiber}</li>
             </ul>
    `;

    const content = document.querySelector('#content');
    content.innerHTML = loadMarkup;
}