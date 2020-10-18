import { ReactComponent as CriticalIcon } from './svg/dice/critical.svg';
import { ReactComponent as SupressionIcon } from './svg/dice/supression.svg';
import { ReactComponent as MovementIcon } from './svg/dice/movement.svg';
import { ReactComponent as RangeIcon } from './svg/dice/range.svg';
import { ReactComponent as CoverIcon } from './svg/dice/cover.svg';
import { ReactComponent as VisibilityIcon } from './svg/dice/visibility.svg';
import { ReactComponent as ArmorIcon } from './svg/dice/armor.svg';
import { ReactComponent as ShockIcon } from './svg/dice/shock.svg';
import { ReactComponent as DisorderedIcon } from './svg/dice/disordered.svg';
import { ReactComponent as VeterancyIcon } from './svg/dice/veterancy.svg';
import { ReactComponent as HitIcon } from './svg/dice/hit.svg';
import { ReactComponent as SpecialIcon } from './svg/dice/special.svg';

const diceTypes = {
    critical: {
        title: 'Atac',
        shortcut: 'A',
        icon: CriticalIcon,
        faces: [
            {
                id: 'critical',
                icon: CriticalIcon,
                number: 2
            },
            {
                id: 'hit',
                number: 1,
                icon: HitIcon
            },
            {
                id: 'special',
                icon: SpecialIcon,
                number: 1
            }
        ]
    },
    supression: {
        title: 'Supressió',
        shortcut: 'S',
        icon: SupressionIcon,
        faces: [
            {
                id: 'supression',
                icon: SupressionIcon,
                number: 1
            },
            {
                id: 'hit',
                icon: HitIcon,
                number: 2
            },
            {
                id: 'special',
                icon: SpecialIcon,
                number: 1
            }
        ]
    },
    movement: {
        title: 'Moviment',
        shortcut: 'M',
        icon: MovementIcon,
        faces: [
            {
                id: 'movement',
                icon: MovementIcon,
                number: 3
            }
        ]
    },
    range: {
        title: 'Distància',
        shortcut: 'D',
        icon: RangeIcon,
        faces: [
            {
                id: 'range',
                icon: RangeIcon,
                number: 3
            }
        ]
    },
    cover: {
        title: 'Cobertura',
        shortcut: 'C',
        icon: CoverIcon,
        faces: [
            {
                id: 'cover',
                icon: CoverIcon,
                number: 3
            }
        ]
    },
    visibility: {
        title: 'Visibilitat',
        shortcut: 'V',
        icon: VisibilityIcon,
        faces: [
            {
                id: 'visibility',
                icon: VisibilityIcon,
                number: 3
            }
        ]
    },
    armor: {
        title: 'Blindatge',
        shortcut: 'B',
        icon: ArmorIcon,
        faces: [
            {
                id: 'armor',
                icon: ArmorIcon,
                number: 6
            }
        ]
    },
    shock: {
        title: 'Xoc',
        shortcut: 'X',
        icon: ShockIcon,
        faces: [
            {
                id: 'shock',
                icon: ShockIcon,
                number: 2
            },
            {
                id: 'disordered',
                icon: DisorderedIcon,
                number: 2
            }
        ]
    },
    veterancy: {
        title: 'Veterania',
        shortcut: 'V',
        icon: VeterancyIcon,
        faces: [
            {
                id: 'veterancy',
                icon: VeterancyIcon,
                number: 2
            }
        ]
    }
};

const diceResults = {}

for (let id in diceTypes) {
    diceTypes[id].id = id;
    for (let face of diceTypes[id].faces) {
        diceResults[face.id] = face;
    }
}

export { diceTypes, diceResults };
