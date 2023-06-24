import * as hubLogic from "../logic-hub.js";
import * as civData from "./civ-details.js";
import * as gameData from "./game-details.js";
import * as jsonData from "./json-data-handler.js";
//- General Utilities -//
// Made this function a little bit better (and added some minimal documentation) -Specter
export function switchScreen(id, group_id, page_group, type) {
    // gets the element group's children so we can reset their bottom borders
    let group = document.getElementById(group_id).children;
    let pageGroup = document.getElementById(page_group).children;

    // runs through the tab elements and unselected them
    for (let i = 0; i < group.length; i++) {
        if (group[i].id != id) {
            group[i].classList = "topTabOption notcurrent";
        }
        if (pageGroup[i].id != id + "Tab") {
            if (type != 0) {
                pageGroup[i].classList = "mainPage unselected";
            } else {
                pageGroup[i].classList = "secondaryPage unselected";
            }
        }
    }
    // selects the tab we want
    document.getElementById(id).classList = "topTabOption current";
    if (type != 0) {
        document.getElementById(id + "Tab").classList = "mainPage selected";
    } else {
        document.getElementById(id + "Tab").classList = "secondaryPage selected";
    }
}
export function applyLabelChanges(id, change, resource, group) {
    document.getElementById(id).innerHTML = (resource == 'Unemployed' ? resource + " Workers" : resource == 'Hunter' ? resource + 's' : resource == 'Lumberjack' ? 'Wood Collectors' : resource == 'Miner' ? 'Primitive ' + resource : resource) + ": " + change;
}
export function explanation(dialogue_id, content, x, y) {
    // why's the dialogue element spelled like that D:
    let dialogue = document.createElement("dialog");
    dialogue.setAttribute("id", dialogue_id);
    dialogue.setAttribute("open", true);

    dialogue.setAttribute("style", "position: absolute; top:" + y + "px; left:" + x + "px; z-index: 20; border: 1px solid lightgrey; border-radius: 5px; padding: 5px");
    dialogue.innerText = content;

    document.querySelector('body').append(dialogue);
}
export function explanationDelete(dialogue_id) {
    document.querySelector('body').removeChild(document.getElementById(dialogue_id));
}
export function triggerInterval(rss, collector, resource_label, interval) {
    var interval_variable = self.setInterval(function () { hubLogic.workerGather(rss, collector, resource_label) }, interval);
}
export function makeDateReadable(type) {
    let newDate = new Date();
    let time = ((newDate.getHours() > 12) ? newDate.getHours() - 12 + type + ((newDate.getMinutes() < 10) ? "0" : "") + newDate.getMinutes() + "PM" + type : newDate.getHours() + type + ((newDate.getMinutes() < 10) ? "0" : "") + newDate.getMinutes() + "AM" + type);
    return time;
}
export function checkResources(group, element, era, item, spectrum) {
    let groupObj = Object.values(civData[group][element][era][item]);
    for (let i = 0; i < spectrum; i++) {
        if (Object.values(civData.storedResources)[i] <= groupObj[i]) {
            return false;
        }
    }
    return true;
}
export function applyResources() {
    applyLabelChanges('foodCount', civData.storedResources.food, "Food", 'rss');
    applyLabelChanges('woodCount', civData.storedResources.wood, "Wood", 'rss');
    applyLabelChanges('stoneCount', civData.storedResources.stone, "Stone", 'rss');
    applyLabelChanges('hideCount', civData.storedResources.hide, "Hide", 'rss');
    applyLabelChanges('rootsCount', civData.storedResources.roots, "Roots", 'rss');
    applyLabelChanges('oreCount', civData.storedResources.ore, "Ore", 'rss');
    applyLabelChanges('herbsCount', civData.storedResources.herbs, "Herbs", 'rss');
}
export function shortenNumber(input) {
    // shrink this
    let charArray = input.toString().split("");
    if(charArray.length < 5) {
        return input;
    } else if (charArray.length < 7) {
        if(charArray.length == 5) {
            return input.toString().slice(0, 2) + "k";
        } else if (charArray.length == 6) {
            return input.toString().slice(0, 3) + "k";
        }
    } else if (charArray.length < 10) {
        if(charArray.length == 7) {
            return input.toString().slice(0, 1) + "m";
        } else if (charArray.length == 8) {
            return input.toString().slice(0, 2) + "m";
        } else if (charArray.length == 9) {
            return input.toString().slice(0, 3) + "m";
        }
    } else if (charArray.length < 13) {
        if(charArray.length == 10) {
            return input.toString().slice(0, 1) + "b";
        } else if (charArray.length == 11) {
            return input.toString().slice(0, 2) + "b";
        } else if (charArray.length == 12) {
            return input.toString().slice(0, 3) + "b";
        }
    } else {
        return input;
    }
}
//- Specific Utilites -//
export function saveBrowser() {
    let data = [
        JSON.stringify(civData),
        JSON.stringify(gameData),
        JSON.stringify(jsonData)
    ]

    localStorage.setItem("data", data);
}
export function saveFile() {
    let data = [
        JSON.stringify(civData),
        JSON.stringify(gameData),
        JSON.stringify(jsonData)
    ]

    const file = new Blob(data, { type: 'json/application' });

    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('id', 'fileDownloadHref');
    downloadLink.setAttribute('href', URL.createObjectURL(file));
    downloadLink.setAttribute('download', 'saveFile' + makeDateReadable('') + '.rising');

    downloadLink.click();
}
export function loadBrowser() { }
export function loadFile() { }