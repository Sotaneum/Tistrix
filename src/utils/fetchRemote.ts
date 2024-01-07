import axios from "axios";
import parser from "./parser";

export default async function fetchRemote(url: string) {
  const { data: html } = await axios.get(url);

  const div = document.createElement("div");
  div.innerHTML = html;

  const target = div.querySelector("div#tistrix");
  return target ? parser(target) : {};
}
