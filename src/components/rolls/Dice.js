import React from "react";
import { ReactComponent as AddIcon } from "../../svg/icons/add.svg";
import { ReactComponent as RemoveIcon } from "../../svg/icons/remove.svg";
import Tooltip from "../widgets/Tooltip";
import "../../css/Dice.css";

const digits = "0123456789";

export default function Dice(props) {
    const { dice, type, onAmountChanged, onDieClicked } = props;

    function setAmount(amount) {
        if (onAmountChanged) {
            amount = Math.max(0, amount);
            if (amount !== dice.length) {
                onAmountChanged(amount);
            }
        }
    }

    function handleAddButtonClick(e) {
        setAmount(dice.length + 1);
    }

    function handleRemoveButtonClick(e) {
        setAmount(dice.length - 1);
    }

    function handleChange(e) {
        let amount = Number(e.target.value);
        if (!isNaN(amount)) {
            setAmount(amount);
        }
    }

    function handleKeyDown(e) {
        if (e.key === "+") {
            setAmount(dice.length + 1);
        } else if (e.key === "-") {
            setAmount(dice.length - 1);
        } else if (e.key.length === 1) {
            const index = digits.indexOf(e.key);
            if (index >= 0) {
                setAmount(index);
            }
        }
    }

    return (
        <div
            className="Dice"
            data-type={type.id}
            data-shortcut={type.shortcut.toLowerCase()}
            tabIndex="-1"
            onKeyDown={handleKeyDown}
        >
            <div className="Dice-type">
                <Tooltip
                    content={type.faces.map((face, index) => (
                        <div key={index} className="Dice-faceCount">
                            {<face.icon />} {face.number} / {type.totalSides}
                        </div>
                    ))}
                >
                    <type.icon />
                    <span
                        className="Dice-title"
                        dangerouslySetInnerHTML={{
                            __html: type.title.replace(
                                type.shortcut,
                                `<u>${type.shortcut}</u>`
                            ),
                        }}
                    ></span>
                </Tooltip>
            </div>
            <div className="Dice-controls">
                <input
                    className="Dice-input"
                    type="number"
                    value={dice.length}
                    min="0"
                    onChange={handleChange}
                />
                <button
                    className="Dice-removeButton"
                    type="button"
                    onClick={handleRemoveButtonClick}
                >
                    <RemoveIcon />
                </button>
                <button
                    className="Dice-addButton"
                    type="button"
                    onClick={handleAddButtonClick}
                >
                    <AddIcon />
                </button>
            </div>
            <div className="Dice-dice">
                {dice.map((die, index) => (
                    <Die key={index} die={die} onDieClicked={onDieClicked} />
                ))}
            </div>
        </div>
    );
}

function Die(props) {
    const { die, onDieClicked } = props;

    function handleDieClicked(e) {
        if (onDieClicked) {
            onDieClicked(die);
        }
    }

    return (
        <div
            className="Dice-die"
            data-state={die.state.id}
            title={getTitleFromDieState(die)}
            onClick={handleDieClicked}
        >
            {die.result ? <die.result.icon /> : null}
        </div>
    );
}

function getTitleFromDieState(die) {
    if (die.state.id === "canceled" && die.state.triggerDie) {
        return "Cancel·lat per " + die.state.triggerDie.result.title;
    }
    return "";
}
