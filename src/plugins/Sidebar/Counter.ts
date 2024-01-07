import fetchLocal from "../../utils/fetchLocal";
import fetchRemote from "../../utils/fetchRemote";
import { ParserResult } from "../../utils/parser";

interface CounterInterface {
  today: string;
  total: string;
  yesterday: string;
}

export default class Counter implements CounterInterface {
  private _data: ParserResult;

  constructor() {
    const sidebar = fetchLocal()?.sidebar as ParserResult;
    this._data = sidebar?.counter as ParserResult;
  }

  get today() {
    return this._data["today"] as string;
  }
  get total() {
    return this._data["total"] as string;
  }
  get yesterday() {
    return this._data["yesterday"] as string;
  }

  async update() {
    const sidebar = await fetchRemote(window.location.href).then(
      ({ sidebar }) => sidebar as ParserResult
    );
    this._data = sidebar?.counter as ParserResult;
  }
}
