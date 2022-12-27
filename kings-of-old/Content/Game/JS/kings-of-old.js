//This is the beginning of the transfer from Jquery to vanilla JS.
//I'm transferring so this project becomes more of a learning experience,
//Rather than a copy-and-paste from Stack Overflow project.
//
//This JS file is the entirety of the functions, and literally everything
//in the Kings of Old game.
//Please proceed with caution, for if the wrong thing is messed up,
//your save and/or future saves may be corrupted,
//and the game may not function as it should.
//
//CREDITS:
//https://civclicker.sourceforge.net/civclicker/civclicker.html
//Some of the Javascript elements are taken and modified from here.
//
//https://www.w3schools.com/
//I feel as if this is a given. Some of the techniques were learned from here.
//
//https://stackoverflow.com/
//This site helped a lot with the HTML forms and some Javascript components.

/* Variables */
repeat = 1;
wonderCount = 0;
version = "0.1.53a";

// Achievements
achievements = [
    tst = 1,
    deforestation = 1,
    moverOfMountains = 1,
    overboard = 1,
    getOut = 1,
    trader = 1
]

//Resources
resources = [
    woodCount = 0,
    stoneCount = 0,
    foodCount = 0,
    roots = 0,
    ore = 0,
    hide = 0,
    cotton = 0
]
storage = [
    woodStorage = 100,
    stoneStorage = 150,
    foodStorage = 250
]
increments = [
    woodAdd = 1,
    stoneAdd = 1,
    foodAdd = 1
]

//People
population = 0;
workers = [
    woodWorkers = 0,
    stoneWorkers = 0,
    foodWorkers = 0,
    unemployed = 0
]
militaryEnabled = false;
soldiers = 0;
ERsoldiers = [
    brawlers = 0,
    clubbers = 0,
    slingers = 0
]
//Research
researchEnabled = false;

earlyAge = [
    shelter = false,
    fire = false,
    stationary = false,
    agriculture = false,
    advancedTools = false,
    advancedWeapons = false,
    irrigation = false
]


/* Onload Functions */
setTimeout(console.log.bind(console, 'Running ' + version));
window.onload = function () {
    if (civ == "Random") {
        var RandomNumber = Math.floor(Math.random() * 7);

        if (RandomNumber == 0) {
            civ = 'England';
        }
        if (RandomNumber == 1) {
            civ = 'Ottoman Empire';
        }
        if (RandomNumber == 2) {
            civ = 'Delhi Sultanate';
        }
        if (RandomNumber == 3) {
            civ = 'France';
        }
        if (RandomNumber == 4) {
            civ = 'Russia';
        }
        if (RandomNumber == 5) {
            civ = 'Greece';
        }
        if (RandomNumber == 6) {
            civ = 'America';
        }
    };
    //Appending After-Resource Label
    function storageLabel() {
        document.getElementById("afterWood").innerHTML = "<label for = 'woodGather' class = 'after'> Max Storage: " + storage[0] + "</label>";
        document.getElementById("afterStone").innerHTML = "<label for = 'stoneGather' class = 'after'> Max Storage: " + storage[1] + "</label>";
        document.getElementById("afterFood").innerHTML = "<label for = 'foodGather' class = 'after'> Max Storage: " + storage[2] + "</label>";
    }
    var storageCheckInterval = self.setInterval(function () { storageLabel() }, 100);
    consoleLog("Game Loaded.");
}

/* GameLog */
//CREDIT CIVCLICKER, SEE ABOVE
function consoleLog(message) {
    var infractionTime = '0:00';
    date = new Date();
    infractionTime = date.getHours() + ":" + date.getMinutes();
    /*if (date.getHours() < 12 && date.getMinutes() < 60) {
        infractionTime = 
    }*/
    if (date.getMinutes() < 10) {
        infractionTime = date.getHours() + ":0" + date.getMinutes();
    }
    if (document.getElementById("log").innerHTML == message) {
        repeat += 1;
        document.getElementById("entr1").innerHTML = "<td id = 'time'> " + infractionTime + "</td><td id = 'log'> " + message + "</td><td id = 'amount'>(x" + repeat + ")</td>";
    } else {
        repeat = 1;

        document.getElementById('entr20').innerHTML = document.getElementById('entr19').innerHTML
        document.getElementById('entr19').innerHTML = document.getElementById('entr18').innerHTML
        document.getElementById('entr18').innerHTML = document.getElementById('entr17').innerHTML
        document.getElementById('entr17').innerHTML = document.getElementById('entr16').innerHTML
        document.getElementById('entr16').innerHTML = document.getElementById('entr15').innerHTML
        document.getElementById('entr15').innerHTML = document.getElementById('entr14').innerHTML
        document.getElementById('entr14').innerHTML = document.getElementById('entr13').innerHTML
        document.getElementById('entr13').innerHTML = document.getElementById('entr12').innerHTML
        document.getElementById('entr12').innerHTML = document.getElementById('entr11').innerHTML
        document.getElementById('entr11').innerHTML = document.getElementById('entr10').innerHTML
        document.getElementById('entr10').innerHTML = document.getElementById('entr9').innerHTML
        document.getElementById('entr9').innerHTML = document.getElementById('entr8').innerHTML
        document.getElementById('entr8').innerHTML = document.getElementById('entr7').innerHTML
        document.getElementById('entr7').innerHTML = document.getElementById('entr6').innerHTML
        document.getElementById('entr6').innerHTML = document.getElementById('entr5').innerHTML
        document.getElementById('entr5').innerHTML = document.getElementById('entr4').innerHTML
        document.getElementById('entr4').innerHTML = document.getElementById('entr3').innerHTML
        document.getElementById('entr3').innerHTML = document.getElementById('entr2').innerHTML
        document.getElementById('entr2').innerHTML = '<td>' + document.getElementById('time').innerHTML + '</td><td>' + document.getElementById('log').innerHTML + '</td><td>' + document.getElementById('amount').innerHTML + '</td>';
        document.getElementById('entr1').innerHTML = '<td id="time"> ' + infractionTime + '</td><td id="log">' + message + '</td><td id="amount">(x' + repeat + ')</td>';
    }
}

/* Pane Selection */
//CREDIT CIVCLICKER, SEE ABOVE
function selection(pane) {
    if (pane == 'resource') {
        document.getElementById("resourcePage").style.display = "block";
        document.getElementById("researchPage").style.display = "none";
        document.getElementById("relicPage").style.display = "none";
        document.getElementById("resourceTitle").className = "selector nborder selected";
        document.getElementById("researchTitle").className = "selector border unselected";
        document.getElementById("relicTitle").className = "selector border unselected";
    }
    if (pane == 'research') {
        document.getElementById("resourcePage").style.display = "none";
        document.getElementById("researchPage").style.display = "block";
        document.getElementById("relicPage").style.display = "none";
        document.getElementById("resourceTitle").className = "selector border unselected";
        document.getElementById("researchTitle").className = "selector nborder selected";
        document.getElementById("relicTitle").className = "selector border unselected";
    }
    if (pane == 'relic') {
        document.getElementById("resourcePage").style.display = "none";
        document.getElementById("researchPage").style.display = "none";
        document.getElementById("relicPage").style.display = "block";
        document.getElementById("resourceTitle").className = "selector border unselected";
        document.getElementById("researchTitle").className = "selector border unselected";
        document.getElementById("relicTitle").className = "selector nborder selected";
    }
}

/* Onclick Transforms */
function settingsAni(id) {
    id.style.fontSize = "18px";
    setTimeout(() => {
        id.style.fontSize = "20px";
    }, 50);
}

/* Saving */
function SAVESYS() {
    /* CAUTION! MESSING WITH THIS CODE MAY RESULT IN YOUR SAVE FILE BEING CORRUPTED OR UNABLE TO BE CREATED. PROCEED WITH CAUTION. */
    consoleLog("Saved.");
}
function SAVELOADSYS() {
    /* CAUTION! MESSING WITH THIS CODE MAY RESULT IN YOUR SAVE FILE BEING CORRUPTED OR UNABLE TO BE CREATED. PROCEED WITH CAUTION. */
    consoleLog("Loaded from LocalStorage.");
}
function clearSave() {
    window.localStorage.clear();
    storageCleared = true;
    window.localStorage.setItem("clear", JSON.stringify(storageCleared));
    location.replace("saveCreator.html");
}

/* Checks */
//Research Check
/*function researchCheck() {
    if (gathering >= 1) {
        researchEnabled = true;
    }
}
var researchCheckInterval = self.setInterval(function () { researchCheck() }, 1);*/

/* Population */
function addPerson() {
    if (resources[2] >= 10) {
        population = population + 1;
        workers[3] = workers[3] + 1;
        resources[2] = resources[2] - 10;
        document.getElementById("PlabelDiv").innerHTML = "<label for = 'workerRecruit' id = 'PCount'>Citizens: " + population + "</label>";
    }
    if (resources[2] < 10) {
        consoleLog("Not enough food!");
    }
}
function addSoldier() {
    if (resources[2] >= 10 && resources[5] >= 2) {
        population = population + 1;
        ERsoldiers[0] = ERsoldiers[0] + 1;
        resources[2] = resources[2] - 10;
        resources[5] = resources[5] - 2;
        document.getElementById("SOlabelDiv").innerHTML = "<label for = 'soldierRecruit' id = 'SOCount'>Soldiers: " + soldiers + "</label>"; 
    }
    if (resources[2] <= 10 || resources[5] <= 2) {
        consoleLog("Not enough resources!");
    }
}

/* Resource Addition */
function addResource(rss) {
    if (rss == 'wood') {
        resources[0] = resources[0] + increments[0];
        document.getElementById("WlabelDiv").innerHTML = "<label for = 'woodGather' id = 'WCount'>Wood: " + resources[0] + "</label>";
        addSpecialResource('roots');
    }
    if (rss == 'food') {
        resources[2] = resources[2] + increments[2];
        document.getElementById("FlabelDiv").innerHTML = "<label for = 'foodGather' id = 'FCount'>Food: " + resources[2] + "</label>";
        addSpecialResource('hide');
    }
    if (rss == 'stone') {
        resources[1] = resources[1] + increments[1];
        document.getElementById("SlabelDiv").innerHTML = "<label for = 'stoneGather' id = 'SCount'>Stone: " + resources[1] + "</label>";
        addSpecialResource('ore');
    }
}

function workerAddResource(rss) {
    if (rss == 'wood') {

    }
    if (rss == 'stone') {

    }
    if (rss == 'food') {

    }
}

function addSpecialResource(spec) {
    if (spec == 'roots') {
        var rootChance = Math.floor(Math.random() * 20);

        if (rootChance == 3) {
            resources[3] = resources[3] + 1;
            document.getElementById("RlabelDiv").innerHTML = "<p id = 'RCount'>Roots: " + resources[3] + "</p>";
        }
    }
    if (spec == 'hide') {
        var hideChance = Math.floor(Math.random() * 10);

        if (hideChance == 3) {
            resources[5] = resources[5] + 1;
            document.getElementById("HlabelDiv").innerHTML = "<p id = 'HCount'>Hide: " + resources[5] + "</p>";
        }
    }
    if (spec == 'ore') {
        var oreChance = Math.floor(Math.random() * 15);

        if (oreChance == 3) {
            document.getElementById("OlabelDiv").innerHTML = "<p id = 'OCount'>Ore: " + resources[4] + "</p>";
            resources[4] = resources[4] + 1;
        }
    }
}