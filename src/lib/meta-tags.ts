export function setMetaContent(
  attribute: "property" | "name",
  key: string,
  content: string
) {
  if (typeof document === "undefined") return;

  const selector = `meta[${attribute}="${key}"]`;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}
