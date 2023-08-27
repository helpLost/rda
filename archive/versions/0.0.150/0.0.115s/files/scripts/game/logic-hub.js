//----------------------------------------------//
//---              Rising Dawns              ---//
//--- This file is the logic hub for most of ---//
//---          the "engine"'s files.         ---//
//----------------------------------------------//
//---              Adrian Lost               ---//
//----------------------------------------------//
// SEE THE "CREDITS.LIST" FILE IN THE ARCHIVE FOR CREDIT INFO
import * as jsonData from "./modules/json-data-handler.js";
import * as gameData from "./modules/game-details.js";
import * as civData from "./modules/civ-details.js";
import * as utilities from "./modules/utilities.js";
import * as definitions from "./modules/define.js";

//-- KEYSTONE FUNCTIONS --//
let logRepeat = 0;
let first = true;
export function gameInit() {
    // Background Image
    function create() {
        if (first == false) {
            document.getElementById("background").remove();
        }
        let image = document.createElement("img");

        image.id = "background";
        image.src = "../../images/" + civData.states.age.toLowerCase().replace(" ", "_") + "/background.jpg";
        image.width = window.innerWidth;
        image.height = window.innerHeight;

        document.getElementById("backgroundContainer").append(image);

        document.getElementById("backgroundContainer").style.position = "absolute";
        document.getElementById("backgroundContainer").style.top = "0";
        document.getElementById("backgroundContainer").style.left = "0";
        document.getElementById("backgroundContainer").style.zIndex = "-25";

        document.querySelector('body').style.backgroundImage = "element(#background)";
        document.querySelector('div').style.opacity = "0.8";
        document.querySelector('header').style.opacity = "0.85";
        document.querySelector('main').style.opacity = "0.85";
    }
    create();

    // Civilization Data
    document.title = "Rising Dawns: " + ((gameData.civDetails[3] != null) ? gameData.civDetails[3] : "New Adventure");
    document.getElementById("civNameLabel").innerText = "The " + gameData.appellations[1] + " of " + ((gameData.civDetails[1] != null) ? gameData.civDetails[1] : "Nazhem");
    document.getElementById("kingNameLabel").innerText = "Lead by " + gameData.appellations[0] + " " + ((gameData.civDetails[0] != null) ? gameData.civDetails[0] : "Orteil");

    if (first == true) {
        // The Buildings Area
        for (let i = 0; i < Object.keys(civData.buildings.numbers.tribal_era).length; i++) {
            document.getElementById("buildingTab").innerHTML += "<div id = '" + utilities.abbreviate(Object.keys(civData.buildings.numbers.tribal_era)[i].toLowerCase()) + "Container' class = 'buildingElement " + (Object.keys(civData.buildings.numbers.tribal_era)[i] != 'Sleeping_Mats' && Object.keys(civData.buildings.numbers.tribal_era)[i] != 'Training_Areas' && Object.keys(civData.buildings.numbers.tribal_era)[i] != 'Gathering_Places' && Object.keys(civData.buildings.numbers.tribal_era)[i] != 'Hunter1s_Quarters' && Object.keys(civData.buildings.numbers.tribal_era)[i] != 'Lumberjack1s_Huts' ? "unlock" : "") + "'><p id = '" + utilities.abbreviate(Object.keys(civData.buildings.numbers.tribal_era)[i].toLowerCase().replace("1", "")) + "Count' class = 'buildingOption'>" + Object.keys(civData.buildings.numbers.tribal_era)[i].replace("1", "'").replace("_", " ") + ": " + Object.values(civData.buildings.numbers.tribal_era)[i] + "</p><button id = '" + utilities.abbreviate(Object.keys(civData.buildings.numbers.tribal_era)[i].toLowerCase()) + "Build' class = 'buildStructure'>Build</button><p class = 'buildingExplanation'>" + Object.values(civData.buildings.explanations.tribal_era)[i] + "</p></div>";
        }

        appendStorageLabels();

        // Startup Message
        if (civData.states.dev == false && civData.states.age == 'Tribal Era') {
            let mask = document.createElement("div");
            mask.setAttribute("id", "mask");
            mask.setAttribute("style", "position: absolute; top: 0; left: 0; z-index: 15; opacity: 0.65; width: 100vw; height: 100vh; background-color: black;");

            document.querySelector('body').append(mask);

            utilities.explanation("startDialogue", `Your tribe has recently gained some notoriety in the area.\nYou've been appointed the leader and given a mysterious, divine fruit with immortalizing powers. With your newfound rulerhood, will you lead your civilization to victory? Or will you let it fade into the veil of time as if it was never there?\n<button id = 'yes' onclick = 'document.querySelector("body").removeChild(document.getElementById("startDialogue")); document.querySelector("body").removeChild(document.getElementById("mask"));' style = 'background-color: whitesmoke; border: 1px solid lightgrey; font-family: "Lucida Grande", "Lucida Sans"; padding: 5px 10px 5px 11px; border-radius: 5px;'>Ok</button>`, 0, 275, "width: 500px; text-align: center;");
        }
        for (let lines = 9; lines > 0; lines--) {
            document.getElementById("log" + lines).innerHTML = "<div class = 'consoleTime'>> " + utilities.makeDateReadable(':') + "</div><div class = 'consoleMessage'><i>No events to note.</i></div><div class = 'consoleRepeat'></div>";
        }
        consoleLog("Game loaded. Version: " + gameData.storedVersion);
    }
    first = false;
}
export function consoleLog(message, colour) {
    let date = utilities.makeDateReadable(':');
    if (document.getElementById("logMessage").innerHTML != message) {
        logRepeat = 0;
        let lines = 10;
        while (--lines > 0) {
            document.getElementById("log" + lines).innerHTML = document.getElementById("log" + (lines - 1)).innerHTML;
        }
        document.getElementById("log1").innerHTML = "<div class = 'consoleTime'>> " + (document.getElementById("logTime").innerText = "> " ? date : document.getElementById("logTime").innerHTML) + "</div><div class = 'consoleMessage'>" + document.getElementById("logMessage").innerHTML + "</div><div class = 'consoleRepeat'>" + document.getElementById("logRepeat").innerHTML + "</div>";
    }
    let s = "<div id='logTime' class = 'consoleTime'>> " + date + "</div><div id='logMessage' class = 'consoleMessage' style = 'color: " + colour + ";'>" + message + "</div><div id='logRepeat' class = 'consoleRepeat'>";
    if (++logRepeat > 1) { s += "(x" + logRepeat + ")"; }
    s += "</div>";
    document.getElementById("log0").innerHTML = s;
}

//-- GAME FUNCTIONS --//
//- Resources -//
export function increaseResource(rss, resource_label) {
    for (let item of Object.keys(civData.storedResources)) {
        if (item == resource_label.toLowerCase() && civData.storedResources[item] < Object.values(civData.storage.resources)[rss]) {
            civData.storedResources[item] += Object.values(civData.increments)[rss];

            let key1 = Object.keys(civData.storedResources)[rss + 3];
            let key2 = key1.charAt(0).toUpperCase() + key1.slice(1);
            increaseSpecialResource(rss + 3, key2, (rss == 0 ? 5 : rss == 1 ? 7 : rss == 2 ? 2 : 5));
        } else if (item == resource_label.toLowerCase() && civData.storedResources[item] >= Object.values(civData.storage.resources)[rss]) {
            consoleLog('Your tribe is out of ' + resource_label.toLowerCase() + ' storage space.');
        }
    }
    utilities.applyLabelChanges(resource_label.toLowerCase() + 'Count', Object.values(civData.storedResources)[rss], resource_label, 'rss');
}
export function increaseSpecialResource(rss, resource_label, chance_value, worker_made) {
    let chance = Math.floor(Math.random() * 100);
    if (chance <= chance_value) {
        for (let item of Object.keys(civData.storedResources)) {
            if (item == resource_label.toLowerCase() && civData.storedResources[item] < Object.values(civData.storage.resources)[rss]) {
                civData.storedResources[item] += 1;
                ((worker_made != true) ? consoleLog('You found one ' + resource_label.toLowerCase() + ' while gathering.') : '');
            }
        }
    }

    utilities.applyLabelChanges(resource_label.toLowerCase() + 'Count', Object.values(civData.storedResources)[rss], resource_label, 'rss');
}
export function appendStorageLabels() {
    document.getElementById("foodStorageLabel").innerText = "You can store: " + utilities.shortenNumber(civData.storage.resources.foodStorage);
    document.getElementById("woodStorageLabel").innerText = "You can store: " + utilities.shortenNumber(civData.storage.resources.woodStorage);
    document.getElementById("stoneStorageLabel").innerText = "You can store: " + utilities.shortenNumber(civData.storage.resources.stoneStorage);
}
//- Jobs -//
export function increaseWorkers(job, job_label) {
    for (let item of Object.keys(civData.citizens.people)) {
        if (item == job_label.toLowerCase()) {
            if (job_label == 'Unemployed') {
                if (civData.citizens.people.totalPopulation < civData.storage.people.populationCap) {
                    if (civData.storedResources.food >= 20 && civData.citizens.people.unemployed < civData.storage.people.unemployedCap) {
                        civData.citizens.people.totalPopulation++;
                        civData.citizens.people.unemployed++;
                        civData.storedResources.food -= 20;
                    } else if (civData.storedResources.food >= 20 && civData.citizens.people.unemployed >= civData.storage.people.unemployedCap) {
                        consoleLog("Don't you think you should give these people some jobs first?");
                    } else if (civData.storedResources.food < 20 && civData.citizens.people.unemployed < civData.storage.people.unemployedCap) {
                        consoleLog("Your tribe doesn't have enough food to entice a passerby to stay.");
                    }
                } else {
                    consoleLog("Your tribe doesn't have enough space to take in a newcomer! Build more residential buildings.");
                }
            } else {
                if (civData.citizens.people.unemployed > 0) {
                    civData.citizens.people[`${job_label.toLowerCase()}`]++;
                    civData.citizens.people.unemployed--;
                    civData.storedResources.food -= 20;
                } else {
                    consoleLog("You don't have anyone unemployed right now.");
                }
            }
        }
    }
    utilities.applyResources();
    utilities.applyLabelChanges('unemployedCount', civData.citizens.people.unemployed, 'Unemployed', 'job');
    utilities.applyLabelChanges(job_label.toLowerCase() + 'Count', Object.values(civData.citizens.people)[job], job_label, 'job');
}
export function decreaseWorkers(job, job_label) {
    for (let item of Object.keys(civData.citizens.people)) {
        if (item == job_label.toLowerCase() && civData.citizens.people[item] > 0) {
            if (civData.citizens.people.unemployed < civData.storage.people.unemployedCap) {
                civData.citizens.people.unemployed++;
                civData.citizens.people[item]--;
            }
        }
    }
    utilities.applyLabelChanges('unemployed' + 'Count', Object.values(civData.citizens.people)[1], 'Unemployed', 'job');
    utilities.applyLabelChanges(job_label.toLowerCase() + 'Count', Object.values(civData.citizens.people)[job], job_label, 'job');
}
export function workerGather(rss, collector, resource_label) {
    for (let item of Object.keys(civData.storedResources)) {
        if (item == resource_label.toLowerCase() && civData.storedResources[item] < Object.values(civData.storage.resources)[rss]) {
            civData.storedResources[item] += Object.values(civData.increments)[rss + 3] * Object.values(civData.citizens.people)[collector];

            let key1 = Object.keys(civData.storedResources)[rss + 3];
            var key2 = key1.charAt(0).toUpperCase() + key1.slice(1);
            increaseSpecialResource(rss + 3, key2, (rss == 0 ? 5 : rss == 1 ? 7 : rss == 2 ? 2 : 5), true);
        }
    }
    utilities.applyLabelChanges(resource_label.toLowerCase() + 'Count', Object.values(civData.storedResources)[rss], resource_label, 'rss');
    utilities.applyLabelChanges(resource_label.toLowerCase() + 'PerSecond', Object.values(civData.increments)[rss + 3] * Object.values(civData.citizens.people)[collector], resource_label + ' Per Second', 'rss');
    utilities.applyLabelChanges(Object.keys(civData.storedResources)[rss + 3] + 'PerSecond', (rss == 0 ? 5 / 100 : rss == 1 ? 7 / 100 : rss == 2 ? 2 / 100 : 5 / 100) * Object.values(civData.citizens.people)[collector], key2 + ' Chance Per Second', 'rss');
}
//- Buildings -//
export function increaseBuilding(bld, building_label, plural_label) {
    for (let item of Object.keys(civData.buildings.numbers.tribal_era)) {
        if (item == plural_label.replace(" ", "_").replace("-", "_").replace("'", "1")) {
            if (Object.values(civData.buildings.caps.tribal_era)[bld] != undefined ? Object.values(civData.buildings.numbers.tribal_era)[bld] < Object.values(civData.buildings.caps.tribal_era)[bld] : true) {
                if (utilities.checkResources('buildings', 'costs', 'tribal_era', plural_label.replace(" ", "_").replace("-", "_").replace("'", ""), 2)) {
                    civData.buildings.numbers.tribal_era[item] += 1;
                    civData.storedResources.food -= Object.values(civData.buildings.costs.tribal_era)[bld].Food;
                    civData.storedResources.wood -= Object.values(civData.buildings.costs.tribal_era)[bld].Wood;
                    civData.storedResources.stone -= Object.values(civData.buildings.costs.tribal_era)[bld].Stone;
                } else {
                    consoleLog("Your tribe doesn't have enough resources to build another " + Object.keys(civData.buildings.explanations.tribal_era)[bld].replace("_", " ") + ".");
                }
            } else {
                consoleLog("Your tribe doesn't have enough space for another " + Object.keys(civData.buildings.explanations.tribal_era)[bld].replace("_", " ") + ".");
            }
        }
    }
    applyBonuses(bld);
    utilities.applyLabelChanges(building_label + 'Count', Object.values(civData.buildings.numbers.tribal_era)[bld], plural_label, 'bld');
    utilities.applyResources();
}
export function applyBonuses(bld) {
    let bonusArray = Object.entries(civData.buildings.bonuses.tribal_era.numbers);
    let currentBonusArray = bonusArray[bld];
    if (currentBonusArray[1]['none'] != 'n/a') {
        for (let i = 0; i < Object.keys(currentBonusArray[1]).length; i++) {
            if (Object.keys(currentBonusArray[1])[i] != 'foodStorage' && Object.keys(currentBonusArray[1])[i] != 'woodStorage' && Object.keys(currentBonusArray[1])[i] != 'stoneStorage' && Object.keys(currentBonusArray[1])[i] != 'hideStorage' && Object.keys(currentBonusArray[1])[i] != 'rootsStorage' && Object.keys(currentBonusArray[1])[i] != 'oreStorage' && Object.keys(currentBonusArray[1])[i] != 'herbsStorage') {
                for (let item of Object.keys(civData.storage.people)) {
                    if (item == Object.keys(currentBonusArray[1])[i]) {
                        civData.storage.people[`${Object.keys(currentBonusArray[1])[i]}`] += Object.values(currentBonusArray[1])[i];
                    }
                }
            } else {
                for (let item of Object.keys(civData.storage.resources)) {
                    if (item == Object.keys(currentBonusArray[1])[i]) {
                        civData.storage.resources[`${Object.keys(currentBonusArray[1])[i]}`] += Object.values(currentBonusArray[1])[i];
                    }
                }
            }
        }
    }
    appendStorageLabels();
}
//- Research -//
export function appendResearch(tier, row) {
    let neededTier = Object.keys(jsonData.researches.trees)[tier];
    let neededRow = Object.values(jsonData.researches.trees[`${neededTier}`])[row];
    let techs = Object.entries(neededRow);

    document.getElementById("researchTab").innerHTML = "";
    for (let i = 0; i < techs.length; i++) {
        document.getElementById("researchTab").innerHTML += "<div id = '" + techs[i][0].replaceAll(" ", "").toLowerCase() + "Container' class = 'researchNode'><p id = '" + techs[i][0].replaceAll(" ", "").toLowerCase() + "Title' class = 'researchTitle'>" + techs[i][0] + "</p><p id = '" + techs[i][0].toLowerCase().replaceAll(" ", "") + "Description' class = 'researchDescription'>" + techs[i][1].Description + "</p><button id = '" + techs[i][0].toLowerCase().replaceAll(" ", "") + "Research' class = 'researchButton'>Research</button></div>";
    }
    definitions.onclick(tier, row);
}
export function removeResearch(research_id) {
    document.getElementById(research_id).remove();
}
export function verifyResearch(research_id, tier, row, tech) {
    let neededTech = Object.entries(Object.values(jsonData.researches.trees[`${Object.keys(jsonData.researches.trees)[tier]}`])[row])[tech];
    let costs = neededTech[1].Cost.split(",");
    let costArray = new Array;

    for (let i = 0; i < costs.length; i++) {
        var current_cost = [
            costs[i].substring(0, costs[i].indexOf(" ")),
            Number(costs[i].substring(costs[i].indexOf(" ")).replace(" ", ""))
        ];
        var affectedResource = civData.storedResources[`${current_cost[0]}`];

        costArray.push([current_cost, affectedResource]);
    }

    let good = 0;
    for (let i = 0; i < costArray.length; i++) {
        if (costArray[i][0][1] <= costArray[i][1]) {
            good++;
        }
    }
    if (good == costArray.length) {
        for (let i = 0; i < costArray.length; i++) {
            civData.storedResources[`${costArray[i][0][0]}`] -= costArray[i][0][1];
        }
        applyResearch(research_id, neededTech);
    } else {
        consoleLog("You don't have enough resources to research that.");
    }
    utilities.applyResources();
}
export function applyResearch(research_id, neededTech) {
    if (neededTech[1].Gains.charAt(0) != "$" && neededTech[1].Gains.charAt(0) != "#") {
        for (let item of Object.keys(civData.buildings.numbers.tribal_era)) {
            if (item == neededTech[1].Gains) {
                document.getElementById(utilities.abbreviate(item.toLowerCase()) + "Container").classList.remove("unlock");
            }
        }
    } else if (neededTech[1].Gains.charAt(0) == "#"){
        let elems = neededTech[1].Gains.split(",");
        for(let i = 0; i < elems.length; i++) {
            document.querySelector(elems[i]).classList.remove("unlock");
        }
    } else {
        // other things
    }
    removeResearch(research_id);
}
//- Events -//
export function clockLabel(input) {
    document.getElementById("timeLabel").innerHTML = input;
}