import React, { useState } from "react";
import diceTypes from './dicetypes';
import Dice from './Dice';
import './css/RollSimulator.css';

export default function RollSimulator(props) {

    const {diceGroups, Controls, initialSettings, dicePresets} = props;
    const [settings, setSettings] = useState(initialSettings);
    const [rolling, setRolling] = useState(false);

    const initialDiceBuckets = {};
    const initialPreset = dicePresets ? dicePresets(settings) : null;
    for (let diceGroup of diceGroups) {
        for (let diceTypeId of diceGroup.diceTypes) {
            initialDiceBuckets[diceTypeId] = new DiceBucket(
                diceTypeId,
                (initialPreset && initialPreset[diceTypeId]) || 0
            );
        }
    }
    const [diceBuckets, setDiceBuckets] = useState(initialDiceBuckets);

    function updateSettings(newValues) {
        const newSettings = Object.assign({}, settings, newValues);
        setSettings(newSettings);
        if (dicePresets) {
            updateDiceAmounts(dicePresets(newSettings));
        }
    }

    function updateDiceBuckets() {
        setDiceBuckets(Object.assign({}, diceBuckets));
    }

    function updateDiceAmounts(diceToSet) {
        for (let diceTypeId in diceToSet) {
            diceBuckets[diceTypeId].setAmount(diceToSet[diceTypeId]);
        }
        updateDiceBuckets();
    }

    function handleRollButtonClick(e) {
        for (let diceTypeId in diceBuckets) {
            diceBuckets[diceTypeId].roll();
        }
        setRolling(true);
        updateDiceBuckets();
        setTimeout(() => setRolling(false), 200);
    }

    function diceList(types) {
        const elements = [];
        for (let id of types) {
            const diceType = diceTypes[id];
            elements.push(
                <Dice
                    key={diceType.id}
                    type={diceType}
                    results={diceBuckets[id].results}
                    state={rolling ? 'rolling' : 'resting'}
                    onAmountChanged={(amount) => updateDiceAmounts({[id]: amount})}/>
            );
        }
        return elements;
    }

    const controls = (
        Controls ?
            <Controls
                settings={settings}
                onSettingsChanged={updateSettings}
                onDiceAmountsChanged={updateDiceAmounts}/>
            : null
    );

    return (
        <div className="RollSimulator">
            <div className="RollSimulator-controls">
                {controls}
                <button
                    className="RollSimulator-rollButton"
                    type="button"
                    onClick={handleRollButtonClick}>
                    Tirar
                </button>
            </div>
            <div className="RollSimulator-diceGroups">
                {diceGroups.map(group =>
                    <section
                        key={group.id}
                        className="RollSimulator-diceGroup"
                        data-group={group.id}>
                        {group.title ? <h1 className="RollSimulator-diceGroupHeading">{group.title}</h1> : null}
                        {diceList(group.diceTypes)}
                    </section>
                )}
            </div>
        </div>
    );
}

class DiceBucket {

    constructor(diceType, amount = 0) {

        if (typeof(diceType) == 'string') {
            diceType = diceTypes[diceType];
        }

        this.diceType = diceType;
        this.results = [];
        while (amount--) {
            this.results.push(diceType.faces[0]);
        }
    }

    roll() {
        for (let i = 0; i < this.results.length; i++) {
            const value = Math.floor(Math.random() * 6) + 1;
            let n = 0;
            let result = null;
            for (let face of this.diceType.faces) {
                n += face.number;
                if (n >= value) {
                    result = face;
                    break;
                }
            }
            this.results[i] = result;
        }
    }

    setAmount(amount) {
        if (amount > this.results.length) {
            while (amount > this.results.length) {
                this.results.push(this.diceType.faces[0]);
            }
        }
        else if (amount < this.results.length) {
            while (amount < this.results.length) {
                this.results.pop();
            }
        }
    }
}
