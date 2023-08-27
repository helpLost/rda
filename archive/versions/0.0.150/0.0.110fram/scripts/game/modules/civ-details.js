export let storedResources = {
    food: 0,
    wood: 0,
    stone: 0,
    hide: 0,
    roots: 0,
    ore: 0,
    herbs: 0
}
export let storage = {
    resources: {
        foodStorage: 250,
        woodStorage: 100,
        stoneStorage: 150,
        hideStorage: 60,
        rootsStorage: 75,
        oreStorage: 50,
        herbStorage: 60
    },
    people: {
        populationCap: 15,
        unemployedCap: 10,
        hunterCap: 6,
        lumberCap: 10,
        minerCap: 5,
        soldierCap: 0
    },
    city: {
        landCap: 10000
    }
}
export let increments = {
    userFoodAdd: 1,
    userWoodAdd: 1,
    userStoneAdd: 1,
    workerFoodAdd: 0.25,
    workerWoodAdd: 0.5,
    workerStoneAdd: 0.5
}
export let citizens = {
    people: {
        totalPopulation: 0,
        unemployed: 0,
        hunter: 0,
        lumberjack: 0,
        miner: 0
    },
    costs: {
        // Base Costs (these will increase or decrease with new research / unlocks)
        unemployed: { Food: 0.75, Wood: 0, Stone: 0 },
        hunter: { Food: 0.5, Wood: 0.1, Stone: 0 },
        lumberjack: { Food: 0.3, Wood: 0.2, Stone: 0 },
        miner: { Food: 0.5, Wood: 0.2, Stone: 0.15 },
    },
    military: {
        soldiers: 0,
        currentUnits: {
            unit_1: undefined,
            unit_2: undefined,
            unit_3: undefined,
            unit_4: undefined,
            unit_5: undefined,
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
            Town_Center: "A central, public town building that improves your tribe as a whole, allowing more land to be annexed for your city and more soldiers to be effectively governed.",
            Food_House: "A small structure that allows you to store more food for longer.",
            Wood_Stockpile: "A small plot of land that your citizens will use to store more wood.",
            Stone_Shed: "A small wooden shed that allows your civilians to store more stone."
        }
    },
    numbers: {
        tribal_era: {
            Sleeping_Mats: 0,
            A_Frames: 0,
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
    },
    caps: {
        tribal_era: {
            Sleeping_Mats: undefined,
            A_Frames: undefined,
            Huts: undefined,
            Strengthened_Huts: undefined,
            Training_Areas: 15,
            Gathering_Places: 2,
            Hunters_Quarters: undefined,
            Lumberjacks_Huts: undefined,
            Miners_Cabins: undefined,
            Town_Centers: 1,
            Food_Houses: undefined,
            Wood_Stockpiles: undefined,
            Stone_Sheds: undefined
        }
    },
    costs: {
        tribal_era: {
            // Base Costs (these will go up or down with new research)
            Sleeping_Mat: { Food: 20, Wood: 50, Stone: 20 },
            A_Frame: { Food: 50, Wood: 130, Stone: 50 },
            Hut: { Food: 75, Wood: 312, Stone: 120 },
            Strengthened_Hut: { Food: 150, Wood: 510, Stone: 225 },
            Training_Area: { Food: 105, Wood: 500, Stone: 102 },
            Gathering_Place: { Food: 1000, Wood: 2500, Stone: 1500 },
            Hunters_Quarters: { Food: 250, Wood: 315, Stone: 165 },
            Lumberjacks_Hut: { Food: 20, Wood: 205, Stone: 170 },
            Miners_Cabin: { Food: 0, Wood: 105, Stone: 100 },
            Town_Center: { Food: 1050, Wood: 3500, Stone: 1000 },
            Food_House: { Food: 75, Wood: 70, Stone: 100 },
            Wood_Stockpile: { Food: 50, Wood: 225, Stone: 75 },
            Stone_Shed: { Food: 75, Wood: 200, Stone: 150 }
        }
    },
    bonuses: {
        tribal_era: {
            numbers: {
                // Base Increases (these will go up with new research or down with new government types)
                Sleeping_Mat: { populationCap: 1 },
                A_Frame: { populationCap: 3 },
                Hut: { populationCap: 9 },
                Strengthened_Hut: { none: 'n/a' },
                Training_Area: { soldierCap: 25 },
                Gathering_Place: { none: 'n/a' },
                Hunters_Quarters: { hunterCap: 5, foodStorage: 5 },
                Lumberjacks_Hut: { lumberCap: 7, woodStorage: 2 },
                Miners_Cabin: { minerCap: 7, stoneStorage: 8 },
                Town_Center: { landCap: 5000, soldierCap: 50, foodStorage: 250 },
                Food_House: { foodStorage: 150 },
                Wood_Stockpile: { woodStorage: 200 },
                Stone_Shed: { stoneStorage: 50 }
            },
            stats: {
                Sleeping_Mat: { organization: -0.05, happiness: 0.05, health: 0.08 },
                A_Frame: { environmentalBeauty: -0.15, happiness: 0.02, health: 0.095, scientificAdvancement: 0.001 },
                Hut: { environmentalBeauty: -0.1, organization: 0.05, happiness: 0.025, health: 0.02, scientificAdvancement: 0.0015 },
                Strengthened_Hut: { environmentalBeauty: -0.2, organization: 0.08, health: 0.035, scientificAdvancement: 0.002, crime: -0.05 },
                Training_Area: { environmentalBeauty: -0.15, organization: 0.085, crime: -0.05, health: 0.025, scientificAdvancement: 0.0025, education: 0.0025, militaryMight: 0.05, defensiveness: -0.025 },
                Gathering_Place: { education: 0.5, health: 0.075, organization: 0.1, intelligence: 0.5, environmentalConserverativeness: 0.3, scientificAdvancement: 0.25, religiousness: 0.05 },
                Hunters_Quarters: { organization: 0.05, happiness: 0.005, environmentalConserverativeness: -0.02 },
                Lumberjacks_Hut: { organization: 0.05, happiness: 0.005, environmentalConserverativeness: -0.05 },
                Miners_Cabin: { organization: 0.025, happiness: 0.005, environmentalConserverativeness: -0.01 },
                Town_Center: { education: 0.25, health: 0.2, organization: 0.5, intelligence: 0.25, environmentalConserverativeness: 0.35, scientificAdvancement: 0.1, religiousness: 0.025, beauty: 0.15 },
                Food_House: { organization: 0.025, scientificAdvancement: 0.005 },
                Wood_Stockpile: { organization: 0.025, scientificAdvancement: 0.0055 },
                Stone_Shed: { organization: 0.025, scientificAdvancement: 0.0055 }
            }
        }
    }
}
export let stats = {
    // these will be the actual CIV stats, like heating and danger and shit like that
}
export let cities = {
    names: {},
    info: {}
}