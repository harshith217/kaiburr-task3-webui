import '@testing-library/jest-dom';

// Polyfills for Ant Design and rc-* libs under jsdom
if (typeof window !== 'undefined') {
  // matchMedia
  if (!window.matchMedia) {
    window.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    });
  }

  // getComputedStyle
  if (!window.getComputedStyle) {
    // @ts-expect-error jsdom shim
    window.getComputedStyle = () => ({
      getPropertyValue: () => '',
      overflowY: 'scroll',
      overflowX: 'scroll',
      display: 'block',
      position: 'static'
    });
  }

  // ResizeObserver
  if (!('ResizeObserver' in window)) {
    // @ts-expect-error test env shim
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;
  }
}
