import * as civData from "./civ-details.js";
import * as utilities from "./utilities.js";

export function xe_54b21() {
    civData.storedResources.food += 50000;
    civData.storedResources.wood += 50000;
    civData.storedResources.stone += 50000;

    civData.storedResources.hide += 50000;
    civData.storedResources.roots += 50000;
    civData.storedResources.ore += 50000;

    utilities.applyLabelChanges('foodCount', civData.storedResources.food, "Food", 'rss');
    utilities.applyLabelChanges('woodCount', civData.storedResources.wood, "Wood", 'rss');
    utilities.applyLabelChanges('stoneCount', civData.storedResources.stone, "Stone", 'rss');

    utilities.applyLabelChanges('hideCount', civData.storedResources.hide, "Hide", 'rss');
    utilities.applyLabelChanges('rootsCount', civData.storedResources.roots, "Roots", 'rss');
    utilities.applyLabelChanges('oreCount', civData.storedResources.ore, "Ore", 'rss');
}