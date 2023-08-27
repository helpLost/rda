class sidenav extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define('side-nav', sidenav);

let first = true;
function background() {
    if (first == false) {
        document.getElementById("background").remove();
    }
    let image = document.createElement("img");

    image.id = "background";
    image.src = "../../../images/tribal_era/background.jpg";
    image.width = window.innerWidth;
    image.height = window.innerHeight;

    document.getElementById("backgroundContainer").append(image);

    document.getElementById("backgroundContainer").style.position = "absolute";
    document.getElementById("backgroundContainer").style.top = "0";
    document.getElementById("backgroundContainer").style.left = "0";
    document.getElementById("backgroundContainer").style.zIndex = "-25";

    document.querySelector('body').style.backgroundImage = "element(#background)";
    document.querySelector('div').style.opacity = "0.8";
    document.getElementById('versions').style.opacity = "0.7";

    first = false;
}

window.onload = function () {
    background();
    window.addEventListener('resize', function () { background() });
}