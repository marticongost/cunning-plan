import toc from "./toc.yml";

export default toc;

toc.index = {};

function indexSections(node) {
  if (node.id) {
    toc.index[node.id] = node;
  }
  if (node.sections) {
    node.sections.forEach(indexSections);
  }
}

indexSections(toc);

const context = require.context("./sections", true, /\.md$/);

for (let key of context.keys()) {
  console.log(key);
  const sectionId = key.match(/\/([^/]+)\.md/)[1];
  const section = toc.index[sectionId];
  if (!section) {
    console.warn(`Document ${key} not in the rules TOC`);
  } else {
    section.content = context(key).default;
  }
}

for (let section of Object.values(toc.index)) {
  if (section.content === undefined) {
    console.warn(`Missing markdown file for section ${section.id}`);
  }
}
