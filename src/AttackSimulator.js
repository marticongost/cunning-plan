import React, { useState } from "react";
import attackTypes from './attacktypes';
import diceTypes from './dicetypes';
import Dice from './Dice';
import './css/AttackSimulator.css';

export default function AttackSimulator() {

    const [attackType, setAttackType] = useState(attackTypes[0]);
    const [range, setRange] = useState(0);

    const initialDiceBuckets = {};
    for (let diceBucket of [
        new DiceBucket('critical', attackType.softAttack),
        new DiceBucket('supression', attackType.supression),
        new DiceBucket('shock'),
        new DiceBucket('movement'),
        new DiceBucket('veterancy'),
        new DiceBucket('range', (attackType.ranges && attackType.ranges.length && attackType.ranges.penalty) || 0),
        new DiceBucket('cover'),
        new DiceBucket('visibility'),
    ]) {
        initialDiceBuckets[diceBucket.diceType.id] = diceBucket;
    }

    const [diceBuckets, setDiceBuckets] = useState(initialDiceBuckets);

    function updateDiceAmounts(diceToSet) {
        const newDiceBuckets = Object.assign({}, diceBuckets);
        for (let diceTypeId in diceToSet) {
            newDiceBuckets[diceTypeId].setAmount(diceToSet[diceTypeId]);
        }
        setDiceBuckets(newDiceBuckets);
    }

    function handleAttackTypeSelectorChanged(e) {
        const attackType = attackTypes[e.target.selectedIndex]
        setAttackType(attackType);
        setRange(0);
        updateDiceAmounts({
            critical: attackType.softAttack || 0,
            supression: attackType.supression || 0,
            range: (
                (
                    attackType.ranges
                    && attackType.ranges.length
                    && attackType.ranges[0].penalty
                )
                || 0
            )
        });
    }

    function handleRangeSelectorChanged(e) {
        setRange(e.target.selectedIndex);
        updateDiceAmounts({
            range: (
                attackType.ranges
                && attackType.ranges.length
                && attackType.ranges[e.target.selectedIndex].penalty
            )
            || 0
        });
    }

    let rangeOptions;
    if (attackType.ranges && attackType.ranges.length) {
        rangeOptions = attackType.ranges.map((range, index) =>
            <option key={index} value={index}>Menys de {range.max}</option>
        );
    }
    else {
        rangeOptions = [<option key={0} value="0">Distància indeterminada</option>];
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
                    onAmountChanged={(amount) => updateDiceAmounts({[id]: amount})}/>
            );
        }
        return elements;
    }

    return (
        <div className="AttackSimulator">
            <div className="AttackSimulator-controls">
                <select
                    className="AttackSimulator-attackTypeSelector"
                    onChange={handleAttackTypeSelectorChanged}
                    value={attackType.id}>
                    {attackTypes.map((attackType, index) =>
                        <option key={index} value={attackType.id}>{attackType.title}</option>
                    )}
                </select>
                <select
                    className="AttackSimulator-rangeSelector"
                    onChange={handleRangeSelectorChanged}
                    value={range}>
                    {rangeOptions}
                </select>
            </div>
            <div className="AttackSimulator-diceCategories">
                <section className="AttackSimulator-attacker">
                    <h1>Atacant</h1>
                    {diceList(["critical", "supression", "shock", "movement"])}
                </section>
                <section className="AttackSimulator-defender">
                    <h1>Defensor</h1>
                    {diceList(["veterancy", "range", "cover", "visibility"])}
                </section>
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
