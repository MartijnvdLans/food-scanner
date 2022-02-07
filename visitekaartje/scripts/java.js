var kaart = document.querySelector(".seal");
var openKaartje = document.querySelector(".driehoek_boven");
var visiteKaartje = document.querySelector(".visitekaartje");
var visiteKaartjeInner = document.querySelector(".inner_section");

var kaartOpen = false;

var htmlKnop = document.querySelector(".htmlb");
var cssKnop = document.querySelector(".cssb");
var jsKnop = document.querySelector(".javasb");

var kader = document.querySelector(".kader");

var htmlEnabled = false;
var cssEnabled = false;
var jsEnabled = false;

function openKaart() {
    if (kaartOpen === true) {
        openKaartje.classList.remove("open_me");
        visiteKaartje.classList.remove("delay");
        visiteKaartjeInner.classList.remove("zoom_in");
        kaartOpen = false;
    }
    else {
        openKaartje.classList.add("open_me");
        visiteKaartje.classList.add("delay");
        visiteKaartjeInner.classList.add("zoom_in");
        kaartOpen = true;
    }
}

// function sluitKaart() {

// }

function openHTML() {
    if (htmlEnabled === true) {
        htmlEnabled = false;
        kader.classList.remove("html_open");

    }
    else {
        kader.classList.add("html_open");
        kader.classList.remove("css_open");
        kader.classList.remove("javas_open");
        htmlEnabled = true;
        cssEnabled = false;
        jsEnabled = false;
    }

}

function openCSS() {
    if (cssEnabled === true) {
        cssEnabled = false;
        kader.classList.remove("css_open");
    }
    else {
        kader.classList.remove("html_open");
        kader.classList.add("css_open");
        kader.classList.remove("javas_open");
        cssEnabled = true;
        htmlEnabled = false;
        jsEnabled = false;
    }
}

function openJS() {
    if (jsEnabled === true) {
        jsEnabled = false;
        kader.classList.remove("javas_open");
    }
    else {
        kader.classList.remove("html_open");
        kader.classList.remove("css_open");
        kader.classList.add("javas_open");
        jsEnabled = true;
        htmlEnabled = false;
        cssEnabled = false;
    }
}

kaart.addEventListener("click", openKaart);
htmlKnop.addEventListener("click", openHTML);
cssKnop.addEventListener("click", openCSS);
jsKnop.addEventListener("click", openJS);