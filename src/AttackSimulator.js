import React from "react";
import attackTypes from "./attacktypes";
import RollSimulator from "./RollSimulator";
import { ReactComponent as CriticalIcon } from "./svg/dice/critical.svg";
import { ReactComponent as HitIcon } from "./svg/dice/hit.svg";
import { ReactComponent as SupressionIcon } from "./svg/dice/supression.svg";

const INCOMING_FIRE_RESULTS = ["critical", "hit", "supression"];

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
                    target: INCOMING_FIRE_RESULTS,
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
                    target: INCOMING_FIRE_RESULTS,
                },
                {
                    effect: "cancel",
                    trigger: ["veterancy"],
                    target: INCOMING_FIRE_RESULTS,
                },
            ]}
            diceScore={(results) =>
                (results.critical || 0) * 100000 +
                (results.hit || 0) * 1000 +
                (results.supression || 0)
            }
            predictions={[
                {
                    title: "Baixa 3",
                    icon: CriticalIcon,
                    amount: 1,
                    test: (results) => results.critical || results.hit >= 3,
                },
                {
                    title: "Baixa 2",
                    icon: HitIcon,
                    amount: 2,
                    test: (results) => !results.critical && results.hit === 2,
                },
                {
                    title: "Baixa 1",
                    icon: HitIcon,
                    amount: 1,
                    test: (results) => !results.critical && results.hit === 1,
                },
                {
                    title: "Supressió 3",
                    icon: SupressionIcon,
                    amount: 3,
                    test: (results) =>
                        !results.critical &&
                        !(results.hit >= 3) &&
                        (results.supression || 0) + (results.hit || 0) >= 3,
                },
                {
                    title: "Supressió 2",
                    icon: SupressionIcon,
                    amount: 2,
                    test: (results) =>
                        !results.critical &&
                        !(results.hit >= 3) &&
                        (results.supression || 0) + (results.hit || 0) === 2,
                },
                {
                    title: "Supressió 1",
                    icon: SupressionIcon,
                    amount: 1,
                    test: (results) =>
                        !results.critical &&
                        !(results.hit >= 3) &&
                        (results.supression || 0) + (results.hit || 0) === 1,
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
