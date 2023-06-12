import * as gameDetails from "./game-details.js";
import * as hubLogic from "../logic-hub.js";
import * as utilities from "./utilities.js";

window.onload = function () {
    setTimeout(console.log.bind(console, '%cRunning version ' + gameDetails.version, 'font-size: 15px; font-weight: bold'));

    document.getElementById("regular").addEventListener("click", function () { utilities.switchScreen("regular", "resourceTopBar", "resourcePages") });
    document.getElementById("special").addEventListener("click", function () { utilities.switchScreen("special", "resourceTopBar", "resourcePages") });
    document.getElementById("stats").addEventListener("click", function () { utilities.switchScreen("stats", "resourceTopBar", "resourcePages") });

    document.getElementById("citizen").addEventListener("click", function () { utilities.switchScreen("citizen", "citizenTopBar", "citizenPages") });
    document.getElementById("military").addEventListener("click", function () { utilities.switchScreen("military", "citizenTopBar", "citizenPages") });

    document.getElementById("achievements").addEventListener("click", function () { utilities.switchScreen("achievements", "optionsTopBar", "optionsPages", 0) });
    document.getElementById("settings").addEventListener("click", function () { utilities.switchScreen("settings", "optionsTopBar", "optionsPages", 0) });
    document.getElementById("saving").addEventListener("click", function () { utilities.switchScreen("saving", "optionsTopBar", "optionsPages", 0) });


    hubLogic.gameInit();
}