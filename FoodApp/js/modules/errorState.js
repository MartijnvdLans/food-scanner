export function errorState() {
    const errMarkup = `
    <figure class="error">
    </figure>
    <h2 class="error">ERROR: Er is iets mis gegaan scan opnieuw</h2>
    `;

    const content = document.querySelector('#content');
    content.innerHTML = errMarkup;
}