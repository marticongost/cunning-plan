import React from "react";
import attackTypes from "./attacktypes";
import RollSimulator from "./RollSimulator";

export default function AttackSimulator() {
    return (
        <RollSimulator
            Controls={AttackSimulatorControls}
            initialSettings={{
                attackType: attackTypes[0],
                range: 0,
            }}
            dicePresets={(settings) => {
                return {
                    critical: settings.attackType.softAttack || 0,
                    supression: settings.attackType.supression || 0,
                    range:
                        (settings.attackType.ranges &&
                            settings.attackType.ranges.length &&
                            settings.attackType.ranges[settings.range]
                                .penalty) ||
                        0,
                };
            }}
            diceGroups={[
                {
                    id: "attacker",
                    title: "Atacant",
                    diceTypes: ["critical", "supression", "shock", "movement"],
                },
                {
                    id: "defender",
                    title: "Defensor",
                    diceTypes: ["veterancy", "range", "cover", "visibility"],
                },
            ]}
            scoringWeights={{
                critical: 10000,
                supression: 100,
                hit: 1,
            }}
            diceEffects={(settings, diceAmounts, results) => [
                {
                    effect: "choices",
                    limit: results.special || 0,
                    choices: (settings.attackType.special || [])
                        .filter(
                            (special) =>
                                !special.requires ||
                                ((special.requires.range === undefined ||
                                    special.requires.range.includes(
                                        settings.range
                                    )) &&
                                    (special.requires.movement === undefined ||
                                        special.requires.movement.includes(
                                            diceAmounts.movement
                                        )))
                        )
                        .map((special) => {
                            return { trigger: ["special"], ...special };
                        }),
                },
                {
                    effect: "cancel",
                    trigger: ["disordered"],
                    target: ["critical", "supression", "hit"],
                    amount: "all",
                },
                {
                    effect: "cancel",
                    trigger: [
                        "movement",
                        "range",
                        "cover",
                        "visibility",
                        "shock",
                    ],
                    target: ["critical", "hit"],
                },
                {
                    effect: "cancel",
                    trigger: ["veterancy"],
                    target: ["hit"],
                },
            ]}
            diceScore={(results) =>
                (results.critical || 0) * 100000 +
                (results.supression || 0) * 1000 +
                (results.hit || 0)
            }
            predictions={[
                {
                    title: "Baixa",
                    test: (results) => (results.critical || 0) > 0,
                },
                {
                    title: "Xoc",
                    test: (results) =>
                        (results.critical || 0) < 1 &&
                        ((results.hit || 0) > 0 ||
                            (results.supression || 0) > 0),
                },
            ]}
        />
    );
}

function AttackSimulatorControls(props) {
    const { settings, onSettingsChanged } = props;
    const attackType = settings.attackType;
    const range = settings.range;

    let rangeOptions;
    if (attackType.ranges && attackType.ranges.length) {
        rangeOptions = attackType.ranges.map((range, index) => (
            <option key={index} value={index}>
                Menys de {range.max} cm
            </option>
        ));
    } else {
        rangeOptions = [
            <option key={0} value="0">
                Distància indeterminada
            </option>,
        ];
    }

    function handleAttackTypeSelectorChanged(e) {
        const attackType = attackTypes[e.target.selectedIndex];
        onSettingsChanged({ attackType: attackType, range: 0 });
    }

    function handleRangeSelectorChanged(e) {
        const range = e.target.selectedIndex;
        onSettingsChanged({ range: range });
    }

    return (
        <>
            <select
                className="AttackSimulator-attackTypeSelector"
                onChange={handleAttackTypeSelectorChanged}
                value={attackType.id}
            >
                {attackTypes.map((attackType, index) => (
                    <option key={index} value={attackType.id}>
                        {attackType.title}
                    </option>
                ))}
            </select>
            <select
                className="AttackSimulator-rangeSelector"
                onChange={handleRangeSelectorChanged}
                value={range}
            >
                {rangeOptions}
            </select>
        </>
    );
}
