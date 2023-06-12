export const version = "0.0.110fram";
export let storedVersion = version;

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