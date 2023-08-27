var version = "v0.1.54a";
console.log("Running " + version);

/* Onclick Transforms */
function colorAnimation(id) {
    element = document.getElementById(id);
    element.style.backgroundColor = "lightgrey";
    element.style.boxShadow = "0px 0px 0px transparent";
    setTimeout(() => {
        element = document.getElementById(id);
        element.style.backgroundColor = "#EFEDED";
        element.style.boxShadow = "2px 2px 2px grey";
    }, 100);
}

window.onload = function() {
}