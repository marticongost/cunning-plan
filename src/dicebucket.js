import diceTypes from './dicetypes';

export class DiceBucket {

    constructor(diceToSet = null) {
        this.dice = {};
        if (diceToSet) {
            this.setAmounts(diceToSet);
        }
    }

    clone() {
        const clone = new this.constructor();
        for (let diceTypeId in this.dice) {
            clone.dice[diceTypeId] = (
                this.dice[diceTypeId].map(die => die.clone())
            );
        }
        return clone;
    }

    *[Symbol.iterator]() {
        for (let diceTypeId in this.dice) {
            yield *this.dice[diceTypeId];
        }
    }

    setDiceState(state) {
        for (let die of this) {
            die.state = state;
        }
    }

    getDiceOfType(diceType) {
        if (typeof(diceType) != 'string') {
            diceType = diceType.id;
        }
        if (this.dice[diceType]) {
            return Array.from(this.dice[diceType]);
        }
        return [];
    }

    roll() {
        for (let die of this) {
            die.roll();
        }
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

        if (typeof(diceType) == 'string') {
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
        }
        else if (amount < dice.length) {
            while (amount < dice.length) {
                dice.pop();
            }
        }
    }

    nonConsumedResults(type) {

        const results = [];
        let resultIds;

        if (typeof(type) == 'string') {
            resultIds = [type]
        }
        else {
            resultIds = type;
        }

        for (let resultId of resultIds) {
            for (let die of this) {
                if (
                    die.result
                    && die.result.id === resultId
                    && !die.consumed
                ) {
                    results.push(die);
                }
            }
        }

        return results;
    }

    resolveEffects(diceEffects) {

        let bucketChanged = false;

        for (let effect of diceEffects) {
            if (effect.effect === 'cancel') {
                const targetDice = this.nonConsumedResults(effect.target);
                for (let triggerDie of this.nonConsumedResults(effect.trigger)) {
                    const targetDie = targetDice.shift();
                    if (targetDie) {
                        bucketChanged = true;
                        triggerDie.consumed = true;
                        triggerDie.state = {
                            id: 'canceling',
                            effect,
                            triggerDie
                        };
                        targetDie.consumed = true;
                        targetDie.state = {
                            id: 'canceling',
                            effect,
                            triggerDie
                        };
                    }
                    else {
                        break;
                    }
                }
            }
            else if (effect.effect === 'treatAs') {
                for (let die of this.nonConsumedResults(effect.trigger)) {
                    bucketChanged = true;
                    die.consumed = true;
                    die.state = {
                        id: 'faceDisappearing',
                        replacement: effect.replacement,
                        effect
                    };
                }
            }
            else if (effect.effect === 'transform') {
                const targetDice = this.nonConsumedResults(effect.target);
                for (let triggerDie of this.nonConsumedResults(effect.trigger)) {
                    const targetDie = targetDice.shift();
                    if (targetDie) {
                        bucketChanged = true;
                        triggerDie.consumed = true;
                        triggerDie.state = {
                            id: 'canceling',
                            effect,
                            triggerDie
                        };
                        targetDie.consumed = true;
                        targetDie.state = {
                            id: 'faceDisappearing',
                            replacement: effect.replacement,
                            effect,
                            triggerDie
                        };
                    }
                    else {
                        break;
                    }
                }
            }
        }

        return bucketChanged;
    }
}

export class Die {

    constructor(diceType, result = null, state = null, consumed = false) {
        this.diceType = diceType;
        this.result = result === null ? diceType.faces[0] : result;
        this.state = state || Die.RESTING;
        this.consumed = consumed;
    }

    clone() {
        return new this.constructor(
            this.diceType,
            this.result,
            this.state,
            this.consumed
        );
    }

    roll() {
        this.consumed = false;
        this.state = Die.ROLLING;

        // Roll the die, see if the rolled score is enough for any of its faces
        const value = Math.floor(Math.random() * 6) + 1;
        let n = 0;
        for (let face of this.diceType.faces) {
            n += face.number;
            if (n >= value) {
                this.result = face;
                return;
            }
        }

        // Otherwise default to a blank result
        this.result = '';
    }
}

Die.RESTING = Object.freeze({id: 'resting'});
Die.ROLLING = Object.freeze({id: 'rolling'});
