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

//-- KEYSTONE FUNCTIONS --//
let logRepeat = 0;
export function gameInit() {
    document.title = "Rising Dawns: " + ((gameData.civDetails[3] != null) ? gameData.civDetails[3] : "New Adventure");
    document.getElementById("civNameLabel").innerText = "The " + gameData.appellations[1] + " of the " + ((gameData.civDetails[1] != null) ? gameData.civDetails[1] : "Reactuli");
    document.getElementById("kingNameLabel").innerText = "Lead by " + gameData.appellations[0] + " " + ((gameData.civDetails[0] != null) ? gameData.civDetails[0] : "Orteil");

    // The buildings area
    for (let i = 0; i < Object.keys(civData.buildings.numbers.tribal_era).length; i++) {
        document.getElementById("buildingArea").innerHTML += "<div id = '" + Object.keys(civData.buildings.numbers.tribal_era)[i].replace("5", "_").toLowerCase() + "Container'><p id = '" + Object.keys(civData.buildings.numbers.tribal_era)[i].replace("_", "").replace("5", "").toLowerCase() + "Count'class = 'buildingOption'>" + Object.keys(civData.buildings.numbers.tribal_era)[i].replace("_", " ").replace("5", "-") + ": " + Object.values(civData.buildings.numbers.tribal_era)[i] + "</p><button id = '" + Object.keys(civData.buildings.numbers.tribal_era)[i].replace("5", "_").toLowerCase() + "Build' class = 'buildStructure'>Build</button><p class = 'buildingExplanation'>" + Object.values(civData.buildings.explanations.tribal_era)[i] + "</p></div>";
    }

    appendStorageLabels();
}
export function consoleLog(message, type) {
    let date = utilities.makeDateReadable(':');
    // Checking repeats
    if (document.getElementById("logMessage").innerHTML != message) {
        logRepeat = 0;
        let i = 10; // Number of lines of log to keep.
        while (--i > 1) { document.getElementById("log" + i).innerHTML = document.getElementById("log" + (i - 1)).innerHTML; }
        //Since ids need to be unique, log1 strips the ids from the log0 elements when copying the contents.
        document.getElementById("log1").innerHTML = "<td>" + document.getElementById("logTime").innerHTML + "</td><td>" + document.getElementById("logMessage").innerHTML + "</td><td>" + document.getElementById("logRepeat").innerHTML + "</td>";
    }
    // Updates most recent line with new time, message, and repeat number.
    let s = "<td id='logTime'>> " + date + "</td><td id='logMessage' style = 'color: " + type + ";'>" + message + "</td><td id='logRepeat'>";
    if (++logRepeat > 1) { s += "(x" + logRepeat + ")"; }
    s += "</td>";
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
    // fixed it a bit  -Specter
    for (let item of Object.keys(civData.buildings.numbers.tribal_era)) {
        if (item == plural_label.replace(" ", "_").replace("-", "_")) {
            if (Object.values(civData.buildings.caps.tribal_era)[bld] != undefined ? Object.values(civData.buildings.numbers.tribal_era)[bld] < Object.values(civData.buildings.caps.tribal_era)[bld] : true) {
                if (utilities.checkResources('buildings', 'costs', 'tribal_era', building_label, 2)) {
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
    utilities.applyLabelChanges(plural_label.toLowerCase().replace(" ", "").replace("-", "") + 'Count', Object.values(civData.buildings.numbers.tribal_era)[bld], plural_label, 'bld');
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