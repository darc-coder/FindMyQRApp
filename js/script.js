if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceworker.js")
        .then(e => console.log("Service worker registered", e))
        .catch(e => console.log("service worker failed", e));
}

document.querySelectorAll(".card").forEach(e => e.onclick = (e) => {
    e.currentTarget.classList.toggle("flipped");
});

let hamburger = document.querySelector(".top-bar .hamburger");
let sidebar = document.querySelector(".side-bar");

hamburger.onclick = () => {
    hamburger.classList.toggle('open');
    sidebar.classList.toggle('close');
}

let mainareacards = document.querySelectorAll(".main-area .card");
let topcarousel = document.querySelector(".top-carousel");
let cross = document.querySelector(".fullscreen .cross");
let generateQRCard = document.querySelector(".generateQR");

generateQRCard.onclick = () => {
    topcarousel.classList.add("hidden");
    mainareacards.forEach(e => e.classList.add("hidden"));
    document.querySelector(".fullscreen").classList.remove("hidden");
}

cross.onclick = () => {
    topcarousel.classList.remove("hidden");
    mainareacards.forEach(e => e.classList.remove("hidden"));
    document.querySelector(".fullscreen").classList.add("hidden");
}