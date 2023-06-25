//----------------------------------------------//
//---              Rising Dawns              ---//
//---    This file is the gametime clock.    ---//
//----------------------------------------------//
//---              Adrian Lost               ---//
//----------------------------------------------//
import * as hubLogic from "../logic-hub.js";

export let time = {
    current: {
        days: 1,
        months: 1,
        years: 4300,
        appellation: 'BCE'
    },
    max: {
        days: [
            31,
            { FLeap: 28, TLeap: 29 },
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ],
        months: 12,
        years: 0,
    },
    special: {
        years: {
            increment: 4
        }
    }
}

function clockCommunicator(input) {
    hubLogic.clockLabel(input);
}

function dayAppellation(input) {
    let string = input.toString();
    if (string.length != 1 && string.charAt(0) != '1') {
        string = string.substring(1);
        var newDay = string == '1' ? input + 'st' : string == '2' ? input + 'nd' : string == '3' ? input + 'rd' : input + 'th';
    } else if (string.length != 1 && string.charAt(0) == '1') {
        var newDay = input + 'th';
    } else {
        var newDay = string == '1' ? input + 'st' : string == '2' ? input + 'nd' : string == '3' ? input + 'rd' : input + 'th';
    }
    return newDay;
}

function convertMonth(input) {
    let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let currentMonth = months[input - 1];
    return currentMonth;
}

export function clockInit() {
    time.current.days = 1;
    time.current.months = 1;
    time.current.years = 4300;
    time.current.appellation = 'BCE';

    clockCommunicator(convertMonth(time.current.months) + " " + dayAppellation(time.current.days) + ", " + time.current.years + " " + time.current.appellation);

    let clockInterval = self.setInterval(function () { clockHub() }, 2000);
}

function clockHub() {
    if (time.current.months == 2) {
        let leapYear = Number.isInteger(time.current.years / 4);
        if (time.current.days < (leapYear == true ? time.max.days[1].TLeap : time.max.days[1].FLeap)) {
            time.current.days++;
        } else if (time.current.days >= (leapYear == true ? time.max.days[1].TLeap : time.max.days[1].FLeap) && time.current.months < time.max.months) {
            time.current.days = 1;
            time.current.months++;
        }
    } else {
        if (time.current.days < time.max.days[time.current.months - 1]) {
            time.current.days++;
        } else if (time.current.days >= time.max.days[time.current.months - 1] && time.current.months < time.max.months) {
            time.current.days = 1;
            time.current.months++;
        }
    }
    if(time.current.months >= time.max.months) {
        time.current.months = 1;
        if(time.current.appellation == 'BCE') {
            time.current.years--;
        } else {
            time.current.years++;
        }
    }
    if(time.current.years == 0) {
        time.current.appellation = 'CE';
    }

    clockCommunicator(convertMonth(time.current.months) + " " + dayAppellation(time.current.days) + ", " + time.current.years + " " + time.current.appellation);
}