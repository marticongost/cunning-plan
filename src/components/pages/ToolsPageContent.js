import React from "react";
import { Tabs, Tab } from "../widgets/Tabs";
import AttackSimulator from "../rolls/AttackSimulator";
import ShockSimulator from "../rolls/ShockSimulator";
import CommandSimulator from "../rolls/CommandSimulator";
import InitiativeSimulator from "../rolls/InitiativeSimulator";

export function ToolsPageContent(props) {
    return (
        <Tabs>
            <Tab name="command" title="Ordres">
                <CommandSimulator />
                <InitiativeSimulator />
            </Tab>
            <Tab name="attack-infantry" title="Atac a infanteria">
                <AttackSimulator />
            </Tab>
            <Tab name="attack-vehicle" title="Atac a vehicles">
                Catacroc
            </Tab>
            <Tab name="range-in" title="Artilleria">
                Spam
            </Tab>
            <Tab name="attack-close-quarters" title="Atac cos a cos">
                Zaaap
            </Tab>
            <Tab name="shock" title="Xoc">
                <ShockSimulator />
            </Tab>
        </Tabs>
    );
}
