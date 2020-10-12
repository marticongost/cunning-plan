import React from "react";
import { ReactComponent as AddIcon } from './svg/icons/add.svg';
import { ReactComponent as RemoveIcon } from './svg/icons/remove.svg';
import './css/Dice.css';

const digits = '0123456789';

export default function Dice(props) {

    const {state, results, type, onAmountChanged} = props;

    function setAmount(amount) {
        if (onAmountChanged) {
            amount = Math.max(0, amount);
            if (amount !== results.length) {
                onAmountChanged(amount);
            }
        }
    }

    function handleAddButtonClick(e) {
        setAmount(results.length + 1);
    }

    function handleRemoveButtonClick(e) {
        setAmount(results.length - 1);
    }

    function handleChange(e) {
        let amount = Number(e.target.value);
        if (!isNaN(amount)) {
            setAmount(amount);
        }
    }

    function handleKeyDown(e) {
        if (e.key === '+') {
            setAmount(results.length + 1);
        }
        else if (e.key === '-') {
            setAmount(results.length - 1);
        }
        else if (e.key.length === 1) {
            const index = digits.indexOf(e.key);
            if (index >= 0) {
                setAmount(index);
            }
        }
    }


    return (
        <div
            className="Dice"
            data-state={state}
            data-type={type.id}
            data-shortcut={type.shortcut.toLowerCase()}
            tabIndex="-1"
            onKeyDown={handleKeyDown}>
            <div className="Dice-type">
                <type.icon/>
                <span
                    className="Dice-title"
                    dangerouslySetInnerHTML={{__html: type.title.replace(type.shortcut, `<u>${type.shortcut}</u>`)}}>
                </span>
            </div>
            <div className="Dice-controls">
                <input
                    className="Dice-input"
                    type="number"
                    value={results.length}
                    min="0"
                    onChange={handleChange}/>
                <button
                    className="Dice-removeButton"
                    type="button"
                    onClick={handleRemoveButtonClick}>
                    <RemoveIcon/>
                </button>
                <button
                    className="Dice-addButton"
                    type="button"
                    onClick={handleAddButtonClick}>
                    <AddIcon/>
                </button>
            </div>
            <div className="Dice-results">
                {results.map((face, index) =>
                    <div className="Dice-die" key={index}>
                        {face ? <face.icon/> : null}
                    </div>
                )}
            </div>
        </div>
    );
}