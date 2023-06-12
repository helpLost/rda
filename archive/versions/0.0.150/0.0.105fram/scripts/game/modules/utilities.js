// Made this function a little bit better (and I added some minimal documentation) -Specter
export function switchScreen(id, group_id, page_group, type) {
    // gets the element group's children so we can reset their bottom borders
    let group = document.getElementById(group_id).children;
    let pageGroup = document.getElementById(page_group).children;

    // runs through the tab elements and unselected them
    for(let i = 0; i < group.length; i++) {
        if(group[i].id != id) {
            group[i].classList = "topTabOption notcurrent";
        }
        if(pageGroup[i].id != id + "Tab") {
            if(type != 0) {
                pageGroup[i].classList = "mainPage unselected";
            } else {
                pageGroup[i].classList = "secondaryPage unselected";
            }
        }
    }
    // selects the tab we want
    document.getElementById(id).classList = "topTabOption current";
    if(type != 0) {
        document.getElementById(id + "Tab").classList = "mainPage selected";
    } else {
        document.getElementById(id + "Tab").classList = "secondaryPage selected";
    }
}