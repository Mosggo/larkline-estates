(() => {
  const timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;

  const track = timeline.querySelector('[data-timeline-track]');
  const steps = [...timeline.querySelectorAll('[data-timeline-step]')];
  const markers = steps.map((step) => step.querySelector('[data-timeline-marker]'));
  let frame = 0;

  function update() {
    frame = 0;
    const middle = window.innerHeight / 2;
    const positions = markers.map((marker) => {
      const rect = marker.getBoundingClientRect();
      return rect.top + rect.height / 2;
    });
    const start = positions[0];
    const length = positions.at(-1) - start;
    const progress = Math.max(0, Math.min(length, middle - start));

    track.style.setProperty('--timeline-top', `${start - timeline.getBoundingClientRect().top}px`);
    track.style.setProperty('--timeline-length', `${length}px`);
    track.style.setProperty('--timeline-progress', `${progress}px`);
    steps.forEach((step, index) => step.toggleAttribute('data-active', positions[index] <= middle));
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  timeline.setAttribute('data-ready', '');
  track.hidden = false;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  document.addEventListener('languagechange', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(timeline);
  document.fonts?.ready.then(schedule);
  schedule();
})();
