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
            ]}/>
    );
}
