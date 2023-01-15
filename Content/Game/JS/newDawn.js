/*----
This JS file is the entirety of the functions, and literally everything
in the Rising Dawn game.
Please proceed with caution, for if the wrong thing is messed up,
your save and/or future saves may be corrupted,
and the game may not function as it should.
----*/

/*----
CREDITS:
-https://civclicker.sourceforge.net/civclicker/civclicker.html
Some of the Javascript elements are taken and modified from here.
-https://www.w3schools.com/
I feel as if this is a given. Some of the techniques were learned from here.
-https://stackoverflow.com/
This site helped a lot with the HTML forms and some Javascript components.
----*/

/*----Variables----*/
//Globals
const KingdomVarsGet = window.location.search;
const urlParams = new URLSearchParams(KingdomVarsGet);
civDetails = [
    king = urlParams.get('king'),
    kingdom = urlParams.get('kingdom'),
    god = urlParams.get('god'),
    save = urlParams.get('save'),
    civ = urlParams.get('region'),
    autosave = urlParams.get('autosave'),
    achieve = urlParams.get('achievement'),
    difficulty = urlParams.get('difficulty')
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
version = "0.1.54a";
setup1 = false;
setup2 = false;

//Achievements
achievements = [
    //resources
    tst = false,
    properCapitalist = false,
    climateDestruction = false,
    inhospitable = false,
    killerOfTrees = false,
    climateChange = false,
    speedRunner = false,
    gottaBeABug = false,
    //buildings
    group = false,
    tribe = false,
    village = false,
    town = false,
    city = false,
    largeCity = false,
    capital = false,
    //development
    neanderthal = false,
    homoErectus = false,
    homoBodoensis = false,
    advanced1 = false,
    advanced2 = false,
    advanced3 = false,
    advanced4 = false,
    advanced5 = false,
    advanced6 = false,
    educated = false,
    hardened = false,
    stoneAge = false,
    copperAge = false,
    bronzeAge = false,
    silverAge = false,
    ironAge = false,
    modernAge = false,
    mediocrePopulation = false,
    mediumPopulation = false,
    modernPopulation = false,
    largePopulation = false,
    largerPopulation = false,
    hugePopulation = false,
    //conquest
    raider = false,
    threat = false,
    warlord = false,
    general = false,
    cityLeveler = false,
    commander = false,
    nationDestroyer = false,
    empireCollapser = false,
    worldDominator = false,
    //miscellaneous
    religious = false,
    zealot = false,
    extremist = false,
    stronghold = false,
    afkKing = false
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
    nomadicWood = 5,
    nomadicStone = 3.5,
    nomadicFood = 7,
    stationaryWood = 4,
    stationaryStone = 3,
    stationaryFood = 5
]

//Citizens
population = 0;
workerMade = false;
workers = [
    woodWorkers = 0,
    stoneWorkers = 0,
    foodWorkers = 0,
    unemployed = 0
]

//Military
militaryEnabled = false;
soldiers = 0;
ERsoldiers = [
    brawlers = 0,
    clubbers = 0,
    slingers = 0
]

//Research
researchEnabled = false;
researches3 = 0;
researches4 = 0;
researches5 = 0;
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
    Nshelter = false,
    fire = false,
    stationary = false,
    nomadic = false,
    nomadicStart = true,
    agriculture = false,
    advancedTools = false,
    advancedWeapons = false,
    irrigation = false,
    calendars = false,
    rangedWeapons = false,
    longerClubs = false,
    fortificationS = false,
    fortificationsN = false,
    expandedStorage = false,
    Sshelter = false,
]

//Buildings
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

/*----Onload Functions----*/
window.onload = function () {
    /*----Console Version Printing----*/
    setTimeout(console.log.bind(console, 'Running ' + version));
    /*----Appending Civilization Info----*/
    document.getElementById('versionlabel').innerHTML = 'Rising Dawns ' + version;
    setTimeout(() => {
        appendKINGDOMInfo();
        appendVersion();
    }, 100);
    /*----Intervaled Functions----*/
    //storage
    var storageCheckInterval = self.setInterval(function () { storageLabel() }, 1);
    //research
    var researchCheckInterval = self.setInterval(function () { checkResearch(), enableResearch() }, 1);
    //caps
    var capInterval = self.setInterval(function () { rssCapCheck() }, 1);
    var workerCapInterval = self.setInterval(function () { workerCapCheck() }, 1);
    //achievements
    var achievementCheckInterval = self.setInterval(function () { checkAchievements }, 1);
    /*----Confirm Proper Loading----*/
    setTimeout(() => {
        if (setup1 == true && setup2 == true) {
            consoleLog("Game Loaded.");
        } else {
            consoleLog("Something went wrong.");
        }
    }, 100);
}
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = 'You have unsaved changes.';
});

/*----GameLog----*/
//CREDIT CIVCLICKER, SEE ABOVE
function consoleLog(message, type) {
    /*----Console Logging Time----*/
    var infractionTime = '0:00';
    date = new Date();
    if (date.getMinutes() < 10) {
        infractionTime = date.getHours() + ":0" + date.getMinutes();
    } else {
        infractionTime = date.getHours() + ":" + date.getMinutes();
    }
    /*----Special Logs----*/
    if (type == "special") {
        if (document.getElementById('log').innerHTML == message) {
            repeat += 1;
            document.getElementById('entr1').innerHTML = '<td id="time" style = "color: goldenrod;">' + infractionTime + '</td><td id="log" style = "color: goldenrod;">' + message + '</td><td id="amount" style = "color: goldenrod;">(x' + repeat + ')</td>';
        } else {
            repeat = 1
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
            document.getElementById('entr1').innerHTML = '<td id="time" style = "color: goldenrod;">' + infractionTime + '</td><td id="log" style = "color: goldenrod;">' + message + '</td><td id="amount" style = "color: goldenrod;">(x' + repeat + ')</td>';
        }
    } else {
        /*----Regular Logs----*/
        if (document.getElementById('log').innerHTML == message) {
            repeat += 1;
            document.getElementById('entr1').innerHTML = '<td id="time">' + infractionTime + '</td><td id="log">' + message + '</td><td id="amount">(x' + repeat + ')</td>';
        } else {
            repeat = 1
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
            document.getElementById('entr1').innerHTML = '<td id="time">' + infractionTime + '</td><td id="log">' + message + '</td><td id="amount">(x' + repeat + ')</td>';
        }
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
        document.getElementById("achievementsPage").style.display = "none";
        document.getElementById("buildingTitle").className = "selector nborder selected";
        document.getElementById("upgradingTitle").className = "selector border unselected";
        document.getElementById("fortifyingTitle").className = "selector border unselected";
        document.getElementById("wonderTitle").className = "selector border unselected";
        document.getElementById("achievementsTitle").className = "selector border unselected";
    }
    if (pane3 == 'upgrade') {
        document.getElementById("buildingPage").style.display = "none";
        document.getElementById("upgradingPage").style.display = "block";
        document.getElementById("fortifyingPage").style.display = "none";
        document.getElementById("wonderPage").style.display = "none";
        document.getElementById("achievementsPage").style.display = "none";
        document.getElementById("buildingTitle").className = "selector border unselected";
        document.getElementById("upgradingTitle").className = "selector nborder selected";
        document.getElementById("fortifyingTitle").className = "selector border unselected";
        document.getElementById("wonderTitle").className = "selector border unselected";
        document.getElementById("achievementsTitle").className = "selector border unselected";
    }
    if (pane3 == 'fortification') {
        document.getElementById("buildingPage").style.display = "none";
        document.getElementById("upgradingPage").style.display = "none";
        document.getElementById("fortifyingPage").style.display = "block";
        document.getElementById("wonderPage").style.display = "none";
        document.getElementById("achievementsPage").style.display = "none";
        document.getElementById("buildingTitle").className = "selector border unselected";
        document.getElementById("upgradingTitle").className = "selector border unselected";
        document.getElementById("fortifyingTitle").className = "selector nborder selected";
        document.getElementById("wonderTitle").className = "selector border unselected";
        document.getElementById("achievementsTitle").className = "selector border unselected";
    }
    if (pane3 == 'wonders') {
        document.getElementById("buildingPage").style.display = "none";
        document.getElementById("upgradingPage").style.display = "none";
        document.getElementById("fortifyingPage").style.display = "none";
        document.getElementById("wonderPage").style.display = "block";
        document.getElementById("achievementsPage").style.display = "none";
        document.getElementById("buildingTitle").className = "selector border unselected";
        document.getElementById("upgradingTitle").className = "selector border unselected";
        document.getElementById("fortifyingTitle").className = "selector border unselected";
        document.getElementById("wonderTitle").className = "selector nborder selected";
        document.getElementById("achievementsTitle").className = "selector border unselected";
    }
    if (pane3 == 'achievements') {
        document.getElementById("buildingPage").style.display = "none";
        document.getElementById("upgradingPage").style.display = "none";
        document.getElementById("fortifyingPage").style.display = "none";
        document.getElementById("wonderPage").style.display = "none";
        document.getElementById("achievementsPage").style.display = "block";
        document.getElementById("buildingTitle").className = "selector border unselected";
        document.getElementById("upgradingTitle").className = "selector border unselected";
        document.getElementById("fortifyingTitle").className = "selector border unselected";
        document.getElementById("wonderTitle").className = "selector border unselected";
        document.getElementById("achievementsTitle").className = "selector nborder selected";
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
        var OreChance = Math.floor(Math.random() * 30);
        if (OreChance == 3) {
            resources[3] = resources[3] + 1;
            if (workerMade == true) {
                consoleLog("Miner found ore!");
                workerMade = false;
            } else {
                consoleLog("Found ore while mining!");
            }
            updateRSS();
        }
    }
    if (rss == 'hide') {
        var HideChance = Math.floor(Math.random() * 45);
        if (HideChance == 3) {
            resources[4] = resources[4] + 1;
            if (workerMade == true) {
                consoleLog("Hunter found hide!");
                workerMade = false;
            } else {
                consoleLog("Found hide while hunting!");
            }
            updateRSS();
        }
    }
    if (rss == 'roots') {
        var RootChance = Math.floor(Math.random() * 47);
        if (RootChance == 3) {
            resources[5] = resources[5] + 1;
            if (workerMade == true) {
                consoleLog("Lumberjack found roots!");
                workerMade = false;
            } else {
                consoleLog("Found roots while foraging!");
            }
            updateRSS();
        }
    }
}
function increaseCap(kind) {
    if (kind == 'wood') {
        storage[0] = storage[0] + 100;
        refresh();
    }
    if (kind == 'stone') {
        storage[1] = storage[1] + 125;
        refresh();
    }
    if (kind == 'food') {
        storage[2] = storage[2] + 175;
        refresh();
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
function workerCapCheck() {
    if (workers[0] >= storage[8]) {
        workers[0] = storage[8];
        element = document.getElementById("l1");
        element.setAttribute("disabled", true);
        element.setAttribute("title", "Build more lumber huts.");
    } else {
        element = document.getElementById("l1");
        element.removeAttribute("disabled", true);
        element.setAttribute("title", "Recruit Hunters to gather food and hide.");
    }
}

function workerRSS() {
    if (nomadicStart == true || nomadic == true) {
        if (workers[0] >= 1 && resources[0] < storage[0]) {
            increments[0] = workers[0] / nomadicWood;
            resources[0] = resources[0] + increments[0];
            updateRSS();
        }
        if (workers[1] >= 1 && resources[1] < storage[1]) {
            increments[1] = workers[1] / nomadicStone;
            resources[1] = resources[1] + increments[1];
            updateRSS();
        }
        if (workers[2] >= 1 && resources[2] < storage[2]) {
            increments[2] = workers[2] / nomadicFood;
            resources[2] = resources[2] + increments[2];
            updateRSS();
        }
    } else {
        if (workers[0] >= 1 && resources[0] < storage[0]) {
            increments[0] = workers[0] / stationaryWood;
            resources[0] = resources[0] + increments[0];
            updateRSS();
        }
        if (workers[1] >= 1 && resources[1] < storage[1]) {
            increments[1] = workers[1] / stationaryStone;
            resources[1] = resources[1] + increments[1];
            updateRSS();
        }
        if (workers[2] >= 1 && resources[1] < storage[1]) {
            increments[2] = workers[2] / stationaryFood;
            resources[2] = resources[2] + increments[2];
            updateRSS();
        }
    }
}
function workerSPECRSS() {
    if (workers[0] >= 1) {
        AddSpecialResource('roots');
        workerMade = true;
        setTimeout(() => {
            updateRSS();
        }, 100);
    }
    if (workers[1] >= 1) {
        AddSpecialResource('ore');
        workerMade = true;
        setTimeout(() => {
            updateRSS();
        }, 100);
    }
    if (workers[2] >= 1) {
        AddSpecialResource('hide');
        workerMade = true;
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
var peopleCalled = false;
function updatePPL() {
    document.getElementById("HUlabelDiv").innerHTML = "<p id = 'HCount'>Hunters: " + workers[2] + "</p>";
    document.getElementById("PlabelDiv").innerHTML = "<label for='workerRecruit'>Citizens: " + population + "</label>";
    document.getElementById("UNlabelDiv").innerHTML = "<p id = 'UNCount'>Unemployed: " + workers[3] + "</p>";
    document.getElementById("LJlabelDiv").innerHTML = "<p id = 'LJCount'>Lumberjacks: " + workers[0] + "</p>";
    document.getElementById("MlabelDiv").innerHTML = "<p id = 'MCount'>Miners: " + workers[1] + "</p>";
    if (!peopleCalled) {
        console.log("People Refreshed.");
        peopleCalled = true;
    }
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
                updatePPL();
            }
        } else {
            var takenChance = Math.floor(Math.random() * 50000);
            if (takenChance == 21) {
                consoleLog("Lumberjack eaten by wolves.");
                workers[0] = workers[0] - 1;
                updatePPL();
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
    if (workers[1] >= 1) {
        if (advancedTools == false) {
            var takenChance = Math.floor(Math.random() * 1000);
            if (takenChance == 21) {
                consoleLog("Cave collapsed and killed a miner.");
                workers[1] = workers[1] - 1;
            }
        } else {
            var takenChance = Math.floor(Math.random() * 50000);
            if (takenChance == 21) {
                consoleLog("Cave collapsed and killed a miner.");
                workers[1] = workers[1] - 1;
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
    if (earlyAge[2] == true && tiers[3] == false && tiers[6] == false) {
        tiers[0] = true;
        tiers[1] = true;
    }
    if (earlyAge[3] == true && tiers[3] == false && tiers[6] == false) {
        tiers[0] = true;
        tiers[2] = true;
    }
    if (earlyAge[2] == true && tiers[0] == false && tiers[6] == false) {
        tiers[3] = true;
        tiers[4] = true;
    }
    if (earlyAge[3] == true && tiers[0] == false && tiers[6] == false) {
        tiers[3] = true;
        tiers[5] = true;
    }
    if (earlyAge[2] == true && tiers[0] == false && tiers[3] == false) {
        tiers[6] = true;
        tiers[7] = true;
    }
    if (earlyAge[3] == true && tiers[0] == false && tiers[3] == false) {
        tiers[6] = true;
        tiers[8] = true;
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
    if (tiers[0] == true) {
        document.getElementById("fireWrap").style.display = "block";
        document.getElementById("ATWrap").style.display = "block";
        if (tiers[1] == true) {
            document.getElementById("SshelterWrap").style.display = "block";
        }
        if (tiers[2] == true) {
            document.getElementById("NshelterWrap").style.display = "block";
        }
    } else {
        document.getElementById("fireWrap").style.display = "none";
        document.getElementById("ATWrap").style.display = "none";
        document.getElementById("NshelterWrap").style.display = "none";
        document.getElementById("SshelterWrap").style.display = "none";
    }
    if (tiers[3] == true) {
        document.getElementById("longerClubsWrap").style.display = "block";
        if (tiers[4] == true) {
            document.getElementById("AWWrap").style.display = "block";
            document.getElementById("agricultureWrap").style.display = "block";
            document.getElementById("fortificationSWrap").style.display = "block";
        }
        if (tiers[5] == true) {
            document.getElementById("basicAgricultureWrap").style.display = "block";
            document.getElementById("fortificationNWrap").style.display = "block";
        }
    } else {
        document.getElementById("basicAgricultureWrap").style.display = "none";
        document.getElementById("fortificationNWrap").style.display = "none";
        document.getElementById("AWWrap").style.display = "none";
        document.getElementById("agricultureWrap").style.display = "none";
        document.getElementById("fortificationSWrap").style.display = "none";
        document.getElementById("longerClubsWrap").style.display = "none";
    }
    if (tiers[6] == true) {
        document.getElementById("calendarWrap").style.display = "block";
        document.getElementById("rangedWeaponsWrap").style.display = "block";
        document.getElementById("expandedStorageWrap").style.display = "block";
        if (tiers[7] == true) {
            document.getElementById("IRWrap").style.display = "block";
            document.getElementById("ESDescription").style.paddingBottom = "50px";
        }
        if (tiers[8] == true) {
            document.getElementById("NagricultureWrap").style.display = "block";
        }
    } else {
        document.getElementById("calendarWrap").style.display = "none";
        document.getElementById("IRWrap").style.display = "none";
        document.getElementById("rangedWeaponsWrap").style.display = "none";
        document.getElementById("NagricultureWrap").style.display = "none";
        document.getElementById("expandedStorageWrap").style.display = "none";
    }
    if (researches3 >= 3) {
        tiers[3] = true;
        tiers[0] = false;
        tiers[1] = false;
        tiers[2] = false;
    }
    if (earlyAge[2] == true) {
        if (researches4 >= 4) {
            tiers[6] = true;
            tiers[0] = false;
            tiers[1] = false;
            tiers[2] = false;
            tiers[3] = false;
            tiers[4] = false;
            tiers[5] = false;
        }
    }
    if (earlyAge[3] == true) {
        if (researches4 >= 3) {
            tiers[6] = true;
            tiers[0] = false;
            tiers[1] = false;
            tiers[2] = false;
            tiers[3] = false;
            tiers[4] = false;
            tiers[5] = false;
        }
    }
    if (researches5 >= 4) {
        document.getElementById("research-done").style.display = "block";
        document.getElementById("researchWrap").style.display = "none";
        tiers[6] = false;
        tiers[7] = false;
        tiers[8] = false;
        tiers[0] = false;
        tiers[1] = false;
        tiers[2] = false;
        tiers[3] = false;
        tiers[4] = false;
        tiers[5] = false;
    } else {
        document.getElementById("research-done").style.display = "none";
    }
}
function changeState(state) {
    if (state == 'nomadic') {
        if (resources[2] >= 750) {
            earlyAge[3] = true;
            earlyAge[2] = false;
            changeType("nomad");
            resources[2] = resources[2] - 750;
            document.getElementById("stationaryWrap").style.display = "none";
            document.getElementById("nomadicWrap").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (state == 'stationary') {
        if (resources[2] >= 600 && resources[0] >= 250) {
            earlyAge[2] = true;
            earlyAge[3] = false;
            resources[2] = resources[2] - 600;
            resources[0] = resources[0] - 250;
            changeType("settle");
            document.getElementById("stationaryWrap").style.display = "none";
            document.getElementById("nomadicWrap").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
}

function upgradet3(type) {
    if (type == 1) {
        if (resources[0] >= 350 && resources[1] >= 300 && resources[2] >= 500) {
            researches3 += 1;
            resources[0] = resources[0] - 350;
            resources[1] = resources[1] - 300;
            resources[2] = resources[2] - 500;
            earlyAge[1] = true;
            document.getElementById("fireResearch").style.display = "none";
            document.getElementById("fireDescription").style.paddingTop = "25px";
            document.getElementById("fireTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 2) {
        if (resources[3] >= 160 && resources[1] >= 345 && resources[2] >= 750) {
            researches3 += 1;
            resources[2] = resources[2] - 750;
            resources[1] = resources[1] - 345;
            resources[3] = resources[3] - 160;
            earlyAge[6] = true;
            document.getElementById("ATResearch").style.display = "none";
            document.getElementById("ATTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 3) {
        if (resources[0] >= 400 && resources[2] >= 340) {
            researches3 += 1;
            resources[0] = resources[0] - 400;
            resources[2] = resources[2] - 340;
            earlyAge[15] = true;
            document.getElementById("SshelterResearch").style.display = "none";
            document.getElementById("SshelterTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 4) {
        if (resources[0] >= 340 && resources[2] >= 500) {
            researches3 += 1;
            resources[0] = resources[0] - 340;
            resources[2] = resources[2] - 500;
            earlyAge[0] = true;
            document.getElementById("NshelterResearch").style.display = "none";
            document.getElementById("NshelterTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
}
function upgradet4(type) {
    if (type == 1) {
        if (resources[0] >= 320 && resources[1] >= 175 && resources[2] >= 500) {
            researches4 += 1;
            resources[0] = resources[0] - 320;
            resources[1] = resources[1] - 175;
            resources[2] = resources[2] - 500;
            document.getElementById("AWResearch").style.display = "none";
            document.getElementById("AWDescription").style.paddingTop = "25px";
            document.getElementById("AWTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 2) {
        if (resources[3] >= 400 && resources[2] >= 350) {
            researches4 += 1;
            resources[0] = resources[0] - 350;
            resources[3] = resources[3] - 400;
            document.getElementById("LCResearch").style.display = "none";
            document.getElementById("LCTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 3) {
        if (resources[0] >= 100 && resources[1] >= 400 && resources[2] >= 650) {
            researches4 += 1;
            resources[0] = resources[0] - 100;
            resources[1] = resources[1] - 400;
            resources[2] = resources[2] - 650;
            document.getElementById("AGResearch").style.display = "none";
            document.getElementById("AGTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 4) {
        if (resources[0] >= 250 && resources[1] >= 175 && resources[2] >= 400) {
            researches4 += 1;
            resources[0] = resources[0] - 250;
            resources[1] = resources[1] - 175;
            resources[2] = resources[2] - 400;
            document.getElementById("BAGResearch").style.display = "none";
            document.getElementById("BAGTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 5) {
        if (resources[0] >= 750 && resources[1] >= 500 && resources[2] >= 350) {
            researches4 += 1;
            resources[0] = resources[0] - 750;
            resources[1] = resources[1] - 500;
            resources[2] = resources[2] - 350;
            document.getElementById("FSResearch").style.display = "none";
            document.getElementById("FSTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 6) {
        if (resources[0] >= 800 && resources[1] >= 250 && resources[2] >= 350) {
            researches4 += 1;
            resources[0] = resources[0] - 800;
            resources[1] = resources[1] - 250;
            resources[2] = resources[2] - 350;
            document.getElementById("FNResearch").style.display = "none";
            document.getElementById("FNTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
}
function upgradet5(type) {
    if (type == 1) {
        if (resources[0] >= 500 && resources[1] >= 250 && resources[2] >= 390) {
            researches5 += 1;
            resources[0] = resources[0] - 500;
            resources[1] = resources[1] - 250;
            resources[2] = resources[2] - 390;
            document.getElementById("IRResearch").style.display = "none";
            document.getElementById("IRDescription").style.paddingTop = "25px";
            document.getElementById("IRTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 2) {
        if (resources[0] >=  275 && resources[1] >= 300 && resources[2] >= 160) {
            researches5 += 1;
            resources[0] = resources[0] - 275;
            resources[1] = resources[1] - 300;
            resources[2] = resources[2] - 160;
            if(earlyAge[3] == true){
                document.getElementById("CADescription").style.paddingTop = "25px";
            }
            document.getElementById("CAResearch").style.display = "none";
            document.getElementById("CATitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 3) {
        if (resources[0] >= 350 && resources[1] >= 275 && resources[2] >= 500) {
            researches5 += 1;
            resources[0] = resources[0] - 350;
            resources[1] = resources[1] - 275;
            resources[2] = resources[2] - 500;
            document.getElementById("RWResearch").style.display = "none";
            document.getElementById("RWTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 4) {
        if (resources[0] >= 350 && resources[1] >= 250 && resources[2] >= 225) {
            researches5 += 1;
            resources[0] = resources[0] - 350;
            resources[1] = resources[1] - 250;
            resources[2] = resources[2] - 225;
            document.getElementById("ESResearch").style.display = "none";
            document.getElementById("ESTitle").style.display = "none";
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (type == 5) {
        if (resources[0] >= 100 && resources[1] >= 400 && resources[2] >= 650) {
            researches5 += 1;
            resources[0] = resources[0] - 100;
            resources[1] = resources[1] - 400;
            resources[2] = resources[2] - 650;
            document.getElementById("NAGResearch").style.display = "none";
            document.getElementById("NAGTitle").style.display = "none";
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
        } else {
            consoleLog("Not enough resources.");
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
        } else {
            consoleLog("Not enough resources.");
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
        } else {
            consoleLog("Not enough resources.");
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
        } else {
            consoleLog("Not enough resources.");
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
        } else {
            consoleLog("Not enough resources.");
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
        } else {
            consoleLog("Not enough resources.");
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
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (kind == '8') {
        if (resources[0] >= 50 && resources[1] >= 42) {
            type[7] = type[7] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 50;
            resources[1] = resources[1] - 42;
            increaseCap('stone');
            updateBLD();
            updateRSS();
        } else {
            consoleLog("Not enough resources.");
        }
    }
    if (kind == '9') {
        if (resources[0] >= 35 && resources[1] >= 55) {
            type[8] = type[8] + 1;
            buildings = buildings + 1;
            resources[0] = resources[0] - 35;
            resources[1] = resources[1] - 55;
            increaseCap('food');
            updateBLD();
            updateRSS();
        } else {
            consoleLog("Not enough resources.");
        }
    }
}
function enableRE() {
    storage[0] = storage[0] + 500;
    resources[0] = resources[0] + 590;
    resources[4] = resources[4] + 10;
    resources[2] = resources[2] + 750;
    storage[2] = storage[2] + 750;
    resources[1] = resources[1] + 350;
    storage[1] = storage[1] + 350;
    resources[3] = resources[3] + 160;
    storage[3] = storage[3] + 160
    updateRSS();
}

/* Important Tribe Things */
var hours = 0;
var day = 0;
var dayCount = 0;
var season = "Spring";
var year = 1;
function decideSeason() {
    if (hours >= 10) {
        day = day + 1;
        hours = 0;
    } else {
        hours = hours + 1;
    }
    if (day <= 50) {
        season = "Spring";
        dayCount = day;
        appendKINGDOMInfo();
    }
    if (day <= 100 && day > 50) {
        season = "Summer";
        dayCount = day - 50;
        appendKINGDOMInfo();
    }
    if (day <= 150 && day > 100) {
        season = "Fall";
        dayCount = day - 100;
        appendKINGDOMInfo();
    }
    if (day <= 200 && day > 150) {
        season = "Winter";
        dayCount = day - 150;
        appendKINGDOMInfo();
    }
    if (day > 200) {
        year += 1;
        consoleLog("New Year! Year " + year + ".");
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
function checkPop() {
    if (population >= 25) {
        refresh();
    }
    if (peopleCalled == true) {
        population = workers[0] + workers[1] + workers[2];
    }
}
var popCheckInterval = self.setInterval(function () { checkPop() }, 10);
function appendKINGDOMInfo() {
    if (civClass[0] == 1) {
        if (population < 25) {
            kingdomClass[0] = "Tribal Village";
        } else {
            kingdomClass[0] = "Tribal Town";
        }
        kingdomClass[1] = "Chieftain";
        document.getElementById("kingdomWrap").innerHTML = "<h1 class = 'kingdomName'>The <a href = 'https://en.wikipedia.org/wiki/Tribe' target='_blank'>" + kingdomClass[0] + "</a> of " + civDetails[1];
        document.getElementById("kingWrap").innerHTML = "<h3 class = 'kingName'>Ruled by the Mighty <a href = 'https://en.wikipedia.org/wiki/Tribal_chief' target = '_blank'>" + kingdomClass[1] + "</a> " + civDetails[0];
        document.title = "Rising Dawns | " + civDetails[3];
        if (earlyAge[4] == true) {
            if (civDetails[4] == 'Random') {
                civDetails[4] = 'Southeastern Asia';
            }
            document.getElementById("civWrap").innerHTML = "Nomadic " + civDetails[4] + tribe + " Tribe | Day " + dayCount + " of " + season;
        }
    }
    setup1 = true;
}
function appendVersion() {
    document.getElementById("versionLabel").innerHTML = "(" + version + ")";
}

/* Saving */
function refresh() {
    updateBLD();
    updateRSS();
    updatePPL();
    appendVersion();
    storageLabel();
    console.log("Refreshed.");
}
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
    ERsoldier = retrievedData3[4];
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
    refresh();
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
var autoInterval = self.setInterval(function () { Auto() }, 300000);
function Clear() {
    window.localStorage.clear();
    window.location.replace("saveCreator.html");
}

/* Disasters */
/*var stormCalled = false;
var stormOver = true;
var stormChance = Math.floor(Math.random() * 10);
function checkAlert() {
    function alertStorm() {
        if (stormChance == 8) {
            consoleLog("A storm rolls in.");
            stormCalled = true;
            console.log("storm called");
            stormOver = false;
        } else {
            stormChance = Math.floor(Math.random() * 10);
        }
        if (stormCalled == true) {
            startStorm();
            stormCalled = false;
            stormChance = 11;
        }
    }
    if (stormOver == true) {
        alertStorm();
    }
}
var checkAlertInterval = self.setInterval(function () { checkAlert() }, 1000);

function startStorm() {
    // Decides Storm Rating Based on Selected Difficulty
    var rating = undefined;
    if (civDetails[7] == 'easy') {
        rating = Math.floor(Math.random() * 3);
    }
    if (civDetails[7] == 'normal') {
        rating = Math.floor(Math.random() * 5);
    }
    if (civDetails[7] == 'hard') {
        rating = Math.floor(Math.random() * 7);
    }
    if (civDetails[7] == 'harder') {
        rating = Math.floor(Math.random() * 10);
    }
    if (civDetails[7] == 'nightmare') {
        var x = undefined;
        function decideX() {
            var maybeX = Math.floor(Math.random() * 10);
            if (maybeX >= 6) {
                x = maybeX;
            } else {
                decideX();
            }
        }
        decideX();
        rating = Math.floor(Math.random() * x);
    }
    var destroyed = undefined;
    function decideBuildings() {
        if (rating == 0) {
            destroyed = Math.floor(Math.random() * 1);
        }
        if (rating == 1) {
            destroyed = Math.floor(Math.random() * 1);
        }
        if (rating == 2) {
            destroyed = Math.floor(Math.random() * 3);
        }
        if (rating == 3) {
            destroyed = Math.floor(Math.random() * 3);
        }
        if (rating == 4) {
            destroyed = Math.floor(Math.random() * 5);
        }
        if (rating == 5) {
            destroyed = Math.floor(Math.random() * 5);
        }
        if (rating == 6) {
            destroyed = Math.floor(Math.random() * 8);
        }
        if (rating == 7) {
            destroyed = Math.floor(Math.random() * 10);
        }
        if (rating == 8) {
            destroyed = Math.floor(Math.random() * 10);
        }
        if (rating == 9) {
            destroyed = Math.floor(Math.random() * 12);
        }
        if (rating == 10) {
            destroyed = Math.floor(Math.random() * 15);
        }
    }
    decideBuildings();
    var buildingsDestroyed = destroyed;
    function destroyBuildings() {
        if (typeof buildingsDestroyed !== 'undefined') {
            //Holding-cell variable for buildings waiting for demolition
            var unsignedBrokens = buildingsDestroyed;
            function assignBrokens() {
                if(buildings >= 1) {
                    if (unsignedBrokens >= 1) {
                        var pieces = 0;
                        var kind = Math.floor(Math.random() * 10);
                        if (kind == 1 && type[0] >= 1) {
                            type[0] = type[0] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 2 && type[1] >= 1) {
                            type[1] = type[1] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 3 && type[2] >= 1) {
                            type[2] = type[2] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 4 && type[3] >= 1) {
                            type[3] = type[3] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 5 && type[4] >= 1) {
                            type[4] = type[4] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 6 && type[5] >= 1) {
                            type[5] = type[5] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 7 && type[6] >= 1) {
                            type[6] = type[6] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 8 && type[7] >= 1) {
                            type[7] = type[7] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 9 && type[8] >= 1) {
                            type[8] = type[8] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if (kind == 10 && type[9] >= 1) {
                            type[9] = type[9] - 1;
                            refresh();
                            console.log("enough");
                            pieces = pieces + 1;
                        } else {
                            console.log("none");
                        }
                        if(pieces >= 1) {
                            unsignedBrokens = unsignedBrokens - 1;
                            pieces = 0;
                            console.log("1 building destroyed");
                        } else {
                            assignBrokens();
                        }
                    }
                } else {
                    console.log("no buildings to destroy");
                }
            }
            assignBrokens();
        }
    }
    destroyBuildings();
    stormOver = true;
    // Decides the People Killed by the Storm Based on Difficulty + Chance
}*/

/*----Achievements----*/
function giveAchievement(kind) {
    if (kind == "1") {
        consoleLog("Achievement Unlocked: TST is That You?", 'special');
        achievements[0] = true;
    }
}
function checkAchievements() {
    //TST
    var TSTtrigger = false;
    if (TSTtrigger == false) {
        if (resources[2] >= 1000000) {
            TSTtrigger = true;
            giveAchievement("1");
            // document.getElementById("").className = "";
        }
    }
}
function enableAchievement(kind) {
    if (kind == 1) {
        resources[2] = resources[2] + 1000000;
        storage[2] = storage[2] + 1000000;
        updateRSS();
    }
}