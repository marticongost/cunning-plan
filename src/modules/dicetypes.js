import { diceFaces } from "./dicefaces";

const diceTypes = {
    critical: {
        title: "Atac",
        shortcut: "A",
        icon: diceFaces.critical.icon,
        faces: [
            { ...diceFaces.critical, number: 1 },
            { ...diceFaces.hit, number: 1 },
            { ...diceFaces.supression, number: 1 },
            { ...diceFaces.special, number: 1 },
        ],
    },
    supression: {
        title: "Supressió",
        shortcut: "S",
        icon: diceFaces.supression.icon,
        faces: [
            { ...diceFaces.supression, number: 3 },
            { ...diceFaces.hit, number: 1 },
            { ...diceFaces.special, number: 1 },
        ],
    },
    movement: {
        title: "Moviment",
        shortcut: "M",
        icon: diceFaces.movement.icon,
        faces: [{ ...diceFaces.movement, number: 3 }],
    },
    range: {
        title: "Distància",
        shortcut: "D",
        icon: diceFaces.range.icon,
        faces: [{ ...diceFaces.range, number: 3 }],
    },
    cover: {
        title: "Cobertura",
        shortcut: "C",
        icon: diceFaces.cover.icon,
        faces: [{ ...diceFaces.cover, number: 3 }],
    },
    visibility: {
        title: "Visibilitat",
        shortcut: "V",
        icon: diceFaces.visibility.icon,
        faces: [{ ...diceFaces.visibility, number: 3 }],
    },
    shock: {
        title: "Xoc",
        shortcut: "X",
        icon: diceFaces.shock.icon,
        faces: [
            { ...diceFaces.shock, number: 2 },
            { ...diceFaces.disordered, number: 2 },
        ],
    },
    veterancy: {
        title: "Veterania",
        shortcut: "V",
        icon: diceFaces.veterancy.icon,
        faces: [{ ...diceFaces.veterancy, number: 2 }],
    },
    initiative: {
        title: "Iniciativa",
        shortcut: "I",
        icon: diceFaces.team.icon,
        faces: [
            { ...diceFaces.team, number: 2 },
            { ...diceFaces.unit, number: 1 },
            { ...diceFaces.willpower, number: 1 },
        ],
    },
    manouver: {
        title: "Maniobra",
        shortcut: "M",
        icon: diceFaces.unit.icon,
        faces: [
            { ...diceFaces.unit, number: 2 },
            { ...diceFaces.team, number: 1 },
            { ...diceFaces.willpower, number: 1 },
        ],
    },
    inspiration: {
        title: "Inspiració",
        shortcut: "p",
        icon: diceFaces.inspiration.icon,
        faces: [
            { ...diceFaces.inspiration, number: 2 },
            { ...diceFaces.team, number: 1 },
            { ...diceFaces.willpower, number: 1 },
        ],
    },
    leadership: {
        title: "Lideratge",
        shortcut: "L",
        icon: diceFaces.leader.icon,
        faces: [
            { ...diceFaces.leader, number: 2 },
            { ...diceFaces.tactic, number: 1 },
            { ...diceFaces.willpower, number: 1 },
        ],
    },
    tactics: {
        title: "Tactics",
        shortcut: "T",
        icon: diceFaces.tactic.icon,
        faces: [
            { ...diceFaces.tactic, number: 2 },
            { ...diceFaces.leader, number: 1 },
            { ...diceFaces.willpower, number: 1 },
        ],
    },
    morale: {
        title: "Moral",
        shortcut: "M",
        icon: diceFaces.retreat.icon,
        faces: [
            { ...diceFaces.retreat, number: 1 },
            { ...diceFaces.confusion, number: 2 },
        ],
    },
};

const diceResults = {};

for (let id in diceTypes) {
    diceTypes[id].id = id;
    for (let face of diceTypes[id].faces) {
        diceResults[face.id] = face;
    }
}

export { diceTypes, diceResults };
