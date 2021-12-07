import React from "react";
import RollSimulator from "./RollSimulator";

export default function ShockSimulator() {
    return (
        <RollSimulator
            diceGroups={[
                {
                    id: "shock",
                    diceTypes: ["shock", "veterancy"],
                },
            ]}
            diceEffects={(settings, diceAmounts, results) => [
                {
                    effect: "transform",
                    trigger: ["veterancy"],
                    target: ["disordered"],
                    replacement: "shock",
                },
                {
                    effect: "cancel",
                    trigger: ["veterancy"],
                    target: ["shock"],
                },
            ]}
        />
    );
}
