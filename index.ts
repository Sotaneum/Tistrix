/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import axios from "axios";
import { looseURIEncode } from "./encode.ts";

interface IList {
  url: string;
  date: string;
  title: string;
  thumbnail: string;
  summary: string;
}

interface IPost {
  article: string;
  title: string;
  date: string;
  tags: string[];
  comments: string;
}

interface ICategory {
  title: string;
  link: string;
  cnt: number;
  subCategory?: ICategory[];
}

interface ITistrix {
  getCategory: () => ICategory[] | null;
  getListBySearch: (text: string, pageNo?: number) => Promise<IList[]>;
  getListByCategory: (category: ICategory, pageNo?: number) => Promise<IList[]>;
  getPostById: (id: number) => Promise<IPost | null>;
  getProfileImage: () => string;
}

export default class Tistrix implements ITistrix {
  private readonly localRedPill: HTMLElement;

  constructor() {
    this.localRedPill = this.getRedPillByElement() as HTMLElement;
  }

  getCategory() {
    const element = this.localRedPill.querySelector(
      "#category_list ul.tt_category"
    );
    if (!element) {
      return null;
    }
    return this.elementToCategories(element as HTMLUListElement);
  }

  async getListByCategory(category: ICategory, pageNo = 1): Promise<IList[]> {
    const redPill = await this.getRedPillByPath(
      `${category.link}?page=${pageNo}`
    );
    const list = this.getList(redPill);
    if (list.length === 0) {
      return list;
    }
    return [...list, ...(await this.getListByCategory(category, pageNo + 1))];
  }

  async getListBySearch(text: string, pageNo = 1): Promise<IList[]> {
    const path = `/search/${looseURIEncode(text)}?page=${pageNo}`;
    const redPill = await this.getRedPillByPath(path);
    const list = this.getList(redPill);
    if (list.length === 0) {
      return list;
    }
    return [...list, ...(await this.getListBySearch(text, pageNo + 1))];
  }

  async getPostById(id: number): Promise<IPost | null> {
    return this.getPost(await this.getRedPillByPath(`/${id}`));
  }

  getProfileImage(): string {
    return (
      this.localRedPill.querySelector("#profile")?.getAttribute("src") ?? ""
    );
  }

  private getPost(redPill: HTMLElement): IPost | null {
    if (!redPill) {
      return null;
    }

    const head = redPill.querySelector("#article_head");
    const body = redPill.querySelector("#article_body");
    if (!head || !body) {
      return null;
    }
    const article = (body.querySelector("div.article") as HTMLDivElement)
      .innerText;
    const title = (head.querySelector("h2 a") as HTMLAnchorElement).innerText;
    const date = (head.querySelector("span.meta-date") as HTMLSpanElement)
      .innerText;
    const tags = (
      [...body.querySelectorAll(".tag_label span")] as HTMLSpanElement[]
    ).map((span) => span.innerText);
    const comments = (body.querySelector("div#comments") as HTMLDivElement)
      .innerText;
    return {
      article,
      title,
      date,
      tags,
      comments,
    };
  }

  private getList(redPill: HTMLElement): IList[] {
    if (!redPill) {
      return [];
    }
    const list = redPill.querySelector("ul#list") as HTMLUListElement;
    if (!list) {
      return [];
    }
    const items = [...list.querySelectorAll("li")];
    return items.map((li) => {
      const a = li.querySelector("a.title") as HTMLAnchorElement;
      const url = a.getAttribute("href") || "";
      const date = (li.querySelector("span.date") as HTMLSpanElement).innerText;
      const title = a.innerText;
      const img = li.querySelector("img.thumbnail") as HTMLImageElement;
      const thumbnail = img.getAttribute("src") || "";
      const summary = (li.querySelector("p.summary") as HTMLParagraphElement)
        .innerText;

      return {
        url,
        date,
        title,
        thumbnail,
        summary,
      };
    });
  }

  private elementToCategories(ul: HTMLUListElement): ICategory[] {
    return [...ul.children].map((li) =>
      [...li.children].reduce<ICategory>(
        (acc, item) => {
          if (item.tagName === "A") {
            const [, title, cnt] =
              /^(.*) \(([0-9]+)\)$/.exec(
                (item as HTMLAnchorElement).innerText
              ) ?? [];
            return {
              ...acc,
              title,
              cnt: parseInt(cnt),
              link: item.getAttribute("href") || "",
            };
          }
          if (item.tagName === "UL") {
            return {
              ...acc,
              subCategory: this.elementToCategories(item as HTMLUListElement),
            };
          }
          return acc;
        },
        { title: "", link: "", cnt: 0 }
      )
    );
  }

  private async getRedPillByPath(path: string) {
    const { data } = await axios.get(path);
    const div = document.createElement("div");
    div.innerHTML = data;
    return this.getRedPillByElement(div) as HTMLElement;
  }

  private getRedPillByElement(element: HTMLElement = document.body) {
    return element.querySelector("#red_pill");
  }
}
