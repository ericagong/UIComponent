import Accordions from './components/accordion';
import TabMenus from './components/tabMenu';
import TextBoxes from './components/textBox';
import LazyLoadingScrollEvent from '@/components/lazyLoading/1_EventHandler';
import LazyLoadingIO from '@/components/lazyLoading/2_IntersectionObserver';
import LazyLoadingNative from '@/components/lazyLoading/3_loadingAttribiute';
import LazyLoadingPolyfill from '@/components/lazyLoading/4_polyfill';
import InfiniteScrollEvent from './components/infiniteScroll/1_EventHandler';
import InfiniteScrollIO from '@/components/infiniteScroll/2_IntersectionObserver';
import HorizontalScrollBox from './components/horizontalScrollBox';
import ScrollSpyEvent from './components/scrollSpy/1_EventHandler';
import ScrollSpy from './components/scrollSpy/2_IntersectionObserver';

export const routePaths = [
  '/',
  '/accordion',
  '/tabMenu',
  '/tooltip',
  '/textBox',
  '/lineClamp',
  '/lazyLoading',
  '/lazyLoading/1_EventHandler',
  '/lazyLoading/2_IntersectionObserver',
  '/lazyLoading/3_loadingAttribute',
  '/lazyLoading/4_polyfill',
  '/infiniteScroll',
  '/infiniteScroll/1_EventHandler',
  '/infiniteScroll/2_IntersectionObserver',
  '/horizontalScrollBox',
  '/scrollSpy',
  '/scrollSpy/1_EventHandler',
  '/scrollSpy/2_IntersectionObserver',
  '/snackbar',
  '/modal',
  '/popover',
  '/imageSlide',
  '/carousel',
  '/gallery',
  '/selectBox',
  '/autoComplete',
  '/dnd',
] as const;
export type ROUTE_PATH = (typeof routePaths)[number];

type BaseRoute = {
  key: ROUTE_PATH;
  link: ROUTE_PATH;
  name: string;
};
export type ParentRoute = BaseRoute & {
  children: ROUTE_PATH[];
};
export type ChildRoute = BaseRoute & {
  children: ((props: unknown) => JSX.Element) | null;
};
export type ROUTE = ParentRoute | ChildRoute;

export const routes: Record<ROUTE_PATH, ROUTE> = {
  '/': {
    key: '/',
    link: '/',
    name: 'root',
    children: [
      '/accordion',
      '/tabMenu',
      '/tooltip',
      '/textBox',
      '/lineClamp',
      '/lazyLoading',
      '/infiniteScroll',
      '/horizontalScrollBox',
      '/scrollSpy',
      '/snackbar',
      '/modal',
      '/popover',
      '/imageSlide',
      '/carousel',
      '/gallery',
      '/selectBox',
      '/autoComplete',
      '/dnd',
    ],
  },
  '/accordion': {
    key: '/accordion',
    link: '/accordion',
    name: '01. 아코디언',
    children: Accordions,
  },
  '/tabMenu': {
    key: '/tabMenu',
    link: '/tabMenu',
    name: '02. 탭메뉴',
    children: TabMenus,
  },
  '/tooltip': {
    key: '/tooltip',
    link: '/tooltip',
    name: '03. 툴팁',
    children: null,
  },
  '/textBox': {
    key: '/textBox',
    link: '/textBox',
    name: '04. 반응형 텍스트박스',
    children: TextBoxes,
  },
  '/lineClamp': {
    key: '/lineClamp',
    link: '/lineClamp',
    name: '05. 여러줄 말줄임',
    children: null,
  },
  '/lazyLoading': {
    key: '/lazyLoading',
    link: '/lazyLoading/4_polyfill',
    name: '06. 지연 로딩',
    children: [
      '/lazyLoading/1_EventHandler',
      '/lazyLoading/2_IntersectionObserver',
      '/lazyLoading/3_loadingAttribute',
      '/lazyLoading/4_polyfill',
    ],
  },
  '/lazyLoading/1_EventHandler': {
    key: '/lazyLoading/1_EventHandler',
    link: '/lazyLoading/1_EventHandler',
    name: 'Scroll + Throttle',
    children: LazyLoadingScrollEvent,
  },
  '/lazyLoading/2_IntersectionObserver': {
    key: '/lazyLoading/2_IntersectionObserver',
    link: '/lazyLoading/2_IntersectionObserver',
    name: 'IO',
    children: LazyLoadingIO,
  },
  '/lazyLoading/3_loadingAttribute': {
    key: '/lazyLoading/3_loadingAttribute',
    link: '/lazyLoading/3_loadingAttribute',
    name: 'loading = lazy 속성',
    children: LazyLoadingNative,
  },
  '/lazyLoading/4_polyfill': {
    key: '/lazyLoading/4_polyfill',
    link: '/lazyLoading/4_polyfill',
    name: '폴리필',
    children: LazyLoadingPolyfill,
  },
  '/infiniteScroll': {
    key: '/infiniteScroll',
    link: '/infiniteScroll/1_EventHandler',
    name: '07. 무한 스크롤',
    children: [
      '/infiniteScroll/1_EventHandler',
      '/infiniteScroll/2_IntersectionObserver',
    ],
  },
  '/infiniteScroll/1_EventHandler': {
    key: '/infiniteScroll/1_EventHandler',
    link: '/infiniteScroll/1_EventHandler',
    name: 'Scroll + Throttle',
    children: InfiniteScrollEvent,
  },
  '/infiniteScroll/2_IntersectionObserver': {
    key: '/infiniteScroll/2_IntersectionObserver',
    link: '/infiniteScroll/2_IntersectionObserver',
    name: 'IO',
    children: InfiniteScrollIO,
  },
  '/horizontalScrollBox': {
    key: '/horizontalScrollBox',
    link: '/horizontalScrollBox',
    name: '08. 수평 스크롤 박스',
    children: HorizontalScrollBox,
  },
  '/scrollSpy': {
    key: '/scrollSpy',
    link: '/scrollSpy/1_EventHandler',
    name: '09. 스크롤 스파이',
    children: [
      '/scrollSpy/1_EventHandler',
      '/scrollSpy/2_IntersectionObserver',
    ],
  },
  '/scrollSpy/1_EventHandler': {
    key: '/scrollSpy/1_EventHandler',
    link: '/scrollSpy/1_EventHandler',
    name: 'Event Handler',
    children: ScrollSpyEvent,
  },
  '/scrollSpy/2_IntersectionObserver': {
    key: '/scrollSpy/2_IntersectionObserver',
    link: '/scrollSpy/2_IntersectionObserver',
    name: 'IO',
    children: ScrollSpy,
  },
  '/snackbar': {
    key: '/snackbar',
    link: '/snackbar',
    name: '10. 스낵바',
    children: null,
  },
  '/modal': {
    key: '/modal',
    link: '/modal',
    name: '11. 모달',
    children: null,
  },
  '/popover': {
    key: '/popover',
    link: '/popover',
    name: '12. 팝오버',
    children: null,
  },
  '/imageSlide': {
    key: '/imageSlide',
    link: '/imageSlide',
    name: '13. 이미지 슬라이드',
    children: null,
  },
  '/carousel': {
    key: '/carousel',
    link: '/carousel',
    name: '14. 캐러셀',
    children: null,
  },
  '/gallery': {
    key: '/gallery',
    link: '/gallery',
    name: '15. 갤러리',
    children: null,
  },
  '/selectBox': {
    key: '/selectBox',
    link: '/selectBox',
    name: '16. 셀렉트 박스',
    children: null,
  },
  '/autoComplete': {
    key: '/autoComplete',
    link: '/autoComplete',
    name: '17. 자동 완성',
    children: null,
  },
  '/dnd': {
    key: '/dnd',
    link: '/dnd',
    name: '18. D&D 리스트',
    children: null,
  },
};

export const isParentRoute = (route: ROUTE): route is ParentRoute =>
  Array.isArray(route.children);

export const gnbRootList = (routes['/'] as ParentRoute).children.map(
  (r) => routes[r],
);
