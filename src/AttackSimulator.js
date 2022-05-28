import React from "react";
import attackTypes from "./attacktypes";
import RollSimulator from "./RollSimulator";
import { ReactComponent as CriticalIcon } from "./svg/dice/critical.svg";
import { ReactComponent as HitIcon } from "./svg/dice/hit.svg";
import { ReactComponent as SupressionIcon } from "./svg/dice/supression.svg";
import { ReactComponent as SpecialIcon } from "./svg/dice/special.svg";
import { diceTypes } from "./dicetypes";

const INCOMING_FIRE_RESULTS = ["critical", "hit", "supression"];

export default function AttackSimulator() {
    return (
        <RollSimulator
            Controls={AttackSimulatorControls}
            RollInformation={AvailableSpecials}
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
                        .filter((special) =>
                            satisfiesSpecialRequirements(
                                special,
                                diceAmounts,
                                settings
                            )
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
                        (results.supression || 0) >= 3,
                },
                {
                    title: "Supressió 2",
                    icon: SupressionIcon,
                    amount: 2,
                    test: (results) =>
                        !results.critical &&
                        !(results.hit >= 3) &&
                        (results.supression || 0) === 2,
                },
                {
                    title: "Supressió 1",
                    icon: SupressionIcon,
                    amount: 1,
                    test: (results) =>
                        !results.critical &&
                        !(results.hit >= 3) &&
                        (results.supression || 0) === 1,
                },
            ]}
        />
    );
}

function satisfiesSpecialRequirements(special, diceAmounts, settings) {
    if (special.requires) {
        const context = {
            movement: diceAmounts.movement,
            cover: diceAmounts.cover,
            range: settings.range,
        };
        for (let [key, acceptableValues] of Object.entries(special.requires)) {
            if (
                acceptableValues &&
                !acceptableValues.includes(context[key] || 0)
            ) {
                return false;
            }
        }
    }
    return true;
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

function AvailableSpecials(props) {
    const attackType = props.settings && props.settings.attackType;
    const diceAmounts = props.diceBucket.getAmounts();
    if (!attackType || !attackType.special || !attackType.special.length) {
        return null;
    }
    return (
        <div className="AvailableSpecials">
            {attackType.special.map((special, index) => (
                <SpecialAttack
                    key={index}
                    special={special}
                    applicable={satisfiesSpecialRequirements(
                        special,
                        diceAmounts,
                        props.settings
                    )}
                />
            ))}
        </div>
    );
}

function SpecialAttack(props) {
    return (
        <div
            className="SpecialAttack"
            data-applicable={props.applicable ? "true" : "false"}
        >
            <div className="SpecialAttack-title">
                <SpecialIcon />
                <span>{props.special.title}:</span>
            </div>
            <div className="SpecialAttack-effect">
                {describeSpecialAttack(props.special)}
            </div>
        </div>
    );
}

function describeSpecialAttack(special) {
    var description = [];

    function renderDieFaces(faceIds) {
        const targetFaceIds = typeof faceIds == "string" ? [faceIds] : faceIds;
        description.push(
            ...targetFaceIds.map((faceId, index) => {
                const Icon = getIconForFaceId(faceId);
                const content = [];
                if (index) {
                    content.push(" / ");
                }
                content.push(<Icon key={index} />);
                return content;
            })
        );
    }

    function getIconForFaceId(faceId) {
        for (let diceType of Object.values(diceTypes)) {
            for (let face of diceType.faces) {
                if (face.id === faceId) {
                    return face.icon;
                }
            }
        }
        return null;
    }

    function describeRange(range) {
        if (range === 0) {
            return "mínima";
        } else if (range === 1) {
            return "mitja";
        } else if (range === 2) {
            return "llarga";
        } else if (range === 3) {
            return "extrema";
        }
        return range;
    }

    if (special.effect === "cancel") {
        description.push("Cancel·la ");
        if (special.limit) {
            description.push(`fins a ${special.limit} `);
        }
        renderDieFaces(special.target);
    } else if (special.effect === "treatAs") {
        description.push("Converteix en ");
        renderDieFaces(special.replacement);
    }

    if (special.requires) {
        if (special.requires.range !== undefined) {
            description.push(
                ` a distància ${special.requires.range
                    .map(describeRange)
                    .join(", ")}`
            );
        }
        if (special.requires.cover !== undefined) {
            if (
                special.requires.cover.length === 1 &&
                special.requires.cover[0] === 0
            ) {
                description.push(" contra unitats sense cobertura");
            } else {
                description.push(
                    ` contra cobertura ${special.requires.cover.join(", ")}`
                );
            }
        }
        if (special.requires.movement !== undefined) {
            if (
                special.requires.movement.length === 1 &&
                special.requires.movement[0] === 0
            ) {
                description.push(" si la unitat no ha mogut");
            } else {
                description.push(
                    ` amb moviment ${special.requires.movement.join(", ")}`
                );
            }
        }
    }

    return description;
}
