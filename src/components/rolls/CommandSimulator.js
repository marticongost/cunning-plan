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
                    target: ["willpower", "inspiration", "tactic", "unit"],
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
