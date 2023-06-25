import * as gameDetails from "./game-details.js";
import * as hubLogic from "../logic-hub.js";
import * as utilities from "./utilities.js";
import * as civData from "./civ-details.js";
import * as timeData from "./clock.js";
import * as xe45 from "./re4t_r565.js";

window.onload = function () {
    setTimeout(console.log.bind(console, "%cRunning version " + gameDetails.version, "font-size: 13px; font-weight: bold"));

    // definitely not cheats
    if (civData.states.dev == true) {
        xe45.xe_54b21();
    }
    timeData.clockInit();

    //-- TABS --//
    //- Resources
    document.getElementById("regular").addEventListener("click", function () { utilities.switchScreen("regular", "resourceTopBar", "resourcePages") });
    document.getElementById("special").addEventListener("click", function () { utilities.switchScreen("special", "resourceTopBar", "resourcePages") });
    document.getElementById("stats").addEventListener("click", function () { utilities.switchScreen("stats", "resourceTopBar", "resourcePages") });

    //- Citizens / Research
    document.getElementById("citizen").addEventListener("click", function () { utilities.switchScreen("citizen", "citizenTopBar", "citizenPages") });
    document.getElementById("military").addEventListener("click", function () { utilities.switchScreen("military", "citizenTopBar", "citizenPages") });
    document.getElementById("domain").addEventListener("click", function () { utilities.switchScreen("domain", "citizenTopBar", "citizenPages") });

    //- Buildings / Religion
    document.getElementById("building").addEventListener("click", function () { utilities.switchScreen("building", "mainTopBar", "mainPages", 1) });
    document.getElementById("religion").addEventListener("click", function () { utilities.switchScreen("religion", "mainTopBar", "mainPages", 1) });

    //- Other
    document.getElementById("research").addEventListener("click", function () { utilities.switchScreen("research", "optionsTopBar", "optionsPages", 0) });
    document.getElementById("achievements").addEventListener("click", function () { utilities.switchScreen("achievements", "optionsTopBar", "optionsPages", 0) });
    document.getElementById("settings").addEventListener("click", function () { utilities.switchScreen("settings", "optionsTopBar", "optionsPages", 0) });
    document.getElementById("saving").addEventListener("click", function () { utilities.switchScreen("saving", "optionsTopBar", "optionsPages", 0) });

    //-- GATHERING --//
    //- Resources
    document.getElementById("foodGather").addEventListener("click", function () { hubLogic.increaseResource(0, "Food") });
    document.getElementById("woodGather").addEventListener("click", function () { hubLogic.increaseResource(1, "Wood") });
    document.getElementById("stoneGather").addEventListener("click", function () { hubLogic.increaseResource(2, "Stone") });

    //- Workers
    document.getElementById("unemployedRecruit").addEventListener("click", function () { hubLogic.increaseWorkers(1, "Unemployed") });
    document.getElementById("hunterDismiss").addEventListener("click", function () { hubLogic.decreaseWorkers(2, "Hunter") });
    document.getElementById("lumberjackDismiss").addEventListener("click", function () { hubLogic.decreaseWorkers(3, "Lumberjack") });
    document.getElementById("minerDismiss").addEventListener("click", function () { hubLogic.decreaseWorkers(4, "Miner") });

    //-- INTERVALS --//
    document.getElementById("hunterRecruit").addEventListener("click", function () { hubLogic.increaseWorkers(2, "Hunter"), utilities.triggerInterval(0, 2, 'Food', 2000) });
    document.getElementById("lumberjackRecruit").addEventListener("click", function () { hubLogic.increaseWorkers(3, "Lumberjack"), utilities.triggerInterval(1, 3, 'Wood', 2000) });
    document.getElementById("minerRecruit").addEventListener("click", function () { hubLogic.increaseWorkers(4, "Miner"), utilities.triggerInterval(2, 4, 'Stone', 2000) });

    //-- SAVING --//
    document.getElementById("saveFileHref").addEventListener("click", function () { utilities.saveFile() });
    document.getElementById("saveBrowserHref").addEventListener("click", function () { utilities.saveBrowser() });
    document.getElementById("loadFileHref").addEventListener("click", function () { utilities.loadFile() });
    document.getElementById("loadBrowserHref").addEventListener("click", function () { utilities.loadBrowser() });

    //-- GAME INIT --//
    hubLogic.gameInit();
    window.addEventListener('resize', function () { hubLogic.gameInit() });

    //-- BUILDINGS --//
    document.getElementById("smBuild").addEventListener("click", function () { hubLogic.increaseBuilding(0, "sm", "Sleeping Mats") });
    document.getElementById("afBuild").addEventListener("click", function () { hubLogic.increaseBuilding(1, "af", "A-Frames") });
    document.getElementById("hBuild").addEventListener("click", function () { hubLogic.increaseBuilding(2, "h", "Huts") });
    document.getElementById("shBuild").addEventListener("click", function () { hubLogic.increaseBuilding(3, 'sh', "Strengthened Huts") });
    document.getElementById("taBuild").addEventListener("click", function () { hubLogic.increaseBuilding(4, "ta", "Training Areas") });
    document.getElementById("gpBuild").addEventListener("click", function () { hubLogic.increaseBuilding(5, "gp", "Gathering Places"); hubLogic.appendResearch(0, 0) });
    document.getElementById("hqBuild").addEventListener("click", function () { hubLogic.increaseBuilding(6, "hq", "Hunter's Quarters") });
    document.getElementById("lhBuild").addEventListener("click", function () { hubLogic.increaseBuilding(7, "lh", "Lumberjack's Huts") });
    document.getElementById("mcBuild").addEventListener("click", function () { hubLogic.increaseBuilding(8, "mc", "Miner's Cabins") });
    document.getElementById("tcBuild").addEventListener("click", function () { hubLogic.increaseBuilding(9, "tc", "Town Centers") });
    document.getElementById("fhBuild").addEventListener("click", function () { hubLogic.increaseBuilding(10, "fh", "Food Houses") });
    document.getElementById("wsBuild").addEventListener("click", function () { hubLogic.increaseBuilding(11, "ws", "Wood Stockpiles") });
    document.getElementById("ssBuild").addEventListener("click", function () { hubLogic.increaseBuilding(12, "ss", "Stone Sheds") });

    //-- HOVERWINDOWS --//
    //- ADDING -//
    //- Citizens
    document.getElementById("unemployedRecruit").addEventListener("mouseover", function () { utilities.explanation("unemployed", "unemployedExplanation", "Recruit for 20 food, each unemployed person consumes 0.75 food per in-game day.", 375, 45, "width: 39.2vw;"); });
    document.getElementById("hunterRecruit").addEventListener("mouseover", function () { utilities.explanation("hunters", "hunterExplanation", "Give an unemployed person a job as a hunter. Hunters consume 0.5 food and 0.1 wood per in-game day.", 405, 80, "width: 50vw;"); });
    document.getElementById("lumberjackRecruit").addEventListener("mouseover", function () { utilities.explanation("lumberjacks", "lumberjackExplanation", "Give an unemployed person a job as a wood collector. Wood collectors cost the tribe 0.3 food, 0.2 wood, and 0.1 stone per in-game day.", 405, 115, "width: 50vw;"); });
    document.getElementById("minerRecruit").addEventListener("mouseover", function () { utilities.explanation("miners", "minerExplanation", "Give an unemployed person a job as a primitive miner. Miners cost the tribe 0.4 food and 0.25 wood per in-game day.", 405, 150, "width: 50vw;"); });

    //- Resources
    document.getElementById("foodGather").addEventListener("mouseover", function () { utilities.explanation("food", "foodExplanation", "Collect some food from the surrounding countryside. You have about a 5% chance of collecting hide.", 230, 49, "width: 47.5vw;"); });
    document.getElementById("woodGather").addEventListener("mouseover", function () { utilities.explanation("wood", "woodExplanation", "Collect some wood from a forest nearby. You have about a 7% chance of collecting roots.", 230, 84, "width: 42vw;"); });
    document.getElementById("stoneGather").addEventListener("mouseover", function () { utilities.explanation("stone", "stoneExplanation", "Collect pebbles and stones from around your tribe's encampment. You have about a 2% chance of finding ore.", 230, 118, "width: 52vw;"); });

    //- Buildings
    document.getElementById("smBuild").addEventListener("mouseover", function () { utilities.explanation("smContainer", "smExplanation", "Each mat costs 20 food, 50 wood, and 20 stone.", 0, 27, "width: 22.8vw;"); });
    document.getElementById("afBuild").addEventListener("mouseover", function () { utilities.explanation("afContainer", "afExplanation", "Each a-frame costs 50 food, 130 wood, and 50 stone.", 0, 27, "width: 25.25vw;"); });
    document.getElementById("hBuild").addEventListener("mouseover", function () { utilities.explanation("hContainer", "hExplanation", "Each hut costs 75 food, 312 wood, and 120 stone.", 0, 27, "width: 23.5vw;"); });
    document.getElementById("shBuild").addEventListener("mouseover", function () { utilities.explanation("shContainer", "shExplanation", "Each hut costs 150 food, 510 wood, and 225 stone.", 0, 27, "width: 24vw;"); });
    document.getElementById("taBuild").addEventListener("mouseover", function () { utilities.explanation("taContainer", "taExplanation", "Each training area costs 105 food, 500 wood, and 102 stone.", 0, 27, "width: 28.75vw;"); });
    document.getElementById("gpBuild").addEventListener("mouseover", function () { utilities.explanation("gpContainer", "gpExplanation", "Each gathering place costs 1,000 food, 2,500 wood, and 1,500 stone.", 0, 27, "width: 33vw;"); });
    document.getElementById("hqBuild").addEventListener("mouseover", function () { utilities.explanation("hqContainer", "hqExplanation", "Each hunter's quarters costs 250 food, 315 wood, and 165 stone.", 0, 27, "width: 30.75vw;"); });
    document.getElementById("lhBuild").addEventListener("mouseover", function () { utilities.explanation("lhContainer", "lhExplanation", "Each lumberjack's hut costs 20 food, 205 wood, and 170 stone.", 0, 27, "width: 30vw;"); });
    document.getElementById("mcBuild").addEventListener("mouseover", function () { utilities.explanation("mcContainer", "mcExplanation", "Each miner's cabin costs 105 wood and 100 stone.", 0, 27, "width: 24vw;"); });
    document.getElementById("tcBuild").addEventListener("mouseover", function () { utilities.explanation("tcContainer", "tcExplanation", "Each town center costs 1,050 food, 3,500 wood, and 1,000 stone.", 0, 27, "width: 25.25vw;"); });
    document.getElementById("fhBuild").addEventListener("mouseover", function () { utilities.explanation("fhContainer", "fhExplanation", "Each food house cost 75 food, 70 wood, and 100 stone.", 0, 27, "width: 26vw;"); });
    document.getElementById("wsBuild").addEventListener("mouseover", function () { utilities.explanation("wsContainer", "wsExplanation", "Each wood stockpile costs 50 food, 225 wood, and 75 stone.", 0, 27, "width: 28.75vw;"); });
    document.getElementById("ssBuild").addEventListener("mouseover", function () { utilities.explanation("ssContainer", "ssExplanation", "Each stone shed costs 75 food, 200 wood, and 150 stone.", 0, 27, "width: 27vw;"); });

    //- DELETING -//
    //- Citizens
    document.getElementById("unemployedRecruit").addEventListener("mouseout", function () { utilities.explanationDelete("unemployed", "unemployedExplanation") });
    document.getElementById("hunterRecruit").addEventListener("mouseout", function () { utilities.explanationDelete("hunters", "hunterExplanation") });
    document.getElementById("lumberjackRecruit").addEventListener("mouseout", function () { utilities.explanationDelete("lumberjacks", "lumberjackExplanation") });
    document.getElementById("minerRecruit").addEventListener("mouseout", function () { utilities.explanationDelete("miners", "minerExplanation") });

    //- Resources
    document.getElementById("foodGather").addEventListener("mouseout", function () { utilities.explanationDelete("food", "foodExplanation") });
    document.getElementById("woodGather").addEventListener("mouseout", function () { utilities.explanationDelete("wood", "woodExplanation") });
    document.getElementById("stoneGather").addEventListener("mouseout", function () { utilities.explanationDelete("stone", "stoneExplanation") });

    //- Buildings
    document.getElementById("smBuild").addEventListener("mouseout", function () { utilities.explanationDelete("smContainer", "smExplanation") });
    document.getElementById("afBuild").addEventListener("mouseout", function () { utilities.explanationDelete("afContainer", "afExplanation") });
    document.getElementById("hBuild").addEventListener("mouseout", function () { utilities.explanationDelete("hContainer", "hExplanation") });
    document.getElementById("shBuild").addEventListener("mouseout", function () { utilities.explanationDelete("shContainer", "shExplanation") });
    document.getElementById("taBuild").addEventListener("mouseout", function () { utilities.explanationDelete("taContainer", "taExplanation") });
    document.getElementById("gpBuild").addEventListener("mouseout", function () { utilities.explanationDelete("gpContainer", "gpExplanation") });
    document.getElementById("hqBuild").addEventListener("mouseout", function () { utilities.explanationDelete("hqContainer", "hqExplanation") });
    document.getElementById("lhBuild").addEventListener("mouseout", function () { utilities.explanationDelete("lhContainer", "lhExplanation") });
    document.getElementById("mcBuild").addEventListener("mouseout", function () { utilities.explanationDelete("mcContainer", "mcExplanation") });
    document.getElementById("tcBuild").addEventListener("mouseout", function () { utilities.explanationDelete("tcContainer", "tcExplanation") });
    document.getElementById("fhBuild").addEventListener("mouseout", function () { utilities.explanationDelete("fhContainer", "fhExplanation") });
    document.getElementById("wsBuild").addEventListener("mouseout", function () { utilities.explanationDelete("wsContainer", "wsExplanation") });
    document.getElementById("ssBuild").addEventListener("mouseout", function () { utilities.explanationDelete("ssContainer", "ssExplanation") });

    //-- RESEARCHES --//
}
export function onclick(tier, row) {
    document.getElementById("researchTab").addEventListener("click", function () {
        if (document.getElementById("researchTab").innerHTML == "" && row != 7) {
            hubLogic.appendResearch(tier, row += 1);
        } else if (row == 7) {
            document.getElementById("researchTab").innerHTML = "<i>You've unlocked everything for this age.</i>"
        }
    });
    if (row == 0) {
        document.getElementById("housingResearch").addEventListener("click", function () { hubLogic.verifyResearch("housingContainer", 0, 0, 0) });
        document.getElementById("watercollectionResearch").addEventListener("click", function () { hubLogic.verifyResearch("watercollectionContainer", 0, 0, 1) });
    } else if (row == 1) {
        document.getElementById("tribalsocietyiResearch").addEventListener("click", function () { hubLogic.verifyResearch("tribalsocietyiContainer", 0, 1, 0) });
        document.getElementById("improvedresourcepreservationResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedresourcepreservationContainer", 0, 1, 1) });
        document.getElementById("improvedwatercollectionResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedwatercollectionContainer", 0, 1, 2) });
    } else if (row == 2) {
        document.getElementById("clothingResearch").addEventListener("click", function () { hubLogic.verifyResearch("clothingContainer", 0, 2, 0) });
        document.getElementById("improvedhousingiResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedhousingiContainer", 0, 2, 1) });
        document.getElementById("improvedresourcestorageiResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedresourcestorageiContainer", 0, 2, 2) });
    } else if (row == 3) {
        document.getElementById("primitivemineralgatheringResearch").addEventListener("click", function () { hubLogic.verifyResearch("primitivemineralgatheringContainer", 0, 3, 0) });
        document.getElementById("primitivetoolsResearch").addEventListener("click", function () { hubLogic.verifyResearch("primitivetoolsContainer", 0, 3, 1) });
        document.getElementById("improvedinsulationResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedinsulationContainer", 0, 3, 2) });
        document.getElementById("improvedresourcestorageiiResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedresourcestorageiiContainer", 0, 3, 3) });
    } else if (row == 4) {
        document.getElementById("improvedtoolsiResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedtoolsiContainer", 0, 4, 0) });
        document.getElementById("tribalsocietyiiResearch").addEventListener("click", function () { hubLogic.verifyResearch("tribalsocietyiiContainer", 0, 4, 1) });
        document.getElementById("weaponsResearch").addEventListener("click", function () { hubLogic.verifyResearch("weaponsContainer", 0, 4, 2) });
        document.getElementById("theslingResearch").addEventListener("click", function () { hubLogic.verifyResearch("theslingContainer", 0, 4, 0) });
    }else if (row == 5) {
        document.getElementById("huntingResearch").addEventListener("click", function () { hubLogic.verifyResearch("huntingContainer", 0, 5, 0) });
        document.getElementById("improvedhuntingtechniquesResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedhuntingtechniquesContainer", 0, 5, 1) });
        document.getElementById("strongerslingResearch").addEventListener("click", function () { hubLogic.verifyResearch("strongerslingContainer", 0, 5, 2) });
    } else if (row == 6) {
        document.getElementById("improvedhousingiiResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedhousingiiContainer", 0, 6, 0) });
        document.getElementById("improvedtoolsiiResearch").addEventListener("click", function () { hubLogic.verifyResearch("improvedtoolsiiContainer", 0, 6, 1) });
        document.getElementById("tribalsocietyiiiResearch").addEventListener("click", function () { hubLogic.verifyResearch("tribalsocietyiiiContainer", 0, 6, 2) });
    } else if (row == 7) {
        document.getElementById("agricultureResearch").addEventListener("click", function () { hubLogic.verifyResearch("agricultureContainer", 0, 7, 0) });
    }
}