import fetchLocal from "../utils/fetchLocal";
import fetchRemote from "../utils/fetchRemote";
import { ParserResult } from "../utils/parser";

type Paging = {
  prev: {};
  numbox: { url: string; title: string }[];
  next: {};
};
type Post = {
  url: string;
  title: string;
  date: string;
  cnt: string;
  author: string;
  summary: string;
  detailDate: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
  };
  category: {
    url: string;
    title: string;
  };
};
type ListItem = {
  name: string;
  cnt: string;
  desc: string;
  class: string;
  imageUrl: string;
  posts: Post[];
  paging: Paging;
};

// TODO: 배열이 아니므로 이에 대응을 추가합니다.

export default class List {
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
    return { ...this._data[index] } as ListItem;
  }

  toArray() {
    return this._data.map((_, idx) => this.get(idx)) as ListItem[];
  }
}
