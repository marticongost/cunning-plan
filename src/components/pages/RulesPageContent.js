import React from "react";
import toc from "../../rules/index.js";
import "../../css/RulesPageContent.css";
import Markdown from "../widgets/Markdown.js";

export function RulesPageContent(props) {
    console.log(toc);
    return (
        <article className="RulesPageContent">
            <h1>{toc.title}</h1>
            <Sections sections={toc.sections} />
        </article>
    );
}

function Sections(props) {
    if (!props.sections || !props.sections.length) return null;
    return props.sections.map((section) => (
        <Section section={section} key={section.id} />
    ));
}

function Section(props) {
    return (
        <section id={props.section.id}>
            <h1>{props.section.title}</h1>
            <Markdown content={props.section.content} />
            <Sections sections={props.section.sections} />
        </section>
    );
}
