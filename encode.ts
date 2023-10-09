// ref : tistory/base.js
export function looseURIEncode(string: string) {
  return (string = (string = (string = string.replace(
    new RegExp("%", "g"),
    "%25"
  )).replace(new RegExp("\\?", "g"), "%3F")).replace(
    new RegExp("#", "g"),
    "%23"
  ));
}
