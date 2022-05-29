import { diceResults, diceTypes } from "./dicetypes";
import { permutations, kCombinations, cartesianProduct } from "./combinations";

export class DiceBucket {
    constructor(diceToSet = null, scoringWeights = null) {
        this.dice = {};
        this.scoringWeights = scoringWeights || {};
        if (diceToSet) {
            this.setAmounts(diceToSet);
        }
    }

    clone() {
        const clone = new this.constructor(null, this.scoringWeights);
        for (let diceTypeId in this.dice) {
            clone.dice[diceTypeId] = this.dice[diceTypeId].map((die) =>
                die.clone()
            );
        }
        return clone;
    }

    *[Symbol.iterator]() {
        for (let diceTypeId in this.dice) {
            yield* this.dice[diceTypeId];
        }
    }

    setDiceState(state) {
        for (let die of this) {
            die.state = state;
        }
    }

    getDiceOfType(diceType) {
        if (typeof diceType != "string") {
            diceType = diceType.id;
        }
        if (this.dice[diceType]) {
            return Array.from(this.dice[diceType]);
        }
        return [];
    }

    roll() {
        window.cunningplan.lastRolls = [];
        window.cunningplan.currentRoll = 0;
        for (let die of this) {
            die.roll();
        }
        localStorage.setItem(
            "cunningplan.lastRolls",
            JSON.stringify(window.cunningplan.lastRolls)
        );
    }

    getResultCount() {
        const count = {};
        for (let die of this) {
            if (die.result) {
                count[die.result.id] = (count[die.result.id] || 0) + 1;
            }
        }
        return count;
    }

    getEffectiveResultCount() {
        const count = {};
        for (let die of this) {
            const result = die.effectiveResult;
            if (result) {
                count[result.id] = (count[result.id] || 0) + 1;
            }
        }
        return count;
    }

    getScore() {
        let score = 0;

        for (let die of this) {
            const result = die.effectiveResult;
            if (result) {
                score += this.scoringWeights[result.id] || 0;
            }
        }

        return score;
    }

    getAmounts() {
        const amounts = {};
        for (let diceTypeId in this.dice) {
            amounts[diceTypeId] = this.dice[diceTypeId].length;
        }
        return amounts;
    }

    setAmounts(diceToSet) {
        for (let diceTypeId in diceToSet) {
            this.setAmount(diceTypeId, diceToSet[diceTypeId]);
        }
    }

    setAmount(diceType, amount) {
        if (typeof diceType == "string") {
            diceType = diceTypes[diceType];
        }

        let dice = this.dice[diceType.id];

        if (!dice) {
            if (!amount) {
                return;
            }
            this.dice[diceType.id] = dice = [];
        }

        if (amount > dice.length) {
            while (amount > dice.length) {
                dice.push(new Die(diceType));
            }
        } else if (amount < dice.length) {
            while (amount < dice.length) {
                dice.pop();
            }
        }
    }

    getResults(type) {
        const results = [];
        let resultIds;

        if (typeof type == "string") {
            resultIds = [type];
        } else {
            resultIds = type;
        }

        for (let resultId of resultIds) {
            for (let die of this) {
                const result = die.effectiveResult;
                if (result && result.id === resultId) {
                    results.push(die);
                }
            }
        }

        return results;
    }

    resolveEffects(diceEffects) {
        // If there are 1+ choice effects, try out all of their possible
        // combinations and apply the one with the best outcome
        const choiceEffects = diceEffects.filter(
            (effect) =>
                effect.effect === "choices" &&
                effect.limit !== 0 &&
                effect.choices.length
        );

        if (choiceEffects.length) {
            let bestScore = null;
            let bucketWithBestScore = null;
            const allEffectPermutations = [];

            for (let effect of choiceEffects) {
                for (let choice of effect.choices) {
                    choice.limit = 1;
                }

                const effectPermutations = [];
                allEffectPermutations.push(effectPermutations);
                for (let choices of kCombinations(
                    effect.choices,
                    effect.limit || effect.choices.length
                )) {
                    effectPermutations.push(permutations(choices));
                }
            }

            for (let choices of cartesianProduct(allEffectPermutations)) {
                const effectsCombination = [];
                for (let effect of diceEffects) {
                    if (effect.effect === "choices") {
                        effectsCombination.push(...choices.shift());
                    } else {
                        effectsCombination.push(effect);
                    }
                }
                const choicesBucket = this.resolveEffects(effectsCombination);
                if (choicesBucket) {
                    const choicesScore = choicesBucket.getScore();
                    if (bestScore === null || choicesScore > bestScore) {
                        bestScore = choicesScore;
                        bucketWithBestScore = choicesBucket;
                    }
                }
            }

            return bucketWithBestScore;
        }

        const bucket = this.clone();
        let bucketTransformed = false;

        for (let effect of diceEffects) {
            let uses = 0;
            let exhausted = false;

            if (effect.effect === "cancel") {
                const targetDice = bucket.getResults(effect.target);

                for (let triggerDie of bucket.getResults(effect.trigger)) {
                    let dieUsed = false;
                    let amount = effect.amount;
                    const context = { effect, triggerDie };

                    if (amount === undefined) {
                        amount = 1;
                    } else if (amount === "all") {
                        amount = targetDice.length;
                    }

                    while (amount--) {
                        const targetDie = targetDice.shift();
                        if (targetDie) {
                            dieUsed = true;
                            bucketTransformed = true;
                            targetDie.cancel(context);
                            uses++;
                            if (effect.limit && uses === effect.limit) {
                                exhausted = true;
                                break;
                            }
                        } else {
                            exhausted = true;
                            break;
                        }
                    }

                    if (dieUsed) {
                        triggerDie.cancel(context);
                    }

                    if (exhausted) {
                        break;
                    }
                }
            } else if (effect.effect === "treatAs") {
                for (let die of bucket.getResults(effect.trigger)) {
                    bucketTransformed = true;
                    const context = { effect, triggerDie: this };
                    die.replace(effect.replacement, context);
                    uses++;
                    if (effect.limit && uses === effect.limit) {
                        break;
                    }
                }
            } else if (effect.effect === "transform") {
                const targetDice = bucket.getResults(effect.target);
                for (let triggerDie of bucket.getResults(effect.trigger)) {
                    const targetDie = targetDice.shift();
                    if (targetDie) {
                        bucketTransformed = true;
                        const context = { effect, triggerDie };
                        triggerDie.cancel(context);
                        targetDie.replace(effect.replacement, context);
                        uses++;
                        if (effect.limit && uses === effect.limit) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
        }

        return bucketTransformed ? bucket : null;
    }

    log(title) {
        console.group(title);
        console.log(this.getResultCount());
        for (let die of this) {
            console.group(die.result.id);
            console.log("Result", die.result);
            console.log("Effective result", die.effectiveResult);
            console.log("State", die.state);
            console.groupEnd();
        }
        console.groupEnd();
    }
}

export class Die {
    constructor(diceType, result = null, state = null) {
        this.diceType = diceType;
        this.result = result === null ? diceType.faces[0] : result;
        this.state = state || Die.RESTING;
    }

    clone() {
        return new this.constructor(this.diceType, this.result, this.state);
    }

    get effectiveResult() {
        let result = this.result;
        let state = this.state;

        do {
            if (state.id === "canceling" || state.id === "canceled") {
                result = "";
            } else if (state.replacement) {
                result = state.replacement;
            }
            state = state.nextState;
        } while (state);

        return result;
    }

    pushState(state) {
        if (this.state === Die.RESTING || this.state === Die.ROLLING) {
            this.state = state;
        } else {
            this.getFinalState().nextState = state;
        }
    }

    getFinalState() {
        let state = this.state;
        while (state.nextState) {
            state = state.nextState;
        }
        return state;
    }

    cancel(context) {
        this.pushState({
            id: "canceling",
            ...context,
            nextState: {
                id: "canceled",
                ...context,
            },
        });
    }

    replace(replacement, context) {
        this.pushState({
            id: "faceDisappearing",
            ...context,
            nextState: {
                id: "faceAppearing",
                replacement: diceResults[replacement],
                ...context,
            },
        });
    }

    roll() {
        this.state = Die.ROLLING;

        // Roll the die, see if the rolled score is enough for any of its faces
        let value;
        if (window.cunningplan.fixedRolls) {
            value =
                window.cunningplan.fixedRolls[window.cunningplan.currentRoll++];
        } else {
            value = Math.floor(Math.random() * 6) + 1;
        }
        window.cunningplan.lastRolls.push(value);
        let n = 0;
        for (let face of this.diceType.faces) {
            n += face.number;
            if (n >= value) {
                this.result = face;
                return;
            }
        }

        // Otherwise default to a blank result
        this.result = "";
    }
}

Die.RESTING = Object.freeze({ id: "resting" });
Die.ROLLING = Object.freeze({ id: "rolling" });

// Fixing roll results, for debugging. Using the browser console, obtain the
// results of the last roll by checking the value of cunningplan.lastRolls; fix
// them to reproduce them later by setting cunningplan.fixedRolls to that same
// value. Set cunningplan.fixedRolls to null to roll randomly again.
if (!window.cunningplan) {
    window.cunningplan = {};
    Object.assign(window.cunningplan, {
        lastRolls: JSON.parse(
            localStorage.getItem("cunningplan.lastRolls") || "[]"
        ),
        fixedRolls: null,
        currentRoll: 0,
        fixRolls: function () {
            this.fixedRolls = this.lastRolls;
        },
    });
}
