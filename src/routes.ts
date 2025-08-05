import DraggableList from '@/components/draggableList';
import Dropdowns from '@/components/dropdown';
import ImageSlides from '@/components/imageSlide';
import InfiniteScrollIO from '@/components/infiniteScroll/2_intersectionObserver';
import LazyLoadingScrollEvent from '@/components/lazyLoading/1_eventHandler';
import LazyLoadingIO from '@/components/lazyLoading/2_intersectionObserver';
import LazyLoadingNative from '@/components/lazyLoading/3_loadingAttribiute';
import LazyLoadingPolyfill from '@/components/lazyLoading/4_polyfill';
import ContextModals from '@/components/modal/1_context';
import PortalModals from '@/components/modal/2_portal';
import DialogModals from '@/components/modal/3_dialog';
import HierarchyPopovers from '@/components/popover/1_hierarchy';
import PortalPopovers from '@/components/popover/2_createPortal';
import ContextSnackbars from '@/components/snackbar/1_context';
import PortalSnackbars from '@/components/snackbar/2_createPortal';

import Accordions from './components/accordion';
import Carousels from './components/carousel';
import HorizontalScrollBox from './components/horizontalScrollBox';
import InfiniteScrollEvent from './components/infiniteScroll/1_eventHandler';
import LineClamps from './components/lineClamp';
import ScrollSpyEvent from './components/scrollSpy/1_eventHandler';
import ScrollSpy from './components/scrollSpy/2_intersectionObserver';
import TabMenus from './components/tabMenu';
import TextBoxes from './components/textBox';
import Tooltips from './components/tooltip';

export const routePaths = [
  '/',
  '/accordion',
  '/tabMenu',
  '/tooltip',
  '/textBox',
  '/lineClamp',
  '/lazyLoading',
  '/lazyLoading/1_eventHandler',
  '/lazyLoading/2_intersectionObserver',
  '/lazyLoading/3_loadingAttribute',
  '/lazyLoading/4_polyfill',
  '/infiniteScroll',
  '/infiniteScroll/1_eventHandler',
  '/infiniteScroll/2_intersectionObserver',
  '/horizontalScrollBox',
  '/scrollSpy',
  '/scrollSpy/1_eventHandler',
  '/scrollSpy/2_intersectionObserver',
  '/snackbar',
  '/snackbar/1_context',
  '/snackbar/2_createPortal',
  '/modal',
  '/modal/1_context',
  '/modal/2_portal',
  '/modal/3_dialog',
  '/popover',
  '/popover/1_hierarchy',
  '/popover/2_createPortal',
  '/imageSlide',
  '/carousel',
  '/gallery',
  '/dropdown',
  '/autoComplete',
  '/draggableList',
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
      '/dropdown',
      '/autoComplete',
      '/draggableList',
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
    children: Tooltips,
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
    children: LineClamps,
  },
  '/lazyLoading': {
    key: '/lazyLoading',
    link: '/lazyLoading/4_polyfill',
    name: '06. 지연 로딩',
    children: [
      '/lazyLoading/1_eventHandler',
      '/lazyLoading/2_intersectionObserver',
      '/lazyLoading/3_loadingAttribute',
      '/lazyLoading/4_polyfill',
    ],
  },
  '/lazyLoading/1_eventHandler': {
    key: '/lazyLoading/1_eventHandler',
    link: '/lazyLoading/1_eventHandler',
    name: 'Scroll + Throttle',
    children: LazyLoadingScrollEvent,
  },
  '/lazyLoading/2_intersectionObserver': {
    key: '/lazyLoading/2_intersectionObserver',
    link: '/lazyLoading/2_intersectionObserver',
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
    link: '/infiniteScroll/1_eventHandler',
    name: '07. 무한 스크롤',
    children: [
      '/infiniteScroll/1_eventHandler',
      '/infiniteScroll/2_intersectionObserver',
    ],
  },
  '/infiniteScroll/1_eventHandler': {
    key: '/infiniteScroll/1_eventHandler',
    link: '/infiniteScroll/1_eventHandler',
    name: 'Scroll + Throttle',
    children: InfiniteScrollEvent,
  },
  '/infiniteScroll/2_intersectionObserver': {
    key: '/infiniteScroll/2_intersectionObserver',
    link: '/infiniteScroll/2_intersectionObserver',
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
    link: '/scrollSpy/1_eventHandler',
    name: '09. 스크롤 스파이',
    children: [
      '/scrollSpy/1_eventHandler',
      '/scrollSpy/2_intersectionObserver',
    ],
  },
  '/scrollSpy/1_eventHandler': {
    key: '/scrollSpy/1_eventHandler',
    link: '/scrollSpy/1_eventHandler',
    name: 'Event Handler',
    children: ScrollSpyEvent,
  },
  '/scrollSpy/2_intersectionObserver': {
    key: '/scrollSpy/2_intersectionObserver',
    link: '/scrollSpy/2_intersectionObserver',
    name: 'IO',
    children: ScrollSpy,
  },
  '/snackbar': {
    key: '/snackbar',
    link: '/snackbar/2_createPortal',
    name: '10. 스낵바',
    children: ['/snackbar/1_context', '/snackbar/2_createPortal'],
  },
  '/snackbar/1_context': {
    key: '/snackbar/1_context',
    link: '/snackbar/1_context',
    name: 'Context',
    children: ContextSnackbars,
  },
  '/snackbar/2_createPortal': {
    key: '/snackbar/2_createPortal',
    link: '/snackbar/2_createPortal',
    name: 'createPortal',
    children: PortalSnackbars,
  },
  '/modal': {
    key: '/modal',
    link: '/modal/1_context',
    name: '11. 모달',
    children: ['/modal/1_context', '/modal/2_portal', '/modal/3_dialog'],
  },
  '/modal/1_context': {
    key: '/modal/1_context',
    link: '/modal/1_context',
    name: 'Context API',
    children: ContextModals,
  },
  '/modal/2_portal': {
    key: '/modal/2_portal',
    link: '/modal/2_portal',
    name: 'createPortal',
    children: PortalModals,
  },
  '/modal/3_dialog': {
    key: '/modal/3_dialog',
    link: '/modal/3_dialog',
    name: 'Dialog',
    children: DialogModals,
  },
  '/popover': {
    key: '/popover',
    link: '/popover/1_hierarchy',
    name: '12. 팝오버',
    children: ['/popover/1_hierarchy', '/popover/2_createPortal'],
  },
  '/popover/1_hierarchy': {
    key: '/popover/1_hierarchy',
    link: '/popover/1_hierarchy',
    name: 'Hierarchy',
    children: HierarchyPopovers,
  },
  '/popover/2_createPortal': {
    key: '/popover/2_createPortal',
    link: '/popover/2_createPortal',
    name: 'createPortal',
    children: PortalPopovers,
  },
  '/imageSlide': {
    key: '/imageSlide',
    link: '/imageSlide',
    name: '13. 이미지 슬라이드',
    children: ImageSlides,
  },
  '/carousel': {
    key: '/carousel',
    link: '/carousel',
    name: '14. 캐러셀',
    children: Carousels,
  },
  '/gallery': {
    key: '/gallery',
    link: '/gallery',
    name: '15. 갤러리',
    children: null,
  },
  '/dropdown': {
    key: '/dropdown',
    link: '/dropdown',
    name: '16. 드롭다운',
    children: Dropdowns,
  },
  '/autoComplete': {
    key: '/autoComplete',
    link: '/autoComplete',
    name: '17. 자동 완성',
    children: null,
  },
  '/draggableList': {
    key: '/draggableList',
    link: '/draggableList',
    name: '18. 드래그 앤 드롭 리스트',
    children: DraggableList,
  },
};

export const isParentRoute = (route: ROUTE): route is ParentRoute =>
  Array.isArray(route.children);

export const gnbRootList = (routes['/'] as ParentRoute).children.map(
  (r) => routes[r],
);
