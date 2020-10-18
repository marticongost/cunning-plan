import React, { useState } from "react";
import { diceTypes } from './dicetypes';
import Dice from './Dice';
import { DiceBucket, Die } from './dicebucket';
import './css/RollSimulator.css';

export default function RollSimulator(props) {

    const {
        diceGroups,
        Controls,
        initialSettings,
        dicePresets,
        diceEffects,
        scoringWeights,
        predictions
    } = props;

    const [settings, setSettings] = useState(initialSettings);
    const [diceBucket, setDiceBucket] = useState(
        () => new DiceBucket(
            dicePresets ? dicePresets(settings) : null,
            scoringWeights
        )
    );
    const [predictionResults, setPredictionResults] = useState(
        () => getPredictionResults(diceBucket)
    );

    function updateSettings(newValues) {
        const newSettings = Object.assign({}, settings, newValues);
        setSettings(newSettings);
        if (dicePresets) {
            updateDiceAmounts(dicePresets(newSettings));
        }
    }

    function updateDiceAmounts(diceToSet) {
        const newDiceBucket = diceBucket.clone();
        newDiceBucket.setAmounts(diceToSet);
        setPredictionResults(getPredictionResults(newDiceBucket));
        setDiceBucket(newDiceBucket);
    }

    function getPredictionResults(diceBucket) {
        let bruteForcePredictionRoll = diceBucket.clone();
        const chances = [];
        const amounts = bruteForcePredictionRoll.getAmounts();

        if (predictions) {
            for (let i = 0; i < predictions.length; i++) {
                chances.push(0);
            }
            for (let n = 0; n < 10000; n++) {
                bruteForcePredictionRoll.roll();
                if (diceEffects) {
                    const diceEffectsForRoll = diceEffects(
                        settings,
                        amounts,
                        bruteForcePredictionRoll.getResultCount()
                    );
                    if (diceEffectsForRoll && diceEffectsForRoll.length) {
                        bruteForcePredictionRoll = (
                            bruteForcePredictionRoll.resolveEffects(
                                diceEffectsForRoll
                            )
                            || bruteForcePredictionRoll
                        );
                    }
                }
                const results = bruteForcePredictionRoll.getEffectiveResultCount();
                for (let i = 0; i < predictions.length; i++) {
                    if (predictions[i].test(results)) {
                        chances[i]++;
                    }
                }
            }
        }
        return chances;
    }

    function handleRollButtonClick(e) {

        // Start the roll animation
        const rollingDiceBucket = diceBucket.clone();
        rollingDiceBucket.roll();
        setDiceBucket(rollingDiceBucket);

        function afterRoll() {

            // End the roll animation
            const afterRollDiceBucket = rollingDiceBucket.clone();
            afterRollDiceBucket.setDiceState(Die.RESTING);
            setDiceBucket(afterRollDiceBucket);

            // Apply dice effects
            if (diceEffects) {
                const diceEffectsForRoll = diceEffects(
                    settings,
                    afterRollDiceBucket.getAmounts(),
                    afterRollDiceBucket.getResultCount()
                );
                if (diceEffectsForRoll && diceEffectsForRoll.length) {
                    let effectsDiceBucket = afterRollDiceBucket.resolveEffects(
                        diceEffectsForRoll
                    );
                    if (effectsDiceBucket) {
                        console.group('Dice effects');
                        console.log(afterRollDiceBucket.getResultCount());
                        for (let die of effectsDiceBucket) {
                            console.log(die.result, die.effectiveResult, die.state);
                        }
                        console.groupEnd();
                        setDiceBucket(effectsDiceBucket);
                        function changeStates() {
                            let changesRemain = false;
                            effectsDiceBucket = effectsDiceBucket.clone();
                            for (let die of effectsDiceBucket) {
                                if (die.state.nextState) {
                                    die.state = die.state.nextState;
                                    if (die.state.replacement) {
                                        die.result = die.state.replacement;
                                    }
                                    changesRemain = (
                                        changesRemain || die.state.nextState
                                    );
                                }
                            }
                            setDiceBucket(effectsDiceBucket);
                            if (changesRemain) {
                                setTimeout(changeStates, 200);
                            }
                        }
                        setTimeout(changeStates, 200);
                    }
                }
            }
        }
        setTimeout(afterRoll, 200);
    }

    function diceList(types) {
        const elements = [];
        for (let diceTypeId of types) {
            const diceType = diceTypes[diceTypeId];
            elements.push(
                <Dice
                    key={diceTypeId}
                    type={diceType}
                    dice={diceBucket.getDiceOfType(diceTypeId)}
                    onAmountChanged={(amount) => updateDiceAmounts({[diceTypeId]: amount})}/>
            );
        }
        return elements;
    }

    const controls = (
        Controls ?
            <Controls
                settings={settings}
                onSettingsChanged={updateSettings}/>
            : null
    );

    const predictionsSection = (
        predictions ?
            <div className="RollSimulator-predictions">
                <dl>
                    {predictions.map(
                        (prediction, index) =>
                            <div key={index}>
                                <dt>{prediction.title}</dt>
                                <dd>{Math.round(predictionResults[index] / 100)} %</dd>
                            </div>
                    )}
                </dl>
            </div>
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
                {predictionsSection}
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
