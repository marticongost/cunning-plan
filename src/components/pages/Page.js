import React, { useEffect } from "react";
import "../../css/Page.css";
import { Menu } from "../Menu.js";

export function Page(props) {
    useEffect(() => {
        const handler = (e) => {
            const element = document.querySelector(
                `[data-shortcut="${e.key}"]`
            );
            if (element) {
                element.focus();
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return (
        <div className="Page">
            <header className="Page-header">
                <h1 className="Page-heading">Cunning plan</h1>
                <Menu
                    documents={props.documents}
                    selectedDocument={props.document}
                />
            </header>
            <main className="Page-main">{props.document.content}</main>
        </div>
    );
}
