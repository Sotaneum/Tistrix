import fetchLocal from "../../utils/fetchLocal";
import fetchRemote from "../../utils/fetchRemote";
import { ParserResult } from "../../utils/parser";

type Post = {
  url: string;
  title: string;
  cnt: string;
  author: string;
  date: string;
  createDate: string;
  category?: {
    url: string;
    title: string;
  };
};

export default class RecentPost {
  private _data: ParserResult[];
  constructor() {
    const sidebar = fetchLocal()?.sidebar as ParserResult;
    this._data = sidebar?.recentPost as ParserResult[];
  }

  async update() {
    const sidebar = await fetchRemote(window.location.href).then(
      ({ sidebar }) => sidebar as ParserResult
    );
    this._data = sidebar?.recentPost as ParserResult[];
  }

  get(index: number) {
    if (this._data.length <= index) {
      return undefined;
    }

    const data = this._data[index] as ParserResult;
    const category = data.category;

    return { ...data, category } as Post;
  }

  toArray() {
    return this._data.map((_, idx) => this.get(idx)) as Post[];
  }
}
