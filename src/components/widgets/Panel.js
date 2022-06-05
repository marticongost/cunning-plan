import React from "react";
import "../../css/Panel.css";

export default function Panel(props) {
    let className = "Panel";
    if (props.className) className += ` ${props.className}`;
    return (
        <section className={className} id={props.id}>
            {props.children}
        </section>
    );
}
