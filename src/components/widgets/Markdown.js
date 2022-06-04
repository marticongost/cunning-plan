import React from "react";
import { Converter } from "showdown";

const markdownConverter = new Converter();

export default function Markdown(props) {
    if (!props.content) return null;
    const html = markdownConverter.makeHtml(props.content);
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
