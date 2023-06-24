//----------------------------------------------//
//---              Rising Dawns              ---//
//--- This file is the logic hub for most of ---//
//---          the "engine"'s files.         ---//
//----------------------------------------------//
//---              Adrian Lost               ---//
//----------------------------------------------//
import * as jsonData from "./modules/json-data-handler.js";
import * as gameData from "./modules/game-details.js";
import * as civData from "./modules/civ-details.js";
import * as utilityData from "./modules/utilities.js";

//-- KEYSTONE FUNCTIONS --//
export function gameInit() {
    document.title = "Rising Dawns: " + ((gameData.civDetails[3] != null) ? gameData.civDetails[3] : "New Adventure");
    document.getElementById("civNameLabel").innerText = "The " + gameData.appellations[1] + " of the " + ((gameData.civDetails[1] != null) ? gameData.civDetails[1] : "Reactuli");
    document.getElementById("kingNameLabel").innerText = "Lead by " + gameData.appellations[0] + " " + ((gameData.civDetails[0] != null) ? gameData.civDetails[0] : "Orteil");

    // The buildings area
    for (let i = 0; i < Object.keys(civData.buildings.numbers.tribal_era).length; i++) {
        document.getElementById("buildingArea").innerHTML += "<p class = 'buildingOption'>" + Object.keys(civData.buildings.numbers.tribal_era)[i].replace("_", " ").replace("5", "-") + ": " + Object.values(civData.buildings.numbers.tribal_era)[i] + "<button id = '" + Object.keys(civData.buildings.numbers.tribal_era)[i].replace("5", "_") + "' class = 'buildStructure'>Build</button></p>";
        document.getElementById("buildingArea").innerHTML += "<p class = 'buildingExplanation'>" + Object.values(civData.buildings.explanations.tribal_era)[i] + "</p>";
    }
}

/*----GameLog----*/
//CREDIT CIVCLICKER
let logRepeat = 0;
function consoleLog(message, type) {
    // Defining the time
    let date = makeDateReadable();
    function makeDateReadable() {
        let newDate = new Date();
        let time = ((newDate.getHours() > 12) ? newDate.getHours() - 12 + ":" + ((newDate.getMinutes() < 10) ? "0" : "") + newDate.getMinutes() + "PM:" : newDate.getHours() + ":" + ((newDate.getMinutes() < 10) ? "0" : "") + newDate.getMinutes() + "AM:"); // the parenthesis things are fancy if/else statements
        return time;
    }
    // Checking repeats
    if (document.getElementById("logMessage").innerHTML != message) {
        logRepeat = 0; // Reset the repeat variable
        let i = 10; // Number of lines of log to keep.
        while (--i > 1) { document.getElementById("log" + i).innerHTML = document.getElementById("log" + (i - 1)).innerHTML; }
        //Since ids need to be unique, log1 strips the ids from the log0 elements when copying the contents.
        document.getElementById("log1").innerHTML = "<td>" + document.getElementById("logTime").innerHTML
            + "</td><td>" + document.getElementById("logMessage").innerHTML
            + "</td><td>" + document.getElementById("logRepeat").innerHTML + "</td>";
    }
    // Updates most recent line with new time, message, and repeat number.
    let s = "<td id='logTime'>> " + date + "</td><td id='logMessage' style = 'color: " + type + ";'>" + message + "</td><td id='logRepeat'>";
    if (++logRepeat > 1) { s += "(x" + logRepeat + ")"; }
    s += "</td>";
    document.getElementById("log0").innerHTML = s;
}

/* Saving */
function Save() {
    const gameData = [
        version,
        civDetails,
        achievements,
        civClass,
        kingdomClass,
        tribe,
        state
    ]
    const resourceData = [
        resources,
        storage,
        increments,
        divisors
    ]
    const workerData = [
        population,
        workers,
        militaryEnabled,
        soldiers,
        ERsoldiers
    ]
    const researchData = [
        researchEnabled,
        earlyAge
    ]
    const buildingData = [
        buildings,
        type
    ]
    const timeData = [
        hours,
        day,
        dayCount,
        season,
        year
    ]
    window.localStorage.setItem("game", JSON.stringify(gameData));
    window.localStorage.setItem("resource", JSON.stringify(resourceData));
    window.localStorage.setItem("working", JSON.stringify(workerData));
    window.localStorage.setItem("research", JSON.stringify(researchData));
    window.localStorage.setItem("building", JSON.stringify(buildingData));
    window.localStorage.setItem("time", JSON.stringify(timeData));
}
function Load() {
    var retrievedData1 = JSON.parse(window.localStorage.getItem("game"));
    var retrievedData2 = JSON.parse(window.localStorage.getItem("resource"));
    var retrievedData3 = JSON.parse(window.localStorage.getItem("working"));
    var retrievedData4 = JSON.parse(window.localStorage.getItem("research"));
    var retrievedData5 = JSON.parse(window.localStorage.getItem("building"));
    var retrievedData6 = JSON.parse(window.localStorage.getItem("time"));
    //console.log(retrievedData1);
    //console.log(retrievedData2);
    //console.log(retrievedData3);
    //console.log(retrievedData4);
    //console.log(retrievedData5);
    //console.log(retrievedData6);
    //
    version = retrievedData1[0];
    civDetails = retrievedData1[1];
    achievements = retrievedData1[2];
    civClass = retrievedData1[3];
    kingdomClass = retrievedData1[4];
    tribe = retrievedData1[5];
    state = retrievedData1[6];
    //
    resources = retrievedData2[0];
    storage = retrievedData2[1];
    increments = retrievedData2[2];
    divisors = retrievedData2[3];
    //
    population = retrievedData3[0];
    workers = retrievedData3[1];
    militaryEnabled = retrievedData3[2];
    soldiers = retrievedData3[3];
    ERsoldiers = retrievedData3[4];
    //
    researchEnabled = retrievedData4[0];
    earlyAge = retrievedData4[1];
    //
    buildings = retrievedData5[0];
    type = retrievedData5[1];
    //
    hours = retrievedData6[0];
    day = retrievedData6[1];
    dayCount = retrievedData6[2];
    season = retrievedData6[3];
    year = retrievedData6[4];

    consoleLog("Save Loaded.");
}
function Auto() {
    if (autosave == "yes") {
        Save();
        consoleLog("Autosaved.");
        console.log("autosaved");
    } else {
        console.log("autosave unavailable");
    }
}
function Clear() {
    window.localStorage.clear();
    window.location.replace("saveCreator.html");
}