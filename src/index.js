import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page } from "./components/pages/Page";
import { Document } from "./modules/navigation.js";
import { ReactComponent as RulesIcon } from "./svg/sections/rules.svg";
import { ReactComponent as ToolsIcon } from "./svg/sections/tools.svg";
import { ToolsPageContent } from "./components/pages/ToolsPageContent";
import { RulesPageContent } from "./components/pages/RulesPageContent";
import * as serviceWorker from "./serviceWorker";

const documents = [
    new Document({
        title: "Reglament",
        slug: "rules",
        icon: RulesIcon,
        content: <RulesPageContent />,
    }),
    new Document({
        title: "Eines",
        slug: "tools",
        icon: ToolsIcon,
        content: <ToolsPageContent />,
    }),
];

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {documents.map((document) => (
                    <Route
                        key={document.slug}
                        path={`/${document.slug}`}
                        element={
                            <Page document={document} documents={documents} />
                        }
                    />
                ))}
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
