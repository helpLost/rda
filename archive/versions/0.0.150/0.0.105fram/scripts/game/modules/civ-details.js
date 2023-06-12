export let storedResources = {
    food: 0,
    wood: 0,
    stone: 0,
    hide: 0,
    roots: 0,
    herbs: 0,
    ore: 0
}
export let storage = {
    resources: {
        foodStorage: 250,
        woodStorage: 100,
        stoneStorage: 150,
        hideStorage: 60,
        rootsStorage: 75,
        oreStorage: 50,
    },
    people: {
        populationCap: 5,
        lumberCap: 20,
        minerCap: 20,
        hunterCap: 10
    }
}
export let increments = {
    userWoodAdd: 1,
    userStoneAdd: 1,
    userFoodAdd: 1,
    workerWoodAdd: 0.5,
    workerStoneAdd: 0.5,
    workerFoodAdd: 0.25
}
export let citizens = {
    people: {
        totalPopulation: 0,
        unemployed: 0,
        foodWorkers: 0,
        woodWorkers: 0,
        stoneWorkers: 0
    },
    military: {
        soldiers: 0,
        currentUnits: {
            type_1: undefined,
            type_2: undefined,
            type_3: undefined,
            type_4: undefined,
            type_5: undefined,
            unit_1_count: 0,
            unit_2_count: 0,
            unit_3_count: 0,
            unit_4_count: 0,
            unit_5_count: 0,
        }
    }
}
export let buildings = {
    explanations: {
        tribal_era: {
            Sleeping_Mat: "A small mat for your civilians to rest on. They can hold one person each.",
            A_Frame: "A suprisingly strong primitive stucture that your citizens can sleep and live in. Each A-Frame can hold one family (Three people).",
            Hut: "A primitive structure that keeps your citizens warm and dry, in which they can sleep and live in. Each hut can hold three families (Nine people).",
            Strengthened_Hut: "A stronger version of the hut that keeps your citizens warmer and safer than before.",
            Training_Area: "A primitive 'building' (really just a fortified field) that allows you to give your civilians a little practice with weapons, both improving overall safety and allowing you to recruit primitive warriors. More training areas mean more soldiers.",
            Gathering_Place: "A small enclosured field that allows the greatest minds in your tribe to research new concepts and strategies.",
            Hunters_Quarters: "A small hut reserved specifically for your food gatherers, allowing you to recruit more.",
            Lumberjacks_Hut: "A hut with a small wood storage space that allows you to recruit more wood gatherers for your tribe.",
            Miners_Cabin: "A little wooden cabin that your mineral gatherers can socialize and rest in. The extra space lets you recruit more miners.",
            Town_Center: "A central, public town building that improves your tribe as a whole, allowing more land to be conquered and more soldiers to be recruited.",
            Food_House: "A small structure that allows you to store more food for longer.",
            Wood_Stockpile: "A small plot of land that your citizens will use to store more wood.",
            Stone_Shed: "A small wooden shed that allows your civilians to store more stone."
        }
    },
    numbers: {
        tribal_era: {
            Sleeping_Mats: 0,
            A5Frames: 0,
            Huts: 0,
            Strengthened_Huts: 0,
            Training_Areas: 0,
            Gathering_Places: 0,
            Hunters_Quarters: 0,
            Lumberjacks_Huts: 0,
            Miners_Cabins: 0,
            Town_Centers: 0,
            Food_Houses: 0,
            Wood_Stockpiles: 0,
            Stone_Sheds: 0
        }
    }
}
export let cities = {}