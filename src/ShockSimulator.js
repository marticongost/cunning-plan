import React from "react";
import RollSimulator from "./RollSimulator";

export default function ShockSimulator() {

    return (
        <RollSimulator
            diceGroups={[
                {
                    id: "shock",
                    diceTypes: ["shock", "veterancy"]
                }
            ]}
            diceEffects={(settings, diceAmounts, results) => [
                {
                    effect: 'cancel',
                    trigger: ['veterancy'],
                    target: ['shock']
                },
                {
                    effect: 'transform',
                    trigger: ['veterancy'],
                    target: ['disordered'],
                    replacement: 'shock'
                }
            ]}/>
    );
}
