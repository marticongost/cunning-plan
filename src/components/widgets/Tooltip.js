import React from "react";
import "../../css/Tooltip.css";

export default function Tooltip(props) {
    const { content, children } = props;
    return (
        <div className="Tooltip">
            {children}
            <div className="Tooltip-container">
                <div className="Tooltip-frame">{content}</div>
            </div>
        </div>
    );
}
