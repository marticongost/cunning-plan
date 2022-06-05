import React from "react";
import RollSimulator from "./RollSimulator";
import { ReactComponent as DelayIcon } from "../../svg/dice/delay.svg";
import { ReactComponent as LightningIcon } from "../../svg/dice/lightning.svg";
import { times } from "../../modules/utils";

export default function InitiativeSimulator() {
    return (
        <RollSimulator
            diceGroups={[
                {
                    id: "initiative",
                    diceTypes: ["initiative"],
                },
            ]}
            predictions={[
                {
                    title: "Iniciativa 0",
                    icon: LightningIcon,
                    amount: 1,
                    test: (results) => !results.delay,
                },
                ...times(6, (n) => {
                    return {
                        title: "Iniciativa " + (n + 1),
                        icon: DelayIcon,
                        amount: n + 1,
                        test: (results) => results.delay === n + 1,
                    };
                }),
            ]}
        />
    );
}
