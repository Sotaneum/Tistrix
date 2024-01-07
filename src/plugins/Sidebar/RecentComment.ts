import fetchLocal from "../../utils/fetchLocal";
import fetchRemote from "../../utils/fetchRemote";
import { ParserResult } from "../../utils/parser";

type Comment = {
  url: string;
  title: string;
  name: string;
  date: string;
};

export default class RecentComment {
  private _data: ParserResult[];
  constructor() {
    const sidebar = fetchLocal()?.sidebar as ParserResult;
    this._data = sidebar?.recentComment as ParserResult[];
  }

  async update() {
    const sidebar = await fetchRemote(window.location.href).then(
      ({ sidebar }) => sidebar as ParserResult
    );
    this._data = sidebar?.recentComment as ParserResult[];
  }

  get(index: number) {
    if (this._data.length <= index) {
      return undefined;
    }
    return { ...this._data[index] } as Comment;
  }

  toArray() {
    return this._data.map((_, idx) => this.get(idx)) as Comment[];
  }
}
