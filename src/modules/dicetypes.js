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
    command: {
        title: "Comandament",
        shortcut: "C",
        icon: diceFaces.unit.icon,
        totalSides: 12,
        faces: [
            { ...diceFaces.unit, number: 3 },
            { ...diceFaces.team, number: 2 },
            { ...diceFaces.leader, number: 3 },
            { ...diceFaces.inspiration, number: 1 },
            { ...diceFaces.tactic, number: 2 },
            { ...diceFaces.willpower, number: 1 },
        ],
    },
    morale: {
        title: "Moral",
        shortcut: "M",
        icon: diceFaces.retreat.icon,
        faces: [
            { ...diceFaces.retreat, number: 1 },
            { ...diceFaces.delay, number: 1 },
            { ...diceFaces.confusion, number: 2 },
        ],
    },
    initiative: {
        title: "Iniciativa",
        shortcut: "I",
        icon: diceFaces.delay.icon,
        totalSides: 8,
        faces: [{ ...diceFaces.delay, number: 6 }],
    },
};

const diceResults = {};

for (let id in diceTypes) {
    const diceType = diceTypes[id];
    diceType.id = id;
    diceType.totalSides = diceType.totalSides || 6;
    for (let face of diceType.faces) {
        diceResults[face.id] = face;
    }
}

export { diceTypes, diceResults };
