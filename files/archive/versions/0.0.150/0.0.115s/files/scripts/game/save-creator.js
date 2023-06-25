import * as gameDetails from "./modules/game-details.js";
import * as utilities from "./modules/utilities.js";

function formLogic(type) {
    if(type != 'submit') {
        if(document.getElementById("religionCheck").checked) {
            document.getElementById("godOptions").style.display = "block";
        } else {
            document.getElementById("godOptions").style.display = "none";
        }
        if(document.getElementById("religionType").value == "atheistic") {
            document.getElementById("religionWorship").style.display = "block";
            document.getElementById("deityWrap").style.display = "none";
        } else {
            document.getElementById("religionWorship").style.display = "none";
            document.getElementById("deityWrap").style.display = "block";
        }
        if(document.getElementById("fantasy").checked) {
            document.getElementById("regionPickerWrap").style.display = "none";
        } else {
            document.getElementById("regionPickerWrap").style.display = "block";
        }
    } else {
        (document.getElementById("createGame").checkValidity() ? document.getElementById("createGame").submit() : console.log("invalid"));
    }
}

window.onload = function () {
    setTimeout(console.log.bind(console, "%cRunning version " + gameDetails.version, "font-size: 13px; font-weight: bold"));

    formLogic()
    document.getElementById("submitForm").addEventListener("click", function() { formLogic('submit') });
    document.getElementById("createGame").addEventListener("click", function() { formLogic() });

    document.getElementById("kingWrap").addEventListener("mouseover", function () { utilities.explanation("kingExplanation", "This serves as your in-game username.", -490, 135); });
    document.getElementById("kingWrap").addEventListener("mouseout", function () { utilities.explanationDelete("kingExplanation") });

    document.getElementById("kingdomWrap").addEventListener("mouseover", function () { utilities.explanation("kingdomExplanation", "What you input here will be the name of your civilization.", -440, 156); });
    document.getElementById("kingdomWrap").addEventListener("mouseout", function () { utilities.explanationDelete("kingdomExplanation") });

    document.getElementById("deityWrap").addEventListener("mouseover", function () { utilities.explanation("godExplanation", "If there are multiple, separate them with commas.", -440, 156); });
    document.getElementById("deityWrap").addEventListener("mouseout", function () { utilities.explanationDelete("godExplanation") });
}