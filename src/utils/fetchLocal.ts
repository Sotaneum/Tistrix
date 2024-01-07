import parser from "./parser";

const localDom = document.createElement("div");

export default function fetchLocal() {
  if (!localDom.children.length) {
    const target = document.querySelector("div#tistrix");
    if (!target) {
      return {};
    }
    localDom.appendChild(target);
  }

  return parser(localDom.children[0]);
}
