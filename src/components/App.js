import React, { useEffect } from "react";
import { Tabs, Tab } from "./widgets/Tabs";
import AttackSimulator from "./rolls/AttackSimulator";
import "../css/App.css";
import ShockSimulator from "./rolls/ShockSimulator";

function App() {
    useEffect(() => {
        const handler = (e) => {
            const element = document.querySelector(
                `[data-shortcut="${e.key}"]`
            );
            if (element) {
                element.focus();
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return (
        <div className="App">
            <h1 className="App-heading">Cunning plan</h1>
            <Tabs>
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
        </div>
    );
}

export default App;