export type ParserResult = {
  [key: string]: string | null | ParserResult | ParserResult[];
};

export default function parser(el?: Element): ParserResult {
  if (!el) {
    return {};
  }
  return Array.from(el.children).reduce((acc, el) => switchParser(acc, el), {});
}

function switchParser(acc: ParserResult, element: Element) {
  switch (element.nodeName) {
    case "A":
      return { ...acc, ...aParser(element) };
    case "UL":
      if (
        ["tt_category", "category_list", "sub_category_list"].includes(
          element.className
        )
      ) {
        return {
          ...acc,
          categories: ulParser(element),
        };
      }
      if (element.className) {
        return {
          ...acc,
          [element.className]: ulParser(element),
        };
      }
      return ulParser(element);
    case "DIV":
      if (element.className === "article") {
        return {
          ...acc,
          article: element.innerHTML,
        };
      }
      if (element.className === "tt_box_namecard") {
        return { ...acc, nameCard: nameCardParser(element) };
      }
      if (element.className) {
        return {
          ...acc,
          [element.className]: divParser(element),
        };
      }
      if (element.children.length) {
        return switchParser(acc, element.children[0]);
      }
    default:
      return acc;
  }
}

function divParser(element: Element): ParserResult | string | null {
  if (
    element.children.length === 0 ||
    (element.children.length === 1 && element.children[0].nodeName === "SPAN")
  ) {
    const el = element as HTMLDivElement;
    return el.innerText ? el.innerText : null;
  }
  return Array.from(element.children).reduce(
    (acc, el) => switchParser(acc, el),
    {}
  );
}

function ulParser(element: Element) {
  return Array.from(element.children)
    .map((el) => liParser(el as HTMLLIElement))
    .filter((data) => Object.keys(data).length);
}

function liParser(element: Element): ParserResult {
  return Array.from(element.children).reduce<ParserResult>(
    (acc, el) => switchParser(acc, el) as ParserResult,
    {}
  );
}

function aParser(element: Element): ParserResult {
  const el = element as HTMLAnchorElement;
  return {
    url: el.href,
    title: el.innerText,
  };
}

function nameCardParser(element: Element): ParserResult {
  if (!element.children.length) {
    return {};
  }
  const data = [];
  const thumbnail = element.querySelector("a.tt_wrap_thumb span");
  const title = element.querySelector("a.tt_tit_cont");
  const desc = element.querySelector("a.tt_desc");
  if (thumbnail) {
    const span = thumbnail as HTMLSpanElement;
    data.push({
      thumbnail: span.style.backgroundImage.replace(
        /^.*(https?:\/\/[^"]*).*$/,
        "$1"
      ),
    });
  }
  if (title) {
    const a = title as HTMLAnchorElement;
    data.push({ title: a.innerText });
  }
  if (desc) {
    const a = desc as HTMLAnchorElement;
    data.push({ desc: a.innerText });
  }
  return data.reduce((acc, item) => ({ ...acc, ...item }), {});
}
