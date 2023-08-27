// This JS file is the entirety of the functions, and literally everything
// in the Rising Dawn game.
// Please proceed with caution, for if the wrong thing is messed up,
// your save and/or future saves may be corrupted,
// and the game may not function as it should.
//
// CREDITS:
//
// https://civclicker.sourceforge.net/civclicker/civclicker.html
// Some of the Javascript elements are taken and modified from here.
//
// https://www.w3schools.com/
// I feel as if this is a given. Some of the techniques were learned from here.
//
// https://stackoverflow.com/
// This site helped a lot with the HTML forms and some Javascript components.
//

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
tribe = undefined;
state = undefined;
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
    trader = 1,
    cheater = 1
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
divisors = [
    nomadicWood = 2,
    nomadicStone = 1.2,
    nomadicFood = 4,
    stationaryWood = 1.5,
    stationaryStone = 1,
    stationaryFood = 3.2
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
tiers = [
    researcht2 = false,
    researchst2 = false,
    researchnt2 = false,
    researcht3 = false,
    researchst3 = false,
    researchnt3 = false,
    researcht4 = false,
    researchst4 = false,
    researchnt4 = false
]
earlyAge = [
    shelter = false,
    fire = false,
    stationary = false,
    nomadic = true,
    agriculture = false,
    advancedTools = false,
    advancedWeapons = false,
    irrigation = false,
    calendars = false,
    rangedWeapons = false,
    longerClubs = false,
    fortification = false
]
//buildings
buildings = 0;
type = [
    tents = 0,
    barracks = 0,
    HC = 0,
    MS = 0,
    LH = 0,
    GP = 0,
    WP = 0,
    SS = 0,
    FC = 0,
    WH = 0,
]

/* Onload Functions */
setTimeout(console.log.bind(console, 'Running ' + version));
window.onload = function () {
    setTimeout(() => {
        appendKINGDOMInfo();
    }, 100);
    //Appending After-Resource Label
    var storageCheckInterval = self.setInterval(function () { storageLabel() }, 100);
    var researchCheckInterval = self.setInterval(function () { checkResearch(), enableResearch() }, 1);
    var checkResearchInterval = self.setInterval(function () { checkResearch(), enableResearch() }, 1);
    setTimeout(() => {
        if (setup1 == true && setup2 == true) {
            consoleLog("Game Loaded.");
        } else {
            consoleLog("Something went wrong.");
        }
    }, 100);
    function appendVersion() {
        document.getElementById("versionLabel").innerHTML = "(" + version + ")";
    }
    appendVersion();
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
        document.getElementById('entr1').innerHTML = "<td id='time'> " + infractionTime + "</td><td id='log'> " + message + "</td><td id='amount'>(x" + repeat + ")</td>";
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
    if (resources[0] >= storage[0]) {
        resources[0] = storage[0];
        element = document.getElementById("woodGather");
        element.setAttribute("disabled", true);
        element.setAttribute("title", "Build more wood pits.");
    } else {
        element = document.getElementById("woodGather");
        element.removeAttribute("disabled", true);
        element.setAttribute("title", "Cut down trees to get wood.");
    }
    if (resources[1] >= storage[1]) {
        resources[1] = storage[1];
        element = document.getElementById("stoneGather");
        element.setAttribute("disabled", true);
        element.setAttribute("title", "Build more stone sheds.");
    } else {
        element = document.getElementById("stoneGather");
        element.removeAttribute("disabled", true);
        element.setAttribute("title", "Break rocks to get stone.");
    }
    if (resources[2] >= storage[2]) {
        resources[2] = storage[2];
        element = document.getElementById("foodGather");
        element.setAttribute("disabled", true);
        element.setAttribute("title", "Build more food caves.");
    } else {
        element = document.getElementById("foodGather");
        element.removeAttribute("disabled", true);
        element.setAttribute("title", "Hunt game to get food.");
    }
    if (resources[3] >= storage[3]) {
        resources[3] = storage[3];
    }
    if (resources[4] >= storage[4]) {
        resources[4] = storage[4];
    }
    if (resources[5] >= storage[5]) {
        resources[5] = storage[5];
    }
    if (resources[6] >= storage[6]) {
        resources[6] = storage[6];
    }
}
var capInterval = self.setInterval(function () { rssCapCheck() }, 50);

function workerRSS() {
    if (nomadic == true) {
        if (workers[0] >= 1) {
            increments[0] = workers[0] / nomadicWood;
            resources[0] = resources[0] + increments[0];
            updateRSS();
        }
        if (workers[1] >= 1) {
            increments[1] = workers[1] / nomadicStone;
            resources[1] = resources[1] + increments[1];
            updateRSS();
        }
        if (workers[2] >= 1) {
            increments[2] = workers[2] / nomadicFood;
            resources[2] = resources[2] + increments[2];
            updateRSS();
        }
    } else {
        if (workers[0] >= 1) {
            increments[0] = workers[0] / stationaryWood;
            resources[0] = resources[0] + increments[0];
            updateRSS();
        }
        if (workers[1] >= 1) {
            increments[1] = workers[1] / stationaryStone;
            resources[1] = resources[1] + increments[1];
            updateRSS();
        }
        if (workers[2] >= 1) {
            increments[2] = workers[2] / stationaryFood;
            resources[2] = resources[2] + increments[2];
            updateRSS();
        }
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
        resources[2] = resources[2] - 10;
        updatePPL();
        updateRSS();
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
function taken() {
    if (workers[0] >= 1) {
        if (advancedTools == false) {
            var takenChance = Math.floor(Math.random() * 1000);
            if (takenChance == 21) {
                consoleLog("Lumberjack eaten by wolves.");
                workers[0] = workers[0] - 1;
            }
        } else {
            var takenChance = Math.floor(Math.random() * 50000);
            if (takenChance == 21) {
                consoleLog("Lumberjack eaten by wolves.");
                workers[0] = workers[0] - 1;
            }
        }
    }
    if (workers[2] >= 1) {
        if (advancedTools == false) {
            var takenChance = Math.floor(Math.random() * 1000);
            if (takenChance == 21) {
                consoleLog("Hunter eaten by wolves.");
                workers[2] = workers[2] - 1;
            }
        } else {
            var takenChance = Math.floor(Math.random() * 50000);
            if (takenChance == 21) {
                consoleLog("Hunter eaten by wolves.");
                workers[2] = workers[2] - 1;
            }
        }
    }
}
var takenInterval = self.setInterval(function () { taken() }, 1000);

/* Research */
function checkResearch() {
    if (type[5] >= 1) {
        researchEnabled = true;
    }
    if (earlyAge[2] == true) {
        tiers[1] = true;
    }
    if (earlyAge[3] == true) {
        tiers[2] = true;
    }
    if (earlyAge[2] == true || earlyAge[3] == true) {
        tiers[0] = true;
    }
    if (earlyAge[0] && earlyAge[1] && earlyAge[5]) {
        if (earlyAge[2] == true) {
            tiers[4] = true;
        }
        if (earlyAge[3] == true) {
            tiers[5] = true;
        }
        tiers[3] = true;
    }
}
function enableResearch() {
    if (researchEnabled == true) {
        document.getElementById("researchWrap").style.display = "block";
        document.getElementById("no-research").style.display = "none";
    } else {
        document.getElementById("researchWrap").style.display = "none";
        document.getElementById("no-research").style.display = "block";
    }
    if (tiers[1] == true) {
        document.getElementById("fireWrap").style.display = "block";
        document.getElementById("shelterWrap").style.display = "block";
    } else {
        document.getElementById("fireWrap").style.display = "none";
        document.getElementById("shelterWrap").style.display = "none";
    }
    if (tiers[0] == true) {
        document.getElementById("ATWrap").style.display = "block";
    } else {
        document.getElementById("ATWrap").style.display = "none";
    }
    if (tiers[4] == true) {
        document.getElementById("fireWrap").style.display = "block";
        document.getElementById("shelterWrap").style.display = "block";
    } else {
        document.getElementById("fireWrap").style.display = "none";
        document.getElementById("shelterWrap").style.display = "none";
    }
    if (tiers[3] == true) {
        document.getElementById("Wrap").style.display = "block";
    } else {
        document.getElementById("ATWrap").style.display = "none";
    }
}
function changeState(state) {
    if (state == 'nomadic') {
        if (resources[2] >= 600 && resources[0] >= 250) {
            earlyAge[3] = true;
            earlyAge[2] = false;
            resources[2] = resources[2] - 600;
            resources[0] = resources[0] - 250;
            changeType("nomad");
            document.getElementById("stationaryWrap").style.display = "none";
            document.getElementById("nomadicWrap").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (state == 'stationary') {
        if (resources[2] >= 750) {
            earlyAge[2] = true;
            earlyAge[3] = false;
            changeType("settle");
            resources[2] = resources[2] - 750;
            document.getElementById("stationaryWrap").style.display = "none";
            document.getElementById("nomadicWrap").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
}

/* Buildings */
function updateBLD() {
    document.getElementById("builtTents").innerHTML = "Tents: " + type[0];
    document.getElementById("builtBarracks").innerHTML = "Barracks: " + type[1];
    document.getElementById("builtHC").innerHTML = "Hunter's Cabins: " + type[2];
    document.getElementById("builtMS").innerHTML = "Miner Shacks: " + type[3];
    document.getElementById("builtLH").innerHTML = "Lumber Huts: " + type[4];
    document.getElementById("builtGP").innerHTML = "Gathering Places: " + type[5];
    document.getElementById("builtwoodPits").innerHTML = "Woodpits: " + type[6];
    document.getElementById("builtstoneSheds").innerHTML = "Stone Sheds: " + type[7];
    document.getElementById("builtfoodCaves").innerHTML = "Food Caves: " + type[8];
}
function addBuilding(kind) {
    if (kind == '1') {
        if (resources[0] >= 15 && resources[4] >= 5) {
            type[0] = type[0] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 15;
            resources[4] = resources[4] - 5;
            updateBLD();
            updateRSS();
        }
    }
    if (kind == '2') {
        if (resources[0] >= 175 && resources[4] >= 15) {
            type[1] = type[1] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 175;
            resources[4] = resources[4] - 15;
            updateBLD();
            updateRSS();
        }
    }
    if (kind == '3') {
        if (resources[0] >= 90 && resources[1] >= 30) {
            type[2] = type[2] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 90;
            resources[1] = resources[1] - 30;
            updateBLD();
            updateRSS();
        }
    }
    if (kind == '4') {
        if (resources[0] >= 35 && resources[1] >= 32) {
            type[3] = type[3] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 35;
            resources[1] = resources[1] - 32;
            updateBLD();
            updateRSS();
        }
    }
    if (kind == '5') {
        if (resources[0] >= 35 && resources[4] >= 5) {
            type[4] = type[4] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 35;
            resources[4] = resources[4] - 5;
            updateBLD();
            updateRSS();
        }
    }
    if (kind == '6') {
        if (resources[0] >= 250 && resources[4] >= 10) {
            type[5] = type[5] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 250;
            resources[4] = resources[4] - 10;
            updateBLD();
            updateRSS();
        }
    }
    if (kind == '7') {
        if (resources[0] >= 48 && resources[4] >= 5) {
            type[6] = type[6] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 48;
            resources[4] = resources[4] - 5;
            increaseCap('wood');
            updateBLD();
            updateRSS();
        }
    }
    if (kind == '8') {
        if (resources[0] >= 50 && resources[1] >= 42) {
            type[7] = type[7] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 50;
            resources[1] = resources[1] - 42;
            updateBLD();
            updateRSS();
        }
    }
    if (kind == '9') {
        if (resources[0] >= 35 && resources[1] >= 55) {
            type[8] = type[8] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 35;
            resources[1] = resources[1] - 55;
            updateBLD();
            updateRSS();
        }
    }
}
function enableRE() {
    storage[0] = storage[0] + 150;
    resources[0] = resources[0] + 250;
    resources[4] = resources[0] + 10;
    resources[2] = resources[2] + 300;
    storage[2] = storage[2] + 300;
    updateRSS();
}

/* Important Tribe Things */
var hours = 0;
var day = 0;
var dayCount = 0;
var season = "Spring";
function decideSeason() {
    if(hours >= 10) {
        day = day + 1;
        hours = 0;
    } else {
        hours = hours + 1;
    }
    if(day <= 50){
        season = "Spring";
        dayCount = day;
        appendKINGDOMInfo();
    } 
    if (day <= 100 && day > 50) {
        season = "Summer";
        dayCount = day - 50;
        appendKINGDOMInfo();
    }
    if(day <= 150 && day > 100){
        season = "Fall";
        dayCount = day - 100;
        appendKINGDOMInfo();
    } 
    if (day <= 200 && day > 150) {
        season = "Winter";
        dayCount = day - 150;
        appendKINGDOMInfo();
    }
    if(day > 200){
        console.log("New Year.")
        day = 0;
        dayCount = 0;
    }
}
var seasonInterval = self.setInterval(function () { decideSeason() }, 1000);
function changeType(type) {
    if (type == "nomad") {
        state = "Nomadic ";
    }
    if (type == "settle") {
        state = "";
    }
    document.getElementById("civWrap").innerHTML = state + " " + civDetails[4] + tribe + " Tribe";
}
if (civDetails[4] == 'Random') {
    var civChance = Math.floor(Math.random() * 6);
    if (civChance == 1) {
        civDetails[4] = 'Europe';
    }
    if (civChance == 2) {
        civDetails[4] = 'Southeastern Asia';
    }
    if (civChance == 3) {
        civDetails[4] = 'Northern Asia';
    }
    if (civChance == 4) {
        civDetails[4] = 'Africa';
    }
    if (civChance == 5) {
        civDetails[4] = 'North America';
    }
    if (civChance == 6) {
        civDetails[4] = 'Central America';
    }
}
function createTribe() {
    if (civDetails[4] == 'Europe') {
        tribe = "an";
    } else {
        tribe = "n";
    }
}
createTribe();
function appendKINGDOMInfo() {
    if (civClass[0] == 1) {
        kingdomClass[0] = "Tribal Village";
        kingdomClass[1] = "Chieftain";
        document.getElementById("faviconDiv").innerHTML = '<link href="Images/Misc./earlyAgeFavicon.png" rel="shortcut icon" type="image/x-icon" />';
        document.getElementById("kingdomWrap").innerHTML = "<h1 class = 'kingdomName'>The <a href = 'https://en.wikipedia.org/wiki/Tribe' target='_blank'>" + kingdomClass[0] + "</a> of " + civDetails[1];
        document.getElementById("kingWrap").innerHTML = "<h3 class = 'kingName'>Ruled by the Mighty <a href = 'https://en.wikipedia.org/wiki/Tribal_chief' target = '_blank'>" + kingdomClass[1] + "</a> " + civDetails[0];
        document.title = "Rising Dawns | " + civDetails[3];
        if (earlyAge[3] == true) {
            if (civDetails[4] == 'Random') {
                civDetails[4] = 'Southeastern Asia';
            }
            document.getElementById("civWrap").innerHTML = "Nomadic " + civDetails[4] + tribe + " Tribe | Day " + dayCount + " of " + season;
        }
    }
    setup1 = true;
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
    window.localStorage.setItem("game", JSON.stringify(gameData));
    window.localStorage.setItem("resource", JSON.stringify(resourceData));
    window.localStorage.setItem("working", JSON.stringify(workerData));
    window.localStorage.setItem("research", JSON.stringify(researchData));
    window.localStorage.setItem("building", JSON.stringify(buildingData));
}
function Load() {
    var retrievedData1 = JSON.parse(window.localStorage.getItem("game"));
    var retrievedData2 = JSON.parse(window.localStorage.getItem("resource"));
    var retrievedData3 = JSON.parse(window.localStorage.getItem("working"));
    var retrievedData4 = JSON.parse(window.localStorage.getItem("research"));
    var retrievedData5 = JSON.parse(window.localStorage.getItem("building"));
    //console.log(retrievedData1);
    //console.log(retrievedData2);
    //console.log(retrievedData3);
    //console.log(retrievedData4);
    //console.log(retrievedData5);
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
    ERsoldier = retrievedData3[4];
    //
    researchEnabled = retrievedData4[0];
    earlyAge = retrievedData4[1];
    //
    buildings = retrievedData5[0];
    type = retrievedData5[1];
    updateRSS();
    updateBLD();
    updatePPL();
    appendKINGDOMInfo();
    storageLabel();
    consoleLog("Save Loaded.");
}
function Auto() {
    Save();
    consoleLog("Autosaved.");
}
var autoInterval = self.setInterval(function () { Auto() }, 120000);
function Clear() {
    window.localStorage.clear();
    window.location.replace("saveCreator.html");
}