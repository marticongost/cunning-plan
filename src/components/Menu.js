import React from "react";
import { Link } from "react-router-dom";
import "../css/Menu.css";

export function Menu(props) {
    return (
        <nav className="Menu">
            <ul>
                {props.documents.map((document) => (
                    <MenuEntry
                        document={document}
                        isSelected={document === props.selectedDocument}
                        key={document.slug}
                    />
                ))}
            </ul>
        </nav>
    );
}

export function MenuEntry(props) {
    return (
        <li
            className="MenuEntry"
            data-selected={props.isSelected ? "true" : "false"}
        >
            <Link to={props.document.path}>
                <props.document.icon />
                <span>{props.document.title}</span>
            </Link>
        </li>
    );
}
