import React from "react";
import RollSimulator from "./RollSimulator";

export default function InitiativeSimulator() {
    return (
        <RollSimulator
            diceGroups={[
                {
                    id: "initiative",
                    diceTypes: ["initiative"],
                },
            ]}
        />
    );
}
