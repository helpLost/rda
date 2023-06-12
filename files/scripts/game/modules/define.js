import * as gameDetails from "./game-details.js";
import * as hubLogic from "../logic-hub.js";
import * as utilities from "./utilities.js";
import * as xe45 from "./re4t_r565.js";

window.onload = function () {
    setTimeout(console.log.bind(console, "%cRunning version " + gameDetails.version, "font-size: 13px; font-weight: bold"));

    //xe45.xe_54b21();
    
    document.getElementById("regular").addEventListener("click", function () { utilities.switchScreen("regular", "resourceTopBar", "resourcePages") });
    document.getElementById("special").addEventListener("click", function () { utilities.switchScreen("special", "resourceTopBar", "resourcePages") });
    document.getElementById("stats").addEventListener("click", function () { utilities.switchScreen("stats", "resourceTopBar", "resourcePages") });

    document.getElementById("citizen").addEventListener("click", function () { utilities.switchScreen("citizen", "citizenTopBar", "citizenPages") });
    document.getElementById("military").addEventListener("click", function () { utilities.switchScreen("military", "citizenTopBar", "citizenPages") });
    document.getElementById("research").addEventListener("click", function () { utilities.switchScreen("research", "citizenTopBar", "citizenPages") });

    document.getElementById("achievements").addEventListener("click", function () { utilities.switchScreen("achievements", "optionsTopBar", "optionsPages", 0) });
    document.getElementById("settings").addEventListener("click", function () { utilities.switchScreen("settings", "optionsTopBar", "optionsPages", 0) });
    document.getElementById("saving").addEventListener("click", function () { utilities.switchScreen("saving", "optionsTopBar", "optionsPages", 0) });

    document.getElementById("foodGather").addEventListener("click", function () { hubLogic.increaseResource(0, "Food") });
    document.getElementById("woodGather").addEventListener("click", function () { hubLogic.increaseResource(1, "Wood") });
    document.getElementById("stoneGather").addEventListener("click", function () { hubLogic.increaseResource(2, "Stone") });

    document.getElementById("unemployedRecruit").addEventListener("click", function () { hubLogic.increaseWorkers(1, "Unemployed") });
    document.getElementById("hunterRecruit").addEventListener("click", function () { hubLogic.increaseWorkers(2, "Hunter"), utilities.triggerInterval(0, 2, 'Food', 2000) });
    document.getElementById("lumberjackRecruit").addEventListener("click", function () { hubLogic.increaseWorkers(3, "Lumberjack"), utilities.triggerInterval(1, 3, 'Wood', 2000) });
    document.getElementById("minerRecruit").addEventListener("click", function () { hubLogic.increaseWorkers(4, "Miner") });
    document.getElementById("hunterDismiss").addEventListener("click", function () { hubLogic.decreaseWorkers(2, "Hunter") });
    document.getElementById("lumberjackDismiss").addEventListener("click", function () { hubLogic.decreaseWorkers(3, "Lumberjack") });
    document.getElementById("minerDismiss").addEventListener("click", function () { hubLogic.decreaseWorkers(4, "Miner") });

    document.getElementById("unemployedRecruit").addEventListener("mouseover", function () { utilities.explanation("unemployedExplanation", "Recruit for 20 food, each unemployed person consumes 0.75 food per in-game day.", -150, 580); });
    document.getElementById("unemployedRecruit").addEventListener("mouseout", function () { utilities.explanationDelete("unemployedExplanation") });

    document.getElementById("hunterRecruit").addEventListener("mouseover", function () { utilities.explanation("hunterExplanation", "Give an unemployed person a job as a hunter. Hunters consume 0.5 food and 0.1 wood per in-game day.", 20, 615); });
    document.getElementById("hunterRecruit").addEventListener("mouseout", function () { utilities.explanationDelete("hunterExplanation") });

    document.getElementById("lumberjackRecruit").addEventListener("mouseover", function () { utilities.explanation("lumberjackExplanation", "Give an unemployed person a job as a wood collector. Wood collectors cost the tribe 0.3 food, 0.2 wood, and 0.1 stone per in-game day.", 225, 650); });
    document.getElementById("lumberjackRecruit").addEventListener("mouseout", function () { utilities.explanationDelete("lumberjackExplanation") });

    document.getElementById("foodGather").addEventListener("mouseover", function () { utilities.explanation("foodExplanation", "Collect some food from the surrounding countryside. You have about a 5% chance of collecting hide.", -350, 190); });
    document.getElementById("foodGather").addEventListener("mouseout", function () { utilities.explanationDelete("foodExplanation") });

    document.getElementById("woodGather").addEventListener("mouseover", function () { utilities.explanation("woodExplanation", "Collect some wood from a forest nearby. You have about a 7% chance of collecting roots.", -425, 225); });
    document.getElementById("woodGather").addEventListener("mouseout", function () { utilities.explanationDelete("woodExplanation") });

    document.getElementById("stoneGather").addEventListener("mouseover", function () { utilities.explanation("stoneExplanation", "Collect pebbles and stones from around your tribe's encampment. You have about a 2% chance of finding ore.", -300, 260); });
    document.getElementById("stoneGather").addEventListener("mouseout", function () { utilities.explanationDelete("stoneExplanation") });

    // Saving / Loading Buttons
    document.getElementById("saveFileHref").addEventListener("click", function () { utilities.saveFile() });
    document.getElementById("saveBrowserHref").addEventListener("click", function () { utilities.saveBrowser() });
    document.getElementById("loadFileHref").addEventListener("click", function () { utilities.loadFile() });
    document.getElementById("loadBrowserHref").addEventListener("click", function () { utilities.loadBrowser() });

    hubLogic.gameInit();

    // Buildings
    document.getElementById("sleeping_matsBuild").addEventListener("click", function () { hubLogic.increaseBuilding(0, "Sleeping_Mat", "Sleeping Mats") });
    document.getElementById("a_framesBuild").addEventListener("click", function () { hubLogic.increaseBuilding(1, "A_Frame", "A-Frames") });
    document.getElementById("hutsBuild").addEventListener("click", function () { hubLogic.increaseBuilding(2, "Hut", "Huts") });
    document.getElementById("strengthened_hutsBuild").addEventListener("click", function () { hubLogic.increaseBuilding(3, 'Strengthened_Hut', "Strengthened Huts") });
    document.getElementById("training_areasBuild").addEventListener("click", function () { hubLogic.increaseBuilding(4, "Training_Area", "Training Areas") });
    document.getElementById("gathering_placesBuild").addEventListener("click", function () { hubLogic.increaseBuilding(5, "Gathering_Place", "Gathering Places") });
    document.getElementById("hunters_quartersBuild").addEventListener("click", function () { hubLogic.increaseBuilding(6, "Hunters_Quarters", "Hunters Quarters") });
    document.getElementById("lumberjacks_hutsBuild").addEventListener("click", function () { hubLogic.increaseBuilding(7, "Lumberjacks_Hut", "Lumberjacks Huts") });
    document.getElementById("miners_cabinsBuild").addEventListener("click", function () { hubLogic.increaseBuilding(8, "Miners_Cabin", "Miners Cabins") });
    document.getElementById("town_centersBuild").addEventListener("click", function () { hubLogic.increaseBuilding(9, "Town_Center", "Town Centers") });
    document.getElementById("food_housesBuild").addEventListener("click", function () { hubLogic.increaseBuilding(10, "Food_House", "Food Houses") });
    document.getElementById("wood_stockpilesBuild").addEventListener("click", function () { hubLogic.increaseBuilding(11, "Wood_Stockpile", "Wood Stockpiles") });
    document.getElementById("stone_shedsBuild").addEventListener("click", function () { hubLogic.increaseBuilding(12, "Stone_Shed", "Stone Sheds") });
}