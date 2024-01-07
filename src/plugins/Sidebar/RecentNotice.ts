import fetchLocal from "../../utils/fetchLocal";
import fetchRemote from "../../utils/fetchRemote";
import { ParserResult } from "../../utils/parser";

type Notice = {
  url: string;
  title: string;
};

export default class RecentNotice {
  private _data: ParserResult[];
  constructor() {
    const sidebar = fetchLocal()?.sidebar as ParserResult;
    this._data = sidebar?.recentNotice as ParserResult[];
  }

  async update() {
    const sidebar = await fetchRemote(window.location.href).then(
      ({ sidebar }) => sidebar as ParserResult
    );
    this._data = sidebar?.recentNotice as ParserResult[];
  }

  get(index: number) {
    if (this._data.length <= index) {
      return undefined;
    }
    return { ...this._data[index] } as Notice;
  }

  toArray() {
    return this._data.map((_, idx) => this.get(idx)) as Notice[];
  }
}
