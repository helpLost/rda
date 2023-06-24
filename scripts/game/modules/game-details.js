// This is all archaic code from before the revamp, ignore the flaws
const urlParams = new URLSearchParams(window.location.search);
export let civDetails = [
    urlParams.get('king'),
    urlParams.get('kingdom'),
    urlParams.get('god'),
    urlParams.get('save'),
    urlParams.get('region'),
    urlParams.get('autosave'),
    urlParams.get('achievement'),
    urlParams.get('difficulty')
]
export let civClass = [
    // kingdom types (early to futuristic, 0 means off, 1 means on)
    1,
    0,
    0,
    0,
    0,
]
export let appellations = [
    "the Great",
    "Tribal Nation"
]

export const version = "0.0.125s";
export let storedVersion = undefined;
if(storedVersion == undefined) {
    storedVersion = version
}