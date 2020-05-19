import escapeHtml from "escape-html";
import { Text } from "slate";
export const serializeTextValue = (node) => {
  if (Text.isText(node)) {
    let serlializedLeaf = escapeHtml(node.text);
    if (node.bold) {
      serlializedLeaf = `<strong>${serlializedLeaf}</strong>`;
    }

    if (node.code) {
      serlializedLeaf = `<code>${serlializedLeaf}</code>`;
    }

    if (node.italic) {
      serlializedLeaf = `<em>${serlializedLeaf}</em>`;
    }

    if (node.underline) {
      serlializedLeaf = `<u>${serlializedLeaf}</u>`;
    }
    return serlializedLeaf;
  }

  const children = node.children.map(n => serializeTextValue(n)).join("");

  switch (node.type) {
  case "quote":
    return `<blockquote><p>${children}</p></blockquote>`;
  case "bulleted-list":
    return `<ul>${children}</ul>`;
  case "heading-one":
    return `<h1>${children}</h1>`;
  case "heading-two":
    return `<h2>${children}</h2>`;
  case "list-item":
    return `<li>${children}</li>`;
  case "numbered-list":
    return `<ol>${children}</ol>`;
  default:
    return `<p>${children}</p>`;
  }
};

