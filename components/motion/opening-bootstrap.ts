// Runs before hydration so the opening and existing entrance observers agree.
// No-JS HTML is readable. Every full home-page navigation/reload can replay.
export const openingBootstrap = `(() => {
  const root = document.documentElement;
  const home = /^\\/(en\\/?)?$/.test(location.pathname);
  const back = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
  const suppressed = matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(forced-colors: active)').matches;
  root.dataset.intro = home && !suppressed && !location.hash && !back ? 'pending' : 'done';
  if (root.dataset.intro === 'pending') {
    const restoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.addEventListener('mystena:intro-end', () => { history.scrollRestoration = restoration; }, { once: true });
  }
  if (!suppressed && 'IntersectionObserver' in window && Element.prototype.animate) {
    root.dataset.storyMotion = 'pending';
    // Never strand content when hydration or an animation API fails.
    setTimeout(() => {
      if (root.dataset.storyMotion === 'pending') delete root.dataset.storyMotion;
    }, 6000);
  }
  if (root.dataset.intro === 'pending') setTimeout(() => {
    if (root.dataset.intro !== 'done') {
      root.dataset.intro = 'done';
      document.querySelector('.site-opening')?.close?.();
      window.dispatchEvent(new Event('mystena:intro-end'));
    }
  }, 10000);
})();`;
