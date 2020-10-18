
const attackTypes = [
    {
        id: 'generic',
        title: 'Atac genèric',
        softAttack: 1,
        hardAttack: 1
    },
    {
        id: 'usa_mechanized_infantry_squad',
        title: (
            'Infanteria mecanitzada americana '
            + '(M1 Garand, M3 Grease Gun, BAR)'
        ),
        softAttack: 2,
        supression: 1,
        ranges: [
            {max: 12},
            {max: 24, penalty: 1},
            {max: 30, penalty: 2}
        ],
        special: [
            {
                effect: 'cancel',
                target: ['movement']
            },
            {
                effect: 'treatAs',
                replacement: 'critical',
                requires: {
                    range: [0]
                }
            },
            {
                effect: 'treatAs',
                replacement: 'hit',
                requires: {
                    range: [1]
                }
            }
        ]
    },
    {
        id: 'panzergrenadier_squad',
        title: 'Panzergrenadiers: Kar98k, MP40',
        softAttack: 2,
        ranges: [
            {max: 15},
            {max: 30, penalty: 1},
            {max: 45, penalty: 2}
        ],
        special: [
            {
                effect: 'cancel',
                target: ['range'],
                requires: {
                    movement: [0]
                }
            },
            {
                effect: 'treatAs',
                replacement: 'critical',
                requires: {
                    range: [0]
                }
            }
        ]
    },
    {
        id: 'german_mg',
        title: 'Panzergrenadiers: MG 34 / MG 42',
        softAttack: 1,
        supression: 3,
        ranges: [
            {max: 15},
            {max: 30, penalty: 1},
            {max: 45, penalty: 2}
        ],
        special: [
            {
                effect: 'treatAs',
                replacement: 'critical',
                requires: {
                    cover: [0]
                }
            }
        ]
    },
    {
        id: 'flamethrower',
        title: 'Llançaflames',
        softAttack: 2,
        supression: 1,
        ranges: [
            {max: 12}
        ],
        special: [
            {
                cancel: {type: ['cover', 'veterancy'], max: 2}
            }
        ]
    }
];

export default attackTypes;
