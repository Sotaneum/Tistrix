import fetchLocal from "../utils/fetchLocal";
import { ParserResult } from "../utils/parser";

interface BlogInfoInterface {
  url: string;
  title: string;
  imageUrl: string;
  description: string;
  bloggerName: string;
  rssFeedUrl: string;
  tagLogUrl: string;
  guestbookUrl: string;
  menu: { url: string; title: string }[];
}

export default class BlogInfo implements BlogInfoInterface {
  private _data: ParserResult;
  constructor() {
    this._data = fetchLocal()?.blogInfo as ParserResult;
  }

  update() {
    this._data = fetchLocal()?.blogInfo as ParserResult;
  }

  get url() {
    return this._data["url"] as string;
  }

  get title() {
    return this._data["title"] as string;
  }

  get imageUrl() {
    return this._data["imageUrl"] as string;
  }

  get description() {
    return this._data["description"] as string;
  }

  get bloggerName() {
    return this._data["bloggerName"] as string;
  }

  get rssFeedUrl() {
    return this._data["rssFeedUrl"] as string;
  }

  get tagLogUrl() {
    return this._data["tagLogUrl"] as string;
  }

  get guestbookUrl() {
    return this._data["guestbookUrl"] as string;
  }

  get menu() {
    return [...(this._data["menu"] as { url: string; title: string }[])].map(
      (item) => ({ ...item })
    );
  }
}
