# Tistrix

Tistory Blog Skin을 위한 Tistory API 라이브러리입니다.

[Tistory Open API](https://tistory.github.io/document-tistory-apis/)와 달리, Tistory Skin에서 API를 호출하고 응답된 결과를 바탕으로 화면을 구성할 수 있도록 API 및 Skin.html 템플릿을 제공합니다.

## 개념

스킨 제작시, 기존 Tistory에서 제공하는 틀에 맞춰진 애매한 UI 구성보다 더 자유롭고 다양한 프레임워크를 적용할 수 있는 방법을 고민하였고 영화 매트릭스의 빨간약과 파란약에 개념을 도입하고 화면에 표시되어야할 데이터인 `빨간약(red_pill)`과 UI 요소가 담길 `파란약(blue_pill)` 개념을 도입했습니다.

- (확인 필요) SEO 대응을 하면서도 CSR을 적용할 수 있습니다.
- (확인 필요) 더 나아가서 Next.js 혹은 Nest.js 처럼 SSR+CSR 형태의 Tistory SKIN를 적용할 수 있습니다.

### `빨간약(red_pill)`

- Tistory에서 제공하는 템플릿을 일정 규칙에 따라 치환자를 적용되어 있습니다.
- Tistrix와 호환될 수 있도록 되도록 수정하지 않고 제공하는 형태 그대로 사용해야합니다.

### `파란약(blue_pill)`

- `div#bluie_pill`을 기준으로 CSR 형태를 적용하면 됩니다.

## 한계

- Tistory 정책에 따라 약관에 위배될 수 있는 항목이 있을 수 있습니다.
- API을 활용하더라도 반드시 약관을 지켜 사용해주세요.

## Roadmap v1.0

### API

- [ ] blog info
  - [ ] title
  - [x] blog image
  - [ ] description
  - [ ] blogger
  - [ ] blog link
  - [ ] rss feed
  - [ ] tag log link
  - [ ] guestbook link
  - [ ] page title
  - [ ] blog menu
  - [ ] body id
- [ ] ad
  - [ ] upper
  - [ ] lower
- [ ] home cover
- [ ] tag
- [ ] post
  - [x] default post
  - [x] comment
  - [ ] notice
  - [ ] protected
  - [ ] page
- [x] list
  - [x] list paging
- [ ] sidebar
  - [ ] recent notice
  - [ ] recent post
  - [ ] popular post
  - [ ] recent comment
  - [x] category
  - [ ] random tag
  - [ ] counter
  - [x] search

### Dev Tools

- [ ] Dev Server
- [ ] Build
- [ ] skin.html 자동 수정
- [ ] package deploy
- [ ] blue_pill/red_pill id 값 변경 옵션

### Test

- [ ] Mock Test Server
- [ ] SEO 대응 가능 여부 확인
- [ ] CSR 사용 여부 확인
  - [ ] React
  - [ ] Vue
