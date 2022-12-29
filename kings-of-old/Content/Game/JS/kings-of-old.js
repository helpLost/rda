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
//Global/Kingdom
const KingdomVarsGet = window.location.search;
const urlParams = new URLSearchParams(KingdomVarsGet);
civDetails = [
    king = urlParams.get('king'),
    kingdom = urlParams.get('kingdom'),
    god = urlParams.get('god'),
    save = urlParams.get('save'),
    civ = urlParams.get('civ'),
    autosave = urlParams.get('autosave'),
    achieve = urlParams.get('achieve'),
    difficulty = urlParams.get('diff')
]
civClass = [
    earlyKingdom = 1,
    middleKingdom = 0,
    moreMiddleKingdom = 0,
    lateKingdom = 0,
    laterKingdom = 0,
]
kingdomClass = [
    kingdomClass = undefined,
    leaderClass = undefined
]
repeat = 1;
version = "0.1.53a";
setup1 = false;
setup2 = false;

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
    ore = 0,
    hide = 0,
    roots = 0,
    cotton = 0
]
storage = [
    woodStorage = 100,
    stoneStorage = 150,
    foodStorage = 250,
    oreStorage = 50,
    hideStorage = 60,
    rootsStorage = 75,
    cottonStorage = 40,
    populationCap = 5,
    hunterCap = 10,
    lumberCap = 20,
    minerCap = 20,
]
increments = [
    woodAdd = 1,
    stoneAdd = 1,
    foodAdd = 1,
    workerWoodAdd = 1,
    workerStoneAdd = 1,
    workerFoodAdd = 1
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
    irrigation = false,
    rangedWeapons = false,
    fortification = false
]

/* Onload Functions */
setTimeout(console.log.bind(console, 'Running ' + version));
window.onload = function () {
    function appendKINGDOMInfo() {
        if (civClass[0] == 1) {
            kingdomClass[0] = "Tribal Village";
            kingdomClass[1] = "Chieftain";
            document.getElementById("faviconDiv").innerHTML = '<link href="Images/Misc./earlyAgeFavicon.png" rel="shortcut icon" type="image/x-icon" />';
            document.getElementById("kingdomWrap").innerHTML = "<h1 class = 'kingdomName'>The <a href = 'https://en.wikipedia.org/wiki/Tribe' target='_blank'>" + kingdomClass[0] + "</a> of " + civDetails[1];
            document.getElementById("kingWrap").innerHTML = "<h3 class = 'kingName'>Ruled by the Mighty <a href = 'https://en.wikipedia.org/wiki/Tribal_chief' target = '_blank'>" + kingdomClass[1] + "</a> " + civDetails[0];
            document.title = "Kings of Old | " + civDetails[3];
        }
        setup1 = true;
    }
    appendKINGDOMInfo();
    //Appending After-Resource Label
    function storageLabel() {
        document.getElementById("afterWood").innerHTML = "<label for = 'woodGather' class = 'after'><i> Max Storage: " + storage[0] + "</i></label>";
        document.getElementById("afterStone").innerHTML = "<label for = 'stoneGather' class = 'after'><i> Max Storage: " + storage[1] + "</i></label>";
        document.getElementById("afterFood").innerHTML = "<label for = 'foodGather' class = 'after'><i> Max Storage: " + storage[2] + "</i></label>";
        document.getElementById("afterOre").innerHTML = "<label for = 'ore' class = 'after'><i> Max Storage: " + storage[3] + "</i></label>";
        document.getElementById("afterHide").innerHTML = "<label for = 'hide' class = 'after'><i> Max Storage: " + storage[4] + "</i></label>";
        document.getElementById("afterRoots").innerHTML = "<label for = 'roots' class = 'after'><i> Max Storage: " + storage[5] + "</i></label>";
        document.getElementById("afterCotton").innerHTML = "<label for = 'cotton' class = 'after'><i> Max Storage: " + storage[6] + "</i></label>";
        setup2 = true;
    }
    var storageCheckInterval = self.setInterval(function () { storageLabel() }, 100);
    setTimeout(() => {
        if (setup1 == true && setup2 == true) {
            consoleLog("Game Loaded.");
        } else {
            consoleLog("Something went wrong.");
        }
    }, 100);
}

/* GameLog */
//CREDIT CIVCLICKER, SEE ABOVE
function consoleLog(message) {
    var infractionTime = '0:00';
    date = new Date();
    infractionTime = date.getHours() + ":" + date.getMinutes();

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
function selection2(pane2) {
    if (pane2 == 'worker') {
        document.getElementById("workerPage").style.display = "block";
        document.getElementById("soldierPage").style.display = "none";
        document.getElementById("conquestPage").style.display = "none";
        document.getElementById("workerTitle").className = "selector nborder selected";
        document.getElementById("soldierTitle").className = "selector border unselected";
        document.getElementById("conquestTitle").className = "selector border unselected";
    }
    if (pane2 == 'soldier') {
        document.getElementById("workerPage").style.display = "none";
        document.getElementById("soldierPage").style.display = "block";
        document.getElementById("conquestPage").style.display = "none";
        document.getElementById("workerTitle").className = "selector border unselected";
        document.getElementById("soldierTitle").className = "selector nborder selected";
        document.getElementById("conquestTitle").className = "selector border unselected";
    }
    if (pane2 == 'conquest') {
        document.getElementById("workerPage").style.display = "none";
        document.getElementById("soldierPage").style.display = "none";
        document.getElementById("conquestPage").style.display = "block";
        document.getElementById("workerTitle").className = "selector border unselected";
        document.getElementById("soldierTitle").className = "selector border unselected";
        document.getElementById("conquestTitle").className = "selector nborder selected";
    }
}
function selection3(pane3) {
    if (pane3 == 'building') {
        document.getElementById("buildingPage").style.display = "block";
        document.getElementById("upgradingPage").style.display = "none";
        document.getElementById("fortifyingPage").style.display = "none";
        document.getElementById("wonderPage").style.display = "none";
        document.getElementById("buildingTitle").className = "selector nborder selected";
        document.getElementById("upgradingTitle").className = "selector border unselected";
        document.getElementById("fortifyingTitle").className = "selector border unselected";
        document.getElementById("wonderTitle").className = "selector border unselected";
    }
    if (pane3 == 'upgrade') {
        document.getElementById("buildingPage").style.display = "none";
        document.getElementById("upgradingPage").style.display = "block";
        document.getElementById("fortifyingPage").style.display = "none";
        document.getElementById("wonderPage").style.display = "none";
        document.getElementById("buildingTitle").className = "selector border unselected";
        document.getElementById("upgradingTitle").className = "selector nborder selected";
        document.getElementById("fortifyingTitle").className = "selector border unselected";
        document.getElementById("wonderTitle").className = "selector border unselected";
    }
    if (pane3 == 'fortification') {
        document.getElementById("buildingPage").style.display = "none";
        document.getElementById("upgradingPage").style.display = "none";
        document.getElementById("fortifyingPage").style.display = "block";
        document.getElementById("wonderPage").style.display = "none";
        document.getElementById("buildingTitle").className = "selector border unselected";
        document.getElementById("upgradingTitle").className = "selector border unselected";
        document.getElementById("fortifyingTitle").className = "selector nborder selected";
        document.getElementById("wonderTitle").className = "selector border unselected";
    }
    if (pane3 == 'wonders') {
        document.getElementById("buildingPage").style.display = "none";
        document.getElementById("upgradingPage").style.display = "none";
        document.getElementById("fortifyingPage").style.display = "none";
        document.getElementById("wonderPage").style.display = "block";
        document.getElementById("buildingTitle").className = "selector border unselected";
        document.getElementById("upgradingTitle").className = "selector border unselected";
        document.getElementById("fortifyingTitle").className = "selector border unselected";
        document.getElementById("wonderTitle").className = "selector nborder selected";
    }
}

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

/* Resources Addition */
function updateRSS() {
    document.getElementById("WlabelDiv").innerHTML = "Wood: " + round(Math.floor(resources[0]));
    document.getElementById("SlabelDiv").innerHTML = "Stone: " + round(Math.floor(resources[1]));
    document.getElementById("FlabelDiv").innerHTML = "Food: " + round(Math.floor(resources[2]));
    document.getElementById("OlabelDiv").innerHTML = "Ore: " + round(Math.floor(resources[3]));
    document.getElementById("HlabelDiv").innerHTML = "Hide: " + round(Math.floor(resources[4]));
    document.getElementById("RlabelDiv").innerHTML = "Roots: " + round(Math.floor(resources[5]));
    document.getElementById("ClabelDiv").innerHTML = "Cotton: " + round(Math.floor(resources[6]));
}
function AddResource(rss) {
    if (rss == 'wood') {
        resources[0] = resources[0] + 1;
        updateRSS();
        AddSpecialResource('roots')
    }
    if (rss == 'stone') {
        resources[1] = resources[1] + 1;
        updateRSS();
        AddSpecialResource('ore')
    }
    if (rss == 'food') {
        resources[2] = resources[2] + 1;
        updateRSS();
        AddSpecialResource('hide')
    }
}
function AddSpecialResource(rss) {
    if (rss == 'ore') {
        var OreChance = Math.floor(Math.random() * 15);
        if (OreChance == 3) {
            resources[3] = resources[3] + 1;
            consoleLog("Found ore while mining!")
            updateRSS();
        }
    }
    if (rss == 'hide') {
        var HideChance = Math.floor(Math.random() * 10);
        if (HideChance == 3) {
            resources[4] = resources[4] + 1;
            consoleLog("Found hide while hunting!");
            updateRSS();
        }
    }
    if (rss == 'roots') {
        var RootChance = Math.floor(Math.random() * 28);
        if (RootChance == 3) {
            resources[5] = resources[5] + 1;
            consoleLog("Found roots while foraging!");
            updateRSS();
        }
    }
}
function rssCapCheck() {
    if (resources[0] >= 100) {
        resources[0] = 100;
        element = document.getElementById("woodGather");
        element.setAttribute("disabled", true);
        element.setAttribute("title", "Build more wood pits.");
    } else {
        element = document.getElementById("woodGather");
        element.removeAttribute("disabled", true);
        element.setAttribute("title", "Cut down trees to get wood.");
    }
    if (resources[1] >= 150) {
        resources[1] = 150;
        element = document.getElementById("stoneGather");
        element.setAttribute("disabled", true);
        element.setAttribute("title", "Build more stone sheds.");
    } else {
        element = document.getElementById("stoneGather");
        element.removeAttribute("disabled", true);
        element.setAttribute("title", "Break rocks to get stone.");
    }
    if (resources[2] >= 250) {
        resources[2] = 250;
        element = document.getElementById("foodGather");
        element.setAttribute("disabled", true);
        element.setAttribute("title", "Build more food caves.");
    } else {
        element = document.getElementById("foodGather");
        element.removeAttribute("disabled", true);
        element.setAttribute("title", "Hunt game to get food.");
    }
    if (resources[3] >= 50) {
        resources[3] = 50;
    }
    if (resources[4] >= 60) {
        resources[4] = 60;
    }
    if (resources[5] >= 75) {
        resources[5] = 75;
    }
    if (resources[6] >= 40) {
        resources[6] = 40;
    }
}
var capInterval = self.setInterval(function () { rssCapCheck() }, 50);

function workerRSS() {
    if (workers[0] >= 1) {
        increments[0] = workers[0] / 2;
        resources[0] = resources[0] + increments[0];
        updateRSS();
    }
    if (workers[1] >= 1) {
        increments[1] = workers[1] / 1.2;
        resources[1] = resources[1] + increments[1];
        updateRSS();
    }
    if (workers[2] >= 1) {
        increments[2] = workers[2] / 4;
        resources[2] = resources[2] + increments[2];
        updateRSS();
    }
}
function workerSPECRSS() {
    if (workers[0] >= 1) {
        AddSpecialResource('roots');
        setTimeout(() => {
            updateRSS();
        }, 100);
    }
    if (workers[1] >= 1) {
        AddSpecialResource('ore');
        setTimeout(() => {
            updateRSS();
        }, 100);
    }
    if (workers[2] >= 1) {
        AddSpecialResource('hide');
        setTimeout(() => {
            updateRSS();
        }, 100);
    }
}
var workerRSSInterval = self.setInterval(function () { workerRSS(), workerSPECRSS() }, 1500);
//TAKEN AND MODIFIED FROM CIVCLICKER, SEE ABOVE
function round(input) {
    var output = '';
    output = input.toString();
    var before = '',
        after = '',
        digitCount = 0;
    delimiter = "&#8239;"; //thin space is the ISO standard thousands delimiter. we need a non-breaking version

    //first split the string on the decimal point, and assign to the before and after
    var parts = output.split('.');
    if (typeof parts[1] === 'string') var after = '.' + parts[1]; //check it's defined first, and tack a decimal point to the start of it

    //then insert the commas in the characteristic
    var charArray = parts[0].split(""); //breaks it into an array
    for (var i = charArray.length; i > 0; i--) { //counting backwards through the array
        before = charArray[i - 1] + before; //add the array item at the front of the string
        digitCount++;
        if (digitCount == 3 && i != 1) { //once every three digits (but not at the head of the number)
            before = delimiter + before; //add the delimiter at the front of the string
            digitCount = 0;
        }
    }
    output = before + after; //reassemble the number
    return output;
}

/* Population Addition */
function updatePPL() {
    document.getElementById("HUlabelDiv").innerHTML = "<p id = 'HCount'>Hunters: " + workers[2] + "</p>";
    document.getElementById("PlabelDiv").innerHTML = "<label for='workerRecruit'>Citizens: " + population + "</label>";
    document.getElementById("UNlabelDiv").innerHTML = "<p id = 'UNCount'>Unemployed: " + workers[3] + "</p>";
    document.getElementById("LJlabelDiv").innerHTML = "<p id = 'LJCount'>Lumberjacks: " + workers[0] + "</p>";
    document.getElementById("MlabelDiv").innerHTML = "<p id = 'MCount'>Miners: " + workers[1] + "</p>";
}
function addWorker() {
    if (resources[2] >= 10) {
        workers[3] = workers[3] + 1;
        population = population + 1;
        updatePPL();
    }
}
function addSpecialized(type) {
    if (workers[3] >= 1) {
        if (type == 'wood') {
            workers[0] = workers[0] + 1;
            workers[3] = workers[3] - 1;
            updatePPL();
        }
        if (type == 'stone') {
            workers[1] = workers[1] + 1;
            workers[3] = workers[3] - 1;
            updatePPL();
        }
        if (type == 'food') {
            workers[2] = workers[2] + 1;
            workers[3] = workers[3] - 1;
            updatePPL();
        }
    }
}
function removeSpecialized(type, kind) {
    if (workers[kind] >= 1) {
        workers[3] = workers[3] + 1;
        if (type == 'wood') {
            workers[0] = workers[0] - 1;
            updatePPL();
        }
        if (type == 'stone') {
            workers[1] = workers[1] - 1;
            updatePPL();
        }
        if (type == 'food') {
            workers[2] = workers[2] - 1;
            updatePPL();
        }
    }
}