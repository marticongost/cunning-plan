const attackTypes = [
    {
        id: "generic",
        title: "Atac genèric",
        softAttack: 1,
        hardAttack: 1,
    },
    {
        id: "usa_mechanized_infantry_squad",
        title: "Infanteria mecanitzada americana",
        softAttack: 2,
        supression: 1,
        ranges: [{ max: 12 }, { max: 24, penalty: 1 }, { max: 30, penalty: 2 }],
        special: [
            {
                title: "M1 Garand",
                effect: "cancel",
                target: ["movement"],
            },
            {
                title: "M3 Grease Gun",
                effect: "treatAs",
                replacement: "critical",
                requires: {
                    range: [0],
                },
            },
            {
                title: "BAR",
                effect: "treatAs",
                replacement: "hit",
                requires: {
                    range: [1],
                },
            },
        ],
    },
    {
        id: "panzergrenadier_squad",
        title: "Panzergrenadiers",
        softAttack: 2,
        ranges: [{ max: 15 }, { max: 30, penalty: 1 }, { max: 45, penalty: 2 }],
        special: [
            {
                title: "Kar98k",
                effect: "cancel",
                target: ["range"],
                requires: {
                    movement: [0],
                },
            },
            {
                title: "MP40",
                effect: "treatAs",
                replacement: "critical",
                requires: {
                    range: [0],
                },
            },
        ],
    },
    {
        id: "german_mg",
        title: "Panzergrenadiers, metralladora",
        softAttack: 1,
        supression: 3,
        ranges: [{ max: 15 }, { max: 30, penalty: 1 }, { max: 45, penalty: 2 }],
        special: [
            {
                title: "MG34 / MG42",
                effect: "treatAs",
                replacement: "critical",
                requires: {
                    cover: [0],
                },
            },
        ],
    },
    {
        id: "flamethrower",
        title: "Llançaflames",
        softAttack: 2,
        supression: 1,
        ranges: [{ max: 12 }],
        special: [
            {
                title: "Llançaflames",
                effect: "cancel",
                target: ["cover", "veterancy"],
                limit: 2,
            },
        ],
    },
];

export default attackTypes;
