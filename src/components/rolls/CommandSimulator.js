import React from "react";
import RollSimulator from "./RollSimulator";

export default function CommandSimulator() {
    return (
        <RollSimulator
            diceGroups={[
                {
                    id: "command",
                    diceTypes: ["command", "morale"],
                },
            ]}
            diceEffects={(settings, diceAmounts, results) => [
                {
                    effect: "cancel",
                    trigger: ["confusion"],
                    target: ["tactic", "squad"],
                },
                {
                    effect: "ignore",
                    target: ["confusion"],
                    amount: "all",
                },
            ]}
        />
    );
}
